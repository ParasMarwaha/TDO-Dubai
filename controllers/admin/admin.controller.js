const adminService = require("../../services/admin/admin.service")
const connectToDatabase = require("../../db/connection");
const {sign} = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
let jwtSecret = process.env.JWT_SECRET;
const moment = require('moment');
const mailFunc = require("../../utils/mails");
require('moment-timezone')
const agentServices = require("../../services/client/index.services");


const adminController = {};


adminController.renderLoginPage = (req, res) => {
    res.render("admin/index")
}

adminController.login = async (req, res) => {
    let connection;

    try {
        connection = await connectToDatabase();
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        // let connection = await connectToDatabase()
        let {email, password} = req.body;
        let [data] = await adminService.verifyStaff(connection, email)
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        // console.log(data[0].first_name)
        // let sname=data[0].first_name+" "+data[0].last_name;

        let remarks="login"
        if (data.length === 0) {
            let status="Fail (Invalid Email)"
            let [checkEmail]=await adminService.checkEmail(connection,email,status,remarks,time,client_ip)
            return res.send({responseCode: 1, error: false, warning: true, message: "Invalid Email."})
        } else {
            if (data[0].status === 0) {
                let sname=data[0].first_name+" "+data[0].last_name;
                let status="Fail (Account Not Active)"
                let [accountNotActive]=await adminService.accountNotActive(connection,sname,email,status,remarks,time,client_ip)
                return res.send({responseCode: 1, error: false, warning: true, message: "Your Account is not Active"})
            } else {
                let hashPassword = data[0].password
                let isMatch = await bcrypt.compare(password, hashPassword);
                if (!isMatch) {
                    let sname=data[0].first_name+" "+data[0].last_name;
                    let status="Fail (Invalid Password)"
                    let [invalidPassword]=await adminService.invalidPassword(connection,sname,email,status,remarks,time,client_ip)
                    return res.send({responseCode: 1, error: false, warning: true, message: "Invalid Password."})
                } else {
                    let staffId = data[0]['id']
                    let staffEmail = data[0]['email']
                    let staffRole = data[0]['role']
                    let staffName = data[0]['first_name'] + " " + data[0]['last_name']
                    let staffMobile = data[0]['mobile']
                    // console.log(jwtSecret)
                    try {
                        const jwtToken = sign(
                            {
                                staffId,
                                staffEmail,
                                staffRole,
                                staffName,
                                staffMobile
                            }, jwtSecret, {expiresIn: "1d"}
                        )
                        // await adminService.createLog(JWT_ADMINID, JWT_ADMINEMAIL, "Login Successful")
                        let sname=data[0].first_name+" "+data[0].last_name;
                        let status="Success"
                        let [loginSuccess]=await adminService.loginSuccess(connection,sname,email,status,remarks,time,client_ip)
                        return res.send({
                            responseCode: 2, error: false, warning: false, message: "Login Successful", data: {
                                displayName: staffName,
                                email: staffEmail,
                                expiresIn: "86400000",
                                idToken: jwtToken,
                                kind: "",
                                localId: "",
                                refreshToken: jwtToken,
                                registered: true
                            }
                        });
                    } catch (e) {
                        // await adminService.createLog(0, req.body.email_mobile, 'JWT Error')
                        console.log('-----', e.message)
                        return res.send({
                            responseCode: 1,
                            error: true,
                            warning: false,
                            message: "Error Occurred - " + e.message
                        });
                    }
                }
            }
        }
    } catch (e) {
        return res.send({responseCode: 1, error: true, warning: false, message: e.message})
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

adminController.Logout= async (req, res) => {
    let connection
    try {
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        connection = await connectToDatabase();
        let {staffName,staffEmail}=req.admin
        let status="Success"
        let remarks="logout"
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let [logout]=await adminService.logout(connection,staffName,staffEmail,status,remarks,time,client_ip)
        return res.send({
            responseCode: 2, error: false, warning: false, message: "Success"
        });
    }
    catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

adminController.AddStaffRoles = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        console.log(req.body)
        let {RoleName, Description} = req.body;
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        let description="Staff Role Added"
        let {staffName,staffEmail}=req.admin
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        const createdBy = req.admin.staffName
        let [data]=await adminService.checkRoleName(connection,RoleName)
        if(data.length===0)
        {
            let result = await adminService.addNewRoles(connection, RoleName, Description, createdBy, createdAt)
            let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
            return res.send({responseCode: 2, error: false, warning: false, message: "Role has been Added Successfully."})
        }
        else if(data.length!==0 && data[0].status===0) {
            let result = await adminService.updateNewRoles(connection, RoleName, Description, createdBy, createdAt)
            let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
            return res.send({responseCode: 2, error: false, warning: false, message: "Role has been Added Successfully."})
        }
        else {
            return res.send({responseCode: 1, error: false, warning: true, message: "Role Already Exist."})
        }
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.ReadStaffRoles = async (req, res) => {
    let connection
    try {
         connection = await connectToDatabase();
        let [result] = await adminService.readRoles(connection)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.UpdateStaffRoles = async (req, res) => {
    let connection
    try {
         connection = await connectToDatabase();
        let {id} = req.params
        let {RoleName, Description} = req.body;
        let description="Staff Role Edited"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let updatedBy = req.admin.staffName
        const updatedAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")

        let result = await adminService.updateRoles(connection, id, RoleName, Description, updatedBy, updatedAt)
        let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
        return res.send({responseCode: 2, error: false, warning: false, message: "Role Updated Successfully"})

    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.DeleteStaffRoles = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let {id} = req.params
        let description="Staff Role Deleted"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let [data]=await adminService.checkRole(connection,id)
        if(data.length===0) {
            let result = await adminService.deleteRoles(connection, id)
            let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
            return res.send({responseCode: 2, error: false, warning: false, message: "Staff Role Deleted Successfully"})
        }
        else {
            return res.send({responseCode: 1, error: false, warning: true, message: "Role is Assigned to user"})
        }

    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};


adminController.ReadAgentsData = async (req, res) => {
    let connection
    try {
         connection = await connectToDatabase();
        let [result] = await adminService.readAgents(connection)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

adminController.ReadAgent = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let {id} = req.params
        let [result] = await adminService.readAgent(connection, id)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

adminController.AddUserGroup = async (req, res) => {
    let connection
    try {
         connection = await connectToDatabase();
        // let {staffEmail}=req.admin
        let {GroupName, Description} = req.body;

        const createdDate = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        const updatedDate = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        const createdBy = req.admin.staffName
        const updatedBy = req.admin.staffName


        let result = await adminService.addUserGroup(connection, GroupName, Description, createdDate, createdBy, updatedDate, updatedBy)
        return res.send({responseCode: 2, error: false, warning: false, message: "Group has been Added Successfully."})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.ReadUserGroup = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let [result] = await adminService.readUserGroup(connection)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

adminController.UpdateUserGroup = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let {id} = req.params
        let {GroupName, Description} = req.body;
        let updatedBy = req.admin.staffEmail
        const updatedDate = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")

        let result = await adminService.updateUserGroup(connection, id, GroupName, Description, updatedDate, updatedBy)
        return res.send({responseCode: 2, error: false, warning: false, message: "User Group Updated Successfully"})

    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.DeleteUserGroup = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let {id} = req.params

        let result = await adminService.deleteUserGroup(connection, id)
        return res.send({responseCode: 2, error: false, warning: false, message: "User Group Deleted Successfully"})

    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.activateAgent = async (req, res) => {
    let connection
    // let connection = await connectToDatabase();
    // await connection.beginTransaction()
    // console.log(req.body)
    try {
        connection = await connectToDatabase();
        const {id} = req.params
        const password = `Tdo@${crypto.randomInt(1000, 9999)}`

        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)

        let [agentData] = await adminService.readAgentByID(connection, id)

        if (agentData.length === 0) {
            return res.send({responseCode: 1, error: false, warning: true, message: "Invalid Agent."});
        } else {
            let email = agentData[0].email;
            console.log(agentData[0].password)
            if (agentData[0].password !== null) {
                let [data] = await adminService.activateAgent(connection, id)
                await mailFunc.sendActivationEmail(email)
                // await connection.commit()
            } else {
                let [data] = await adminService.activateWithPassword(connection, hashPassword, id)
                await mailFunc.sendPasswordEmail(email, password)
                // await connection.commit()
            }

            return res.send({
                responseCode: 2,
                error: false,
                warning: false,
                message: "Agent has been activated successfully."
            });
        }

    } catch (e) {
        // await connection.rollback()
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

adminController.deactivateAgent = async (req, res) => {
    let connection
    // let connection = await connectToDatabase();
    // await connection.beginTransaction()
    // console.log(req.body)
    try {
        connection = await connectToDatabase();
        const {id} = req.params
        // const password = `Tdo@${crypto.randomInt(1000, 9999)}`

        // let salt = await bcrypt.genSalt(10)
        // let hashPassword = await bcrypt.hash(password, salt)

        let [agentData] = await adminService.readAgentByID(connection, id)

        if (agentData.length === 0) {
            return res.send({responseCode: 1, error: false, warning: true, message: "Invalid Agent."});
        } else {
            let email = agentData[0].email;
            let [data] = await adminService.deactivateAgent(connection, id)
            await mailFunc.sendDeactivationEmail(email)
            // await connection.commit()

            return res.send({
                responseCode: 2,
                error: false,
                warning: false,
                message: "Agent has been deactivated successfully."
            });
        }

    } catch (e) {
        // await connection.rollback()
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}


// -------------------------------------------------------------------------------------------------------------------

adminController.ReadStaff = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let {staffId}=req.admin
        console.log(req.admin)
        let [result] = await adminService.readStaff(connection,staffId)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
adminController.AddStaff = async (req, res) => {
    let connection
    try {
         connection = await connectToDatabase();
        let {role, firstName, lastName, email, mobile, password, confirmPassword} = req.body;

        let {staffName,staffEmail}=req.admin
        console.log(req.body)
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        const createdBy = req.admin.staffName
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)
        if (password !== confirmPassword) {
            return res.send({
                responseCode: 1,
                error: false,
                warning: true,
                message: "Password and Confirm Password does not match"
            })
        } else {
            let [data1] = await adminService.checkStaffEmail(connection,email)
            let [data2] = await adminService.checkStaffMobile(connection,mobile)
            if(data1.length===0&&data2.length===0)
            {
                let [result] = await adminService.addStaff(connection, firstName, lastName, email, mobile, hashPassword, createdAt, createdBy, role)
                let [getId] = await adminService.getStaffId(connection, email, mobile)
                console.log(getId[0].id)
                let description="Staff Added (id:"+getId[0].id+")"
                let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
                return res.send({
                    responseCode: 2,
                    error: false,
                    warning: false,
                    message: "Staff has been Added Successfully."
                })
            }
            else {
                return res.send({
                    responseCode: 1,
                    error: false,
                    warning: true,
                    message: "Email or Mobile Number Already Exist"
                })
            }

        }

    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});

    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
adminController.ActiveStaff = async (req, res) => {
    let connection
    try {
        console.log(req.body)
        let {id} = req.params
        let description="Staff Activated (id:"+id+")"
        console.log(description)
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        connection = await connectToDatabase();


        let result = await adminService.activeStaff(connection, id)
        let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
        return res.send({responseCode: 2, error: false, warning: false, message: "Staff Activated Successfully"})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.InactiveStaff = async (req, res) => {
    let connection
    try {
        let {id} = req.params
        let description="Staff Inactivated (id:"+id+")"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        console.log(id)
         connection = await connectToDatabase();
        let [data] = await adminService.checkStaff(connection, id)
        console.log(data)
        if(data.length===0)
        {
            let result = await adminService.inactiveStaff(connection, id)
            let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
            return res.send({responseCode: 2, error: false, warning: false, message: "Staff Inactivated Successfully"})
        }
        else {
            return res.send({responseCode: 1, error: false, warning: true, message: "Can Not Inactive,User is already Mapped with Travel agent"})
        }

    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.ChangePassword = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let {staffId} = req.admin
        let description="Password Changed"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let {oldPassword, newPassword} = req.body

        let [result] = await adminService.checkOldPassword(connection, staffId)
        let hashOldPassword = result[0].password
        let isMatch = await bcrypt.compare(oldPassword, hashOldPassword);
        if (!isMatch) {
            return res.send({responseCode: 1, error: false, warning: true, message: "Old Password is not Correct."})
        } else {
            let salt = await bcrypt.genSalt(10)
            let hashPassword = await bcrypt.hash(newPassword, salt)
            let result = await adminService.updatePassword(connection, staffId, hashPassword)
            let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
            return res.send({responseCode: 2, error: false, warning: false, message: "Password Changed Successfully"})
        }
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.ResendPassword = async (req, res) => {
    // console.log(req.params);
    let connection
    // console.log(req.body)
    try {
        connection = await connectToDatabase();
        const {id} = req.params
        const password = generatePassword(8);
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)

        let [agentData] = await adminService.readAgentByID(connection, id)

        if (agentData.length === 0) {
            return res.send({responseCode: 1, error: false, warning: true, message: "Invalid Agent."});
        } else {
            let email = agentData[0].email;
            // console.log(agentData[0].password)

            let [data] = await adminService.updateResendPassword(connection, hashPassword, id)
            await mailFunc.sendResetPasswordEmail(email, password)


            return res.send({
                responseCode: 2,
                error: false,
                warning: false,
                message: "Password has been Sent successfully."
            });
        }

    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.StaffDetails = async (req, res) => {
    let connection
    try {
        let {staffId} = req.admin
         connection = await connectToDatabase();
        let [result] = await adminService.staffDetails(connection, staffId)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.AddPlatformFee = async (req, res) => {
    let connection
    try {
        let {product, platformFee, tax} = req.body
        let description="Platform Fee Added"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        console.log(req.body)
         connection = await connectToDatabase();
        let [result] = await adminService.checkProduct(connection, product)
        if (result.length === 0) {
            let [data] = await adminService.addProduct(connection, product, platformFee, tax)
            let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
            return res.send({
                responseCode: 2,
                error: false,
                warning: false,
                message: "Platform Fees Added Successfully."
            })
        } else {
            return res.send({responseCode: 1, error: false, warning: true, message: "Platform Fees Already Exist."})
        }

    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.UpdatePlatformFee = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let {platformFee, tax, product_id} = req.body
        let description="Platform Fee Edited"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        console.log(req.body)

        let [data] = await adminService.updateProduct(connection, product_id, platformFee, tax)
        let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
        return res.send({responseCode: 2, error: false, warning: false, message: "Platform Fees Updated Successfully."})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.ReadPlatformFee = async (req, res) => {
    let connection
    try {
         connection = await connectToDatabase();
        let [result] = await adminService.readPlatformFee(connection)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.AddFare = async (req, res) => {
    let connection
    try {
        let {fareType} = req.body
        let description="Fare Type Added"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
         connection = await connectToDatabase();
        let [data] = await adminService.addFare(connection, fareType)
        let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
        return res.send({responseCode: 2, error: false, warning: false, message: "Fare Type Added Successfully."})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.GetFare = async (req, res) => {
    let connection
    try {
         connection = await connectToDatabase();
        let [result] = await adminService.getFareData(connection)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
adminController.UpdateFare = async (req, res) => {
let connection
    try {
        let {fareType, fare_id} = req.body
        let description="Fare Type Edited"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
         connection = await connectToDatabase();
        let [data] = await adminService.updateFare(connection, fareType, fare_id)
        let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
        return res.send({responseCode: 2, error: false, warning: false, message: "Fare Type Updated Successfully."})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.DeleteFare = async (req, res) => {
    let connection
    console.log(req.body)
    try {
        let {id} = req.params
        let description="Fare Type Deleted"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
         connection = await connectToDatabase();
        let [check] = await adminService.checkFare(connection, id)
        if(check.length===0)
        {
            let [data] = await adminService.deleteFare(connection, id)
            let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
            return res.send({responseCode: 2, error: false, warning: false, message: "Fare Type Deleted Successfully."})
        }
       else {
            return res.send({
                responseCode: 1,
                error: false,
                warning: true,
                message: "Fare type is Assigned to Plan"
            })
        }
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

adminController.AddSupplier = async (req, res) => {
    let connection
    try {
        let {supplier} = req.body
        let description="Supplier Added"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
         connection = await connectToDatabase();
        let [data] = await adminService.addSupplier(connection, supplier)
        let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
        return res.send({responseCode: 2, error: false, warning: false, message: "Supplier Added Successfully."})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.GetSupplier = async (req, res) => {
    let connection
    try {
         connection = await connectToDatabase();
        let [result] = await adminService.getSupplierData(connection)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
adminController.UpdateSupplier = async (req, res) => {
let connection
    try {
        let {supplier, supplier_id} = req.body
        let description="Supplier Edited"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
         connection = await connectToDatabase();
        let [data] = await adminService.updateSupplier(connection, supplier, supplier_id)
        let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
        return res.send({responseCode: 2, error: false, warning: false, message: "Supplier Updated Successfully."})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.DeleteSupplier = async (req, res) => {
    let connection
    try {
        let {id} = req.params
        let description="Supplier Deleted"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
         connection = await connectToDatabase();
        let [check] = await adminService.checkSupplier(connection, id)
        if(check.length===0)
        {
            let [data] = await adminService.deleteSupplier(connection, id)
            let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
            return res.send({responseCode: 2, error: false, warning: false, message: "Supplier Deleted Successfully."})
        }
        else {
            return res.send({
                responseCode: 1,
                error: false,
                warning: true,
                message: "Supplier is Assigned to Plan"
            })
        }

    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

adminController.AddMarkup = async (req, res) => {
    let connection
    console.log(req.body)
    try {
        let {plan_name, type, MarkupValue, suppliers, fareTypes, carriers, cancellation, rescheduling} = req.body
        let description="Markup Added"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
         connection = await connectToDatabase();
        let [data] = await adminService.checkPlan(connection, plan_name)
        if (data.length > 0) {
            console.log(data)
            return res.send({responseCode: 1, error: false, warning: true, message: "Plan Already Exist."})
        } else {
            for (let i = 0; i < fareTypes.length; i++) {
                for (let j = 0; j < carriers.length; j++) {
                    for (let k = 0; k < suppliers.length; k++) {
                        let [plan] = await adminService.addPlan(connection, plan_name, type, MarkupValue, suppliers[k], fareTypes[i], carriers[j], cancellation, rescheduling)

                    }
                }
            }
            let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
            return res.send({responseCode: 2, error: false, warning: false, message: "Markup Plan Added Successfully."})
        }
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.DeleteMarkup=async (req, res) => {
    let connection
    try {
        let description="Markup Deleted"
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        connection = await connectToDatabase();
        let {id} = req.params
        let [data]=await adminService.checkPlanName(connection,id)
        let plan=data[0].plan_name
        let result = await adminService.deleteMarkup(connection, plan)
        let[log]=await adminService.generalActivityLog(connection,staffName,staffEmail,description,createdAt,client_ip)
        return res.send({responseCode: 2, error: false, warning: false, message: "Markup Deleted Successfully"})


    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }

}
adminController.GetMarkup = async (req, res) => {
    let connection
    try {
        // let { plan_name } = req.body;
         connection = await connectToDatabase();
        let [result] = await adminService.getMarkupData(connection);
        for (let i = 0; i < result.length; i++) {
            let [data] = await adminService.getData(connection, result[i].plan_name);
            result[i].additionalData = data;
        }

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.Count = async (req, res) => {
    let connection
    try {
        // let { plan_name } = req.body;
        connection = await connectToDatabase();
        let [user] = await adminService.getStaffCount(connection)
        let [partner] = await adminService.getAgentCount(connection);
        let[pendingRequest]=await adminService.getPendingRequestCount(connection);
        let[flightSearchCount]=await adminService.getFlightSearchCount(connection)
        let[flightBookCount]=await adminService.getFlightBookCount(connection)
        let[totalFlightRevenue]=await adminService.getTotalFlightRevenue(connection)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", users: user,partners:partner,pending:pendingRequest,flightSearchCount:flightSearchCount,flightBookCount:flightBookCount,totalFlightRevenue:totalFlightRevenue});
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
adminController.GetCarrier = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let [result] = await adminService.getCarrierData(connection)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.GetStaffLogData = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let [result] = await adminService.getStaffLogData(connection)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.GetAgentLogData = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let [result] = await adminService.getAgentLogData(connection)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};


// ======================================================================================
adminController.UpdateEstablishmentDetails = async (req, res) => {
    console.log(req.body)
    let connection
    try {
        connection = await connectToDatabase();
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let{staffName}=req.admin
        let{nature_of_business,establishment_name,address,area,emirates,email,mobile,id}=req.body;
        let [old_values] = await adminService.readAgent(connection,id)
        let [result] = await adminService.updateEstablishmentDetails(connection,nature_of_business,establishment_name,address,area,emirates,email,mobile,id)
        let[new_values]=await adminService.readAgent(connection,id)
        old_values=JSON.stringify(old_values[0])
        new_values=JSON.stringify(new_values[0])
        let[data]=await adminService.insertDetails(connection,id,time,staffName,old_values,new_values)
        return res.send({responseCode: 2, error: false, warning: false, message: "Establishment Details Updated Successfully"})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
adminController.UpdateDirector1Details = async (req, res) => {
    let connection
    try {
        // console.log(req.body)
        connection = await connectToDatabase();
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let{staffName}=req.admin
        let{name, nationality,passportNumber,passportIssuingCountry,passportExpiry,emiratesId,emiratesIdExpiry,email1,mobile1,id}=req.body;
         passportExpiry = moment(passportExpiry).tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD")
         emiratesIdExpiry = moment(emiratesIdExpiry).tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD")
        // passportExpiry=passportExpiry.split("T")[0]
        // emiratesIdExpiry=emiratesIdExpiry.split("T")[0]
        let [old_values] = await adminService.readAgent(connection,id)
        let [result] = await adminService.updateDirector1Details(connection,name, nationality,passportNumber,passportIssuingCountry,passportExpiry,emiratesId,emiratesIdExpiry,email1,mobile1,id)
        let[new_values]=await adminService.readAgent(connection,id)
        old_values=JSON.stringify(old_values[0])
        new_values=JSON.stringify(new_values[0])
        let[data]=await adminService.insertDetails(connection,id,time,staffName,old_values,new_values)
        return res.send({responseCode: 2, error: false, warning: false, message: "Director 1 Details Updated Successfully"})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
adminController.UpdateDirector2Details = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let{staffName}=req.admin
        let{name2, nationality2,passportNumber2,passportIssuingCountry2,passportExpiry2,emiratesId2,emiratesIdExpiry2,email2,mobile2,id}=req.body;
        passportExpiry2 = moment(passportExpiry2).tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD")
        emiratesIdExpiry2 = moment(emiratesIdExpiry2).tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD")
        let [old_values] = await adminService.readAgent(connection,id)
        let [result] = await adminService.updateDirector2Details(connection,name2, nationality2,passportNumber2,passportIssuingCountry2,passportExpiry2,emiratesId2,emiratesIdExpiry2,email2,mobile2,id)
        let[new_values]=await adminService.readAgent(connection,id)
        old_values=JSON.stringify(old_values[0])
        new_values=JSON.stringify(new_values[0])
        let[data]=await adminService.insertDetails(connection,id,time,staffName,old_values,new_values)
        return res.send({responseCode: 2, error: false, warning: false, message: "Director 2 Details Updated Successfully"})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
adminController.UpdateSignatoryDetails = async (req, res) => {
    // console.log(req.body)
    let connection
    try {
        connection = await connectToDatabase();
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let{staffName}=req.admin
        let{authorized_person_name,authorized_person_nationality,authorized_person_passport_number,authorized_person_passport_issuing_country,authorized_person_passport_expiry,authorized_person_emirates_id,authorized_person_emirates_id_expiry,authorized_person_email,authorized_person_mobile,id}=req.body;
        authorized_person_passport_expiry = moment(authorized_person_passport_expiry).tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD")
        authorized_person_emirates_id_expiry = moment(authorized_person_emirates_id_expiry).tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD")
        let [old_values] = await adminService.readAgent(connection,id)
        let [result] = await adminService.updateSignatoryDetails(connection,authorized_person_name,authorized_person_nationality,authorized_person_passport_number,authorized_person_passport_issuing_country,authorized_person_passport_expiry,authorized_person_emirates_id,authorized_person_emirates_id_expiry,authorized_person_email,authorized_person_mobile,id)
        let[new_values]=await adminService.readAgent(connection,id)
        old_values=JSON.stringify(old_values[0])
        new_values=JSON.stringify(new_values[0])
        let[data]=await adminService.insertDetails(connection,id,time,staffName,old_values,new_values)
        return res.send({responseCode: 2, error: false, warning: false, message: "Signatory Details Updated Successfully"})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
adminController.UpdateBankDetails = async (req, res) => {
    // console.log(req.body)
    let connection
    try {
        connection = await connectToDatabase();
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let{staffName}=req.admin
        let{banker_name,branch_location,account_number,current_business_volume,id}=req.body;

        let [old_values] = await adminService.readAgent(connection,id)
        let [result] = await adminService.updateBankDetails(connection,banker_name,branch_location,account_number,current_business_volume,id)
        let[new_values]=await adminService.readAgent(connection,id)
        old_values=JSON.stringify(old_values[0])
        new_values=JSON.stringify(new_values[0])
        let[data]=await adminService.insertDetails(connection,id,time,staffName,old_values,new_values)
        return res.send({responseCode: 2, error: false, warning: false, message: "Bank Details Updated Successfully"})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
const generateUniqueId = () => {
    return Math.floor(Date.now() + Math.random() * 1000);
}
adminController.UpdateDocument= async (req, res) => {
    console.log(req.body)
    console.log(req.files)
    let connection
    let documentId = generateUniqueId();
    try {
        let{staffName}=req.admin
        connection = await connectToDatabase();
        let{FileType,remarks,id}=req.body;
        let {file} = req.files
        let [iata] = await adminService.getIataDocument(connection,id)
         if(FileType==="iata_document_path" && iata[0].iata==="No")
        {
            return res.send({
                responseCode: 1,
                error: false,
                warning: true,
                message: "Can Not Update IATA Accredited Document"
            })
        }
         else {
             let [data] = await adminService.getDocument(connection, FileType, id)
             let document = data[0].file
             const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")

             let serverPath = `public/upload/documents/${documentId}_${file.name}`
             let DBPath = `/upload/documents/${documentId}_${file.name}`
             file.mv(serverPath, async (error) => {
                 if (error) {
                     return res.json({error: error.message})
                 } else {
                     let [result] = await adminService.updateDocument(connection, FileType, DBPath, id)
                     let [result1] = await adminService.insertDocument(connection, id, FileType, document, time, staffName, remarks)
                     return res.send({
                         responseCode: 2,
                         error: false,
                         warning: false,
                         message: "Document Updated Successfully"
                     })
                 }
             })
         }
        // let [result] = await adminService.updateBankDetails(connection,banker_name,branch_location,account_number,current_business_volume,id)
        //
        // return res.send({responseCode: 2, error: false, warning: false, message: "Bank Details Updated Successfully"})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

// -----------------------------------------============================================
adminController.SuspendAgent = async (req, res) => {
    let connection
    // let connection = await connectToDatabase();
    // await connection.beginTransaction()
    // console.log(req.body)
    try {
        connection = await connectToDatabase();
        const {id} = req.params
        // const password = `Tdo@${crypto.randomInt(1000, 9999)}`
        //
        // let salt = await bcrypt.genSalt(10)
        // let hashPassword = await bcrypt.hash(password, salt)

        let [agentData] = await adminService.readAgentByID(connection, id)

        if (agentData.length === 0) {
            return res.send({responseCode: 1, error: false, warning: true, message: "Invalid Agent."});
        } else {
            let email = agentData[0].email;
            let [data] = await adminService.suspendAgent(connection, id)
            await mailFunc.sendSuspendEmail(email)
            // await connection.commit()

            return res.send({
                responseCode: 2,
                error: false,
                warning: false,
                message: "Agent has been Suspended successfully."
            });
        }

    } catch (e) {
        // await connection.rollback()
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

adminController.GetSalesStaff = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        // let {staffId}=req.admin
        // console.log(req.admin)
        let [result] = await adminService.readSalesStaff(connection)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.SalesMapping = async (req, res) => {
    console.log(req.body)
    let connection
    try {
        connection = await connectToDatabase();
        let {SalesPerson,remarks,id} = req.body;
        let result = await adminService.salesMapping(connection, SalesPerson,remarks,id)
        let [data]=await  adminService.getSalesDetails(connection, SalesPerson)
        console.log(data)
        let name=data[0].first_name+" "+data[0].last_name
        let staffId=data[0].id
        let email=data[0].email
        let mobile=data[0].mobile;
        let update=await adminService.updateStaffDetails(connection,name,staffId,id,email,mobile)
        return res.send({
            responseCode: 2,
            error: false,
            warning: false,
            message: "Travel Agent Mapped Successfully."
        })
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});

    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.SearchStats = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        // let {staffId}=req.admin
        // console.log(req.admin)

        let [result] = await adminService.readActiveAgents(connection)
        for (let i = 0; i < result.length; i++) {
            let [search_data]=await adminService.countSearch(connection,result[i].id)
            let [search_data1]=await adminService.countBook(connection,result[i].id)
            search_data=search_data[0].search_count
            result[i].additionalData={
                search_count:search_data,
                book_count:search_data1[0].book_count,
            }
            // result[i].additionalData=0
        }

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.DetailsLogs = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        // let {staffId}=req.admin
        // console.log(req.admin)
        let [result] = await adminService.detailsLogs(connection)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.MappedAgentsData = async (req, res) => {
    let connection
    try {
        let{id}=req.params
        connection = await connectToDatabase();
        // let {staffId}=req.admin
        // console.log(req.admin)
        let [result] = await adminService.mappedAgentsData(connection,id)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
adminController.DocumentLogs = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        // let {staffId}=req.admin
        // console.log(req.admin)
        let [result] = await adminService.documentLogs(connection)
        console.log(result)
        for(let i=0;i<result.length;i++) {
            if (result[i].document_type === "company_trade_license") {
                result[i].document_type = "Trade License"
            }
            if (result[i].document_type === "director1_emirates_id_path") {
                result[i].document_type = "Director1 Emirates"
            }
            if (result[i].document_type === "director1_emirates_passport_path") {
                result[i].document_type = "Director1 Emirates Passport"
            }
            if (result[i].document_type === "director2_emirates_id_path") {
                result[i].document_type = "Director2 Emirates"
            }
            if (result[i].document_type === "director2_emirates_id_path") {
                result[i].document_type = "Director2 Emirates Passport"
            }
            if (result[i].document_type === "authorized_person_emirates_id_path") {
                result[i].document_type = "Signatory Emirates"
            }
            if (result[i].document_type === "authorized_person_emirates_passport_path") {
                result[i].document_type = "Signatory Emirates Passport"
            }
            if (result[i].document_type === "iata_document_path") {
                result[i].document_type = "IATA Document"
            }
        }
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.allAgentName = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let [result] = await adminService.allAgentName(connection)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.GetAgentDetails = async (req, res) => {
    let connection
    try {
        let{id}=req.params
        connection = await connectToDatabase();
        let [agentData] = await adminService.getAgentDetails(connection,id)
        let[walletId]= await adminService.getWalletId(connection,id)
        console.log(agentData);
        console.log(walletId[0].id);

        let [checkDetails] = await adminService.checkDetails(connection,walletId[0].id)
        if(checkDetails.length===0)
        {
            agentData[0].balance=0
            agentData[0].walletId=walletId[0].id
        }
        else {
            let [checkCreditAmount] = await adminService.checkCreditAmount(connection,walletId[0].id)
            let [checkDebitAmount] = await adminService.checkDebitAmount(connection,walletId[0].id)
            console.log(checkCreditAmount)
            console.log(checkDebitAmount)
            let creditAmount=parseFloat(checkCreditAmount[0].total_credit)
            let debitAmount=parseFloat(checkDebitAmount[0].total_debit)
            let amount=creditAmount-debitAmount
            agentData[0].balance=amount
            agentData[0].walletId=walletId[0].id
        }
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: agentData})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.AddWalletDetails = async (req, res) => {
    console.log(req.body);
    let connection
    try {
        let{staffName}=req.admin
        const dateTime = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let{walletId,action,amount,remarks,TotalBalance,Tid,MOT}=req.body
        connection = await connectToDatabase();
        if(action==="Debit")
        {
            if(amount>TotalBalance)
            {
                return res.send({responseCode: 1, error: false, warning: true, message: `Debit amount cannot be more than Total Balance`})
            }
            else {
                let [result] = await adminService.addWalletDetails(connection,walletId,action,amount,remarks,dateTime,Tid,MOT,staffName)

                return res.send({responseCode: 2, error: false, warning: false, message: `Amount ${action} Successfully`})
            }
        }
        else {
            let [result] = await adminService.addWalletDetails(connection,walletId,action,amount,remarks,dateTime,Tid,MOT,staffName)

            return res.send({responseCode: 2, error: false, warning: false, message: `Amount ${action} Successfully`})
        }

    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.GetActivityLogs = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        // let {staffId}=req.admin
        // console.log(req.admin)
        let [result] = await adminService.getActivityLogs(connection)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};


adminController.AddAgentLog = async (req, res) => {
    let connection
    try {
        let{description,id}=req.body
        let {staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createdAt = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        connection = await connectToDatabase();
        let[log]=await adminService.addAgentLog(connection,staffName,staffEmail,description,createdAt,id,client_ip)
        return res.send({responseCode: 2, error: false, warning: false, message: "success"})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.GetAgentLogs = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        // let {staffId}=req.admin
        // console.log(req.admin)
        let [result] = await adminService.getAgentLogs(connection)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.GetAgentActivityLogs = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        // let {staffId}=req.admin
        // console.log(req.admin)
        let [result] = await adminService.getAgentActivityLogs(connection)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.GetWalletSummary = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let{id}=req.params
        let [result] = await adminService.getWalletSummary(connection,id)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
// adminController.getPendingRequest = async (req, res) => {
//     let connection
//     try {
//         connection = await connectToDatabase();
//         let{id}=req.params
//         let [result] = await adminService.getPendingRequestData(connection)
//         return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
//     } catch (e) {
//         console.log('-----', e.message)
//         return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
//     }
//     finally {
//         if (connection) connection.release();  // Return the connection to the pool
//     }
// };
// adminController.ApprovePendingRequest = async (req, res) => {
//     let connection
//     try {
//         connection = await connectToDatabase();
//         let{id}=req.params
//         let {staffName,staffEmail}=req.admin
//         let [approve] = await adminService.approvePendingRequest(connection,id)
//         let[getData] = await adminService.getWalletRequestData(connection,id)
//         console.log(getData[0].agent_id,getData[0].amount,getData[0].mode_of_payment,getData[0].transaction_id)
//         let [getWalletId]=await adminService.getWalletId(connection,getData[0].agent_id)
//         let transaction_type="Credit"
//         const dateTime = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
//         let remarks="Payment Approved"
//         let [insertWalletDetails]=await adminService.insertWalletDetails(connection,getWalletId[0].id,transaction_type,getData[0].amount,dateTime,remarks,getData[0].transaction_id,getData[0].mode_of_payment)
//         let[log]=await adminService.addAgentLog(connection,staffName,staffEmail,remarks,dateTime,getData[0].agent_id)
//         return res.send({responseCode: 2, error: false, warning: false, message: "Payment Approved Successfully"})
//     } catch (e) {
//         console.log('-----', e.message)
//         return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
//     }
//     finally {
//         if (connection) connection.release();  // Return the connection to the pool
//     }
// };
adminController.getPendingRequest = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let{id}=req.params
        let [result] = await adminService.getPendingRequestData(connection)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
// adminController.ApprovePendingRequest = async (req, res) => {
//     console.log(req.body)
//     let connection
//     try {
//         connection = await connectToDatabase();
//         let{id}=req.params
//         let {staffName,staffEmail}=req.admin
//         let [approve] = await adminService.approvePendingRequest(connection,id)
//         let[getData] = await adminService.getWalletRequestData(connection,id)
//         let agentId=getData[0].agent_id
//         let t_id=getData[0].transaction_id
//         let [agentEmail]=await adminService.getAgentEmail(connection,agentId)
//         console.log("agentEmail",agentEmail)
//         let email=agentEmail[0].email
//         let [getWalletId]=await adminService.getWalletId(connection,getData[0].agent_id)
//         let transaction_type="Credit"
//         const dateTime = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
//         let remarks="Payment Request Approved"
//         let [insertWalletDetails]=await adminService.insertWalletDetails(connection,getWalletId[0].id,transaction_type,getData[0].amount,dateTime,remarks,getData[0].transaction_id,getData[0].mode_of_payment)
//         let[log]=await adminService.addAgentLog(connection,staffName,staffEmail,remarks,dateTime,getData[0].agent_id)
//         await mailFunc.walletAcceptRequest(email,t_id)
//         return res.send({responseCode: 2, error: false, warning: false, message: "Payment Approved Successfully"})
//     } catch (e) {
//         console.log('-----', e.message)
//         return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
//     }
//     finally {
//         if (connection) connection.release();  // Return the connection to the pool
//     }
// };

adminController.ApprovePendingRequest = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let{id}=req.params
        let {remarks_admin}=req.body
        let {staffId,staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        let update_by=staffId+"/"+staffEmail
        const dateTime = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let [approve] = await adminService.approvePendingRequest(connection,id,remarks_admin,update_by,dateTime)
        let[getData] = await adminService.getWalletRequestData(connection,id)
        let agentId=getData[0].agent_id
        let t_id=getData[0].transaction_id
        let [agentEmail]=await adminService.getAgentEmail(connection,agentId)
        console.log("agentEmail",agentEmail)
        let email=agentEmail[0].email
        let [getWalletId]=await adminService.getWalletId(connection,getData[0].agent_id)
        let transaction_type="Credit"

        let remarks=getData[0].remark_midoffice
        let [insertWalletDetails]=await adminService.insertWalletDetails(connection,getWalletId[0].id,transaction_type,getData[0].amount,dateTime,remarks,getData[0].transaction_id,getData[0].mode_of_payment,staffName)
        let[log]=await adminService.addAgentLog(connection,staffName,staffEmail,remarks,dateTime,getData[0].agent_id,client_ip)
        await mailFunc.walletAcceptRequest(email,t_id)
        return res.send({responseCode: 2, error: false, warning: false, message: "Payment Approved Successfully"})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

// adminController.RejectPendingRequest = async (req, res) => {
//     let connection
//     try {
//         connection = await connectToDatabase();
//         let{id}=req.params
//         let {staffName,staffEmail}=req.admin
//         let [reject] = await adminService.rejectPendingRequest(connection,id)
//         let[getData] = await adminService.getWalletRequestData(connection,id)
//         let agentId=getData[0].agent_id
//         let t_id=getData[0].transaction_id
//         let [agentEmail]=await adminService.getAgentEmail(connection,agentId)
//         console.log("agentEmail",agentEmail)
//         let email=agentEmail[0].email
//         const dateTime = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
//         let remarks="Payment Request Rejected"
//         let[log]=await adminService.addAgentLog(connection,staffName,staffEmail,remarks,dateTime,getData[0].agent_id)
//         await mailFunc.walletRejectRequest(email,t_id)
//         return res.send({responseCode: 2, error: false, warning: false, message: "Payment Rejected Successfully"})
//     } catch (e) {
//         console.log('-----', e.message)
//         return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
//     }
//     finally {
//         if (connection) connection.release();  // Return the connection to the pool
//     }
// };

adminController.RejectPendingRequest = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let{id}=req.params
        let {remarks_admin}=req.body
        let {staffId,staffName,staffEmail}=req.admin
        let client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log(client_ip)
        let update_by=staffId+"/"+staffEmail
        const dateTime = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let [reject] = await adminService.rejectPendingRequest(connection,id,remarks_admin,update_by,dateTime)
        let[getData] = await adminService.getWalletRequestData(connection,id)
        let agentId=getData[0].agent_id
        let t_id=getData[0].transaction_id
        let [agentEmail]=await adminService.getAgentEmail(connection,agentId)
        console.log("agentEmail",agentEmail)
        console.log("Client_ip",client_ip)
        let email=agentEmail[0].email
        let remarks="Payment Request Rejected"
        let[log]=await adminService.addAgentLog(connection,staffName,staffEmail,remarks,dateTime,getData[0].agent_id,client_ip)
        await mailFunc.walletRejectRequest(email,t_id)
        return res.send({responseCode: 2, error: false, warning: false, message: "Payment Rejected Successfully"})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

adminController.GetSearchResults = async (req, res) => {
    console.log(req.params)
    let connection
    try {
        let {id}=req.params
        connection = await connectToDatabase();
        let [result] = await adminService.getSearchResults(connection,id)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
adminController.GetFlightBookResults = async (req, res) => {

    let connection
    try {
        connection = await connectToDatabase();
        let [result] = await adminService.getFlightBookResults(connection)
        for (let i=0;i<result.length;i++)
        {
            let[result1] = await adminService.getFlightBookingDetailResults(connection,result[i].booking_id)
            result[i].details=result1
        }

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    }
    finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
function generatePassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

module.exports = adminController;