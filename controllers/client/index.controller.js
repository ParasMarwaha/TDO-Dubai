const indexController = {};
const agentServices = require("../../services/client/index.services")
const moment = require("moment");
require("moment-timezone")
const mailFuncs = require('../../utils/mails');
const connectToDatabase = require("../../db/connection");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const smsFuncs = require("../../utils/sms");
const {sign} = require("jsonwebtoken");
const adminService = require("../../services/admin/admin.service");
const {log} = require("console");
const mailFunc = require("../../utils/mails");


function generatePassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}
function capitalizeFirstLetter(string) {
    if (typeof string !== "string") return ""; // Return empty if input is not a string
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
// _____________________________________________________________________________
// Static Pages
indexController.AgentLogin = (req, res) => {
    res.render("agent/login");
}
indexController.PrivacyPolicy = async (req, res) => {
    res.render('agent/privacy_policy')
}
indexController.StatutoryDisclaimer = async (req, res) => {
    res.render('agent/refund_policy')
}
indexController.Register = (req, res) => {
    res.render("agent/Register");
};
indexController.ForgotPasswordPage = async (req, res) => {
    res.render('agent/forgetPassword')
}
indexController.ChangeFP = async (req, res) => {
    res.render('agent/forgetchangePassword')
}
indexController.TermsCondition = (req, res) => {
    res.render("agent/terms_condition");
};
indexController.Home = (req, res) => {
    res.render("agent/login")
}
indexController.aboutUs = (req, res) => {
    res.render("agent/about")
}
indexController.contactUs = (req, res) => {
    res.render("agent/contact")
}
indexController.ThankYou = (req, res) => {
    res.render("agent/ThankYou")
}
indexController.verify_otp = (req, res) => {
    res.render("agent/verifyOTP");
};

// After dashboard pages
indexController.changePassword = async (req, res) => {
    res.render('agent/agent_changePassword', {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}
indexController.AgentDashboard = (req, res) => {
    res.render("agent/Dashboard", {agentEmail: req.agent.agentEmail, userType: req.agent.userType});
};
indexController.LogsPage = async (req, res) => {
    res.render('agent/logs', {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}
indexController.agentProfile = (req, res) => {
    res.render("agent/agent-profile", {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}
indexController.Setting = (req, res) => {
    res.render("agent/setting", {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}
indexController.agent_markup_flight = (req, res) => {
    res.render("agent/agent_markup_flight", {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}
indexController.add_agent_markup_flight = (req, res) => {
    res.render("agent/add_agent_markup_flight", {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}
indexController.show_flight_search_log = (req, res) => {
    res.render("agent/show_search_flight_log", {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}
indexController.activityLog = (req, res) => {
    res.render("agent/activity_logs", {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}
indexController.WalletSummary = (req, res) => {
    res.render("agent/walletSummary", {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}

indexController.add_walletMID = (req, res) => {
    res.render("agent/request_to_addMoney", {
        agentEmail: req.agent.agentEmail,
        agentName: req.agent.agentName, userType: req.agent.userType
    })
}
indexController.agentWallet = (req, res) => {
    res.render("agent/agent_wallet", {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}
indexController.manageSub_user = (req, res) => {
    res.render("agent/manageUser", {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}
indexController.SubUser_log = (req, res) => {
    res.render("agent/SubUser_logIn_logOut", {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}
indexController.topUpSuccess = async (req, res) => {
    res.render("agent/topupSuccess", {
        agentEmail: req.agent.agentEmail,
        agentName: req.agent.agentName, userType: req.agent.userType
    })
}
// -------------------------------------------------------------
indexController.CheckLogin = async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();
        let {Email, Password} = req.body;
        let clientIp = req.headers['x-forwarded-for']?.split(',').shift() || req.connection?.remoteAddress || req.socket?.remoteAddress;
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss");
        let remarks = "login";

        // Check if email belongs to an agent
        let [data] = await agentServices.checkLogin(connection, Email);
        if (data.length === 0) {
            // Check if it's a sub-user
            let [data1] = await agentServices.checkSubUserLogin(connection, Email);
            if (data1.length === 0) {
                let status = "Fail (Invalid Email)";
                await agentServices.checkEmail(connection, Email, status, remarks, time, clientIp);
                return res.send({responseCode: 1, error: false, warning: true, message: "Invalid Email."});
            } else if (data1[0]['status'] === 'inactive') {
                let status = "Fail (Account Not Active)";
                await agentServices.subUserLog(connection, data1[0]['email'], status, remarks, time, data1[0]['id'], clientIp);
                return res.send({
                    responseCode: 1,
                    error: false,
                    warning: true,
                    message: "Your Account is not activated yet."
                });
            } else {
                // Sub-user login attempt
                let hashPassword = data1[0].password;
                let isMatch = await bcrypt.compare(Password, hashPassword);

                if (!isMatch) {
                    let status = "Fail (Invalid Password)";
                    await agentServices.subUserLog(connection, data1[0].email, status, remarks, time, data1[0]['id'], clientIp);
                    return res.send({responseCode: 1, error: false, warning: true, message: "Invalid Password."});
                } else {
                    // Fetch agent details for the sub-user
                    let [agentData] = await agentServices.checkLogin(connection, data1[0].travelAgent);
                    if (!agentData || agentData.length === 0) {
                        return res.send({responseCode: 1, error: true, warning: true, message: "Agent not found."});
                    } else {
                        // Successful sub-user login
                        const jwtToken = sign(
                            {
                                userId: data1[0].id,
                                SubUser_email: data1[0].email,
                                SubUser_Name: `${data1[0].firstName} ${data1[0].lastName}`,
                                userType: data1[0].type,
                                agentId: agentData[0].id,
                                agentName: agentData[0].establishment_name,
                                agentEmail: data1[0].travelAgent
                            },
                            process.env.JWT_SECRET,
                            {expiresIn: "1d"}
                        );

                        res.cookie('agentAuthToken', jwtToken, {
                            maxAge: 24 * 60 * 60 * 1000, // 24 hours
                            httpOnly: true
                        });
                        let status = "Success";
                        await agentServices.subUserLog(connection, data1[0].email, status, remarks, time, data1[0]['id'], clientIp);
                        return res.send({
                            responseCode: 2,
                            error: false,
                            warning: false,
                            message: "Login Successful",
                            data: {
                                SubUser_Name: `${data1[0].firstName} ${data1[0].lastName}`,
                                SubUser_email: data1[0].email,
                                token: jwtToken
                            }
                        });
                    }
                }
            }
        } else {
            // Agent login attempt
            if (data[0].status === "0") {
                let status = "Fail (Account Not Active)";
                await agentServices.accountNotActive(connection, data[0].establishment_name, Email, status, remarks, time, data[0].id, clientIp);
                return res.send({
                    responseCode: 1,
                    error: false,
                    warning: true,
                    message: "Your Account is not activated yet."
                });
            } else {
                let hashPassword = data[0].password;
                let isMatch = await bcrypt.compare(Password, hashPassword);

                if (!isMatch) {
                    let status = "Fail (Invalid Password)";
                    await agentServices.invalidPassword(connection, data[0].establishment_name, Email, status, remarks, time, data[0].id, clientIp);
                    return res.send({responseCode: 1, error: false, warning: true, message: "Invalid Password."});
                } else {
                    // Successful agent login
                    const jwtToken = sign(
                        {
                            userId: data[0].id,
                            agentEmail: data[0].email,
                            userType: "Travel agent",
                            agentId: data[0].id,
                            agentName: data[0].establishment_name
                        },
                        process.env.JWT_SECRET,
                        {expiresIn: "1d"}
                    );

                    res.cookie('agentAuthToken', jwtToken, {
                        maxAge: 24 * 60 * 60 * 1000, // 24 hours
                        httpOnly: true
                    });
                    let status = "Success";
                    await agentServices.invalidPassword(connection, data[0].establishment_name, Email, status, remarks, time, data[0].id, clientIp);
                    return res.send({
                        responseCode: 2,
                        error: false,
                        warning: false,
                        message: "Login Successful",
                        data: {
                            displayName: data[0].establishment_name,
                            email: data[0].email,
                            token: jwtToken
                        }
                    });
                }
            }
        }
    } catch (e) {
        return res.send({
            responseCode: 1,
            error: true,
            warning: false,
            message: "Error Occurred - " + e.message
        });
    } finally {
        if (connection) connection.release(); // Return the connection to the pool
    }
}
indexController.Logout = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        console.log(req.agent)
        let {agentName, agentEmail, agentId, userId, userType,SubUser_email} = req.agent
        // let clientIp = req.headers['x-forwarded-for']?.split(',').shift() || req.connection?.remoteAddress || req.socket?.remoteAddress;
        const clientIp = req.clientIp || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        let status = "Success"
        let remarks = "logout"
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        if (userType==='Travel agent'){
            let [logout] = await agentServices.logout(connection, agentName, agentEmail, status, remarks, time, agentId, clientIp)
        }
        else{

            await agentServices.subUserLog(connection,  SubUser_email, status, remarks, time, userId, clientIp)
        }

        res.clearCookie("agentAuthToken")
        res.redirect('/')
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

// --------------------------------------------------------------------
indexController.UploadPhoto = async (req, res) => {
    let connection
    try {
        let clientIp = req.headers['x-forwarded-for']?.split(',').shift() || req.connection?.remoteAddress || req.socket?.remoteAddress;
        let {agentEmail, agentId} = req.agent
        connection = await connectToDatabase();
        let {profileLogo} = req.files
        let serverPath = `public/upload/agent-profile-logo/${agentId}_${profileLogo.name}`
        let DBPath = `/upload/agent-profile-logo/${agentId}_${profileLogo.name}`
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        let remarks = "Update Profile_Logo"
        profileLogo.mv(serverPath, async (error) => {

            if (error) {
                return res.json({error: error.message})
            } else {
                let [result] = await agentServices.updatePhoto(connection, agentId, DBPath)
                let [changeLogoSuccess] = await agentServices.agentActivityLog(connection, agentEmail, remarks, time, agentId, clientIp)


                return res.send({
                    responseCode: 2,
                    error: false,
                    warning: false,
                    message: "Logo Updated Successfully."
                })
            }
        })
    } catch (e) {
        console.log('----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
indexController.GetAgentData = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        // console.log(req.agent)
        let {agentId} = req.agent
        let [result] = await agentServices.GetAgentData(connection, agentId)
        // console.log(result)

        return res.send({
            responseCode: 2,
            error: false,
            warning: false,
            data: result
        })
    } catch (e) {
        // console.log('----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
indexController.addAgents = async (req, res) => {

    let connection

    try {

        var director2_mobile = req.body.mobileId2 ? "971" + req.body.mobileId2 : '';

        // console.log(director2_mobile);

        connection = await connectToDatabase();

        const {signatory_type} = req.body

        const {director_2} = req.body

        let newPassportCountryFile, newEmiratesIdFile;

        let newPassportCountry;

        var director2_passport_expiry;

        var EmiratesIdValidity2;

        var iataAccreditedFileDP;

        var PassportCountryFile2DP;

        var EmiratesIdFile2DP;


        let {

            uploadLicense,

            PassportCountryFile1,

            EmiratesIdFile1,

            iataAccreditedFile,

            PassportCountryFile2,

            EmiratesIdFile2,

        } = req.files;


        if (signatory_type === 'Director 1') {

            newPassportCountryFile = PassportCountryFile1

            newEmiratesIdFile = EmiratesIdFile1

        }


        if (signatory_type === 'New Signatory') {

            newPassportCountryFile = req.files.newPassportCountryFile

            newEmiratesIdFile = req.files.newEmiratesIdFile


        }

        // ___________________________________________

        if (signatory_type === 'Director 1') {

            newPassportCountry = req.body.PassportCountry1;

        } else if (signatory_type === 'New Signatory') {

            newPassportCountry = req.body.newPassportCountry;

        }


        if (director_2 !== 'false') {

            director2_passport_expiry = req.body.PassportExpiryDate2;

            EmiratesIdValidity2 = req.body.EmiratesIdValidity2;

        } else if (director_2 === 'false') {

            // console.log("Director 2 is not involved");

            director2_passport_expiry = null;

            EmiratesIdValidity2 = null;

        }


        // ___________________________________________

        const generateUniqueId = () => {

            return Math.floor(Date.now() + Math.random() * 1000);

        }


        // Generate unique IDs for each file

        let uploadLicenseId = generateUniqueId();

        let PassportCountryFile1Id = generateUniqueId();

        let EmiratesIdFile1Id = generateUniqueId();

        let PassportCountryFile2Id = generateUniqueId();

        let EmiratesIdFile2Id = generateUniqueId();

        let newPassportCountryFileId = generateUniqueId();

        let newEmiratesIdFileId = generateUniqueId();

        let iataAccreditedFileId = generateUniqueId();


        const {iataAccredited} = req.body

        if (iataAccredited === 'Yes') {

            let iataAccreditedFileSP = `public/upload/documents/${iataAccreditedFileId}_${iataAccreditedFile.name}`

            iataAccreditedFileDP = `/upload/documents/${iataAccreditedFileId}_${iataAccreditedFile.name}`


            iataAccreditedFile.mv(iataAccreditedFileSP, (error) => {

                if (error) {

                    return res.json({error: error.message})

                }

            })

        } else {

            //console.log("No")

            iataAccreditedFileDP = 'null'


        }

        if (director_2 !== 'false') {

            let PassportCountryFile2SP = `public/upload/documents/${PassportCountryFile2Id}_${PassportCountryFile2.name}`

            let EmiratesIdFile2SP = `public/upload/documents/${EmiratesIdFile2Id}_${EmiratesIdFile2.name}`


            PassportCountryFile2DP = `/upload/documents/${PassportCountryFile2Id}_${PassportCountryFile2.name}`

            EmiratesIdFile2DP = `/upload/documents/${EmiratesIdFile2Id}_${EmiratesIdFile2.name}`


            PassportCountryFile2.mv(PassportCountryFile2SP, (error) => {

                if (error) {

                    return res.json({error: error.message})

                }

            })

            EmiratesIdFile2.mv(EmiratesIdFile2SP, (error) => {

                if (error) {

                    return res.json({error: error.message})

                }

            })

        } else if (director_2 === 'false') {

            PassportCountryFile2DP = 'null'

            EmiratesIdFile2DP = 'null'


        }

        // let x=new Date().getTime()


        let uploadLicenseSP = `public/upload/documents/${uploadLicenseId}_${uploadLicense.name}`

        let PassportCountryFile1SP = `public/upload/documents/${PassportCountryFile1Id}_${PassportCountryFile1.name}`

        let EmiratesIdFile1SP = `public/upload/documents/${EmiratesIdFile1Id}_${EmiratesIdFile1.name}`

        let newPassportCountryFileSP = `public/upload/documents/${newPassportCountryFileId}_${newPassportCountryFile.name}`

        let newEmiratesIdFileSP = `public/upload/documents/${newEmiratesIdFileId}_${newEmiratesIdFile.name}`

        let uploadLicenseDP = `/upload/documents/${uploadLicenseId}_${uploadLicense.name}`

        let PassportCountryFile1DP = `/upload/documents/${PassportCountryFile1Id}_${PassportCountryFile1.name}`

        let EmiratesIdFile1DP = `/upload/documents/${EmiratesIdFile1Id}_${EmiratesIdFile1.name}`

        let newPassportCountryFileDP = `/upload/documents/${newPassportCountryFileId}_${newPassportCountryFile.name}`

        let newEmiratesIdFileDP = `/upload/documents/${newEmiratesIdFileId}_${newEmiratesIdFile.name}`


        uploadLicense.mv(uploadLicenseSP, (error) => {

            if (error) {

                return res.json({error: 'error'})

            }

        })


        PassportCountryFile1.mv(PassportCountryFile1SP, (error) => {

            if (error) {

                return res.json({error: error.message})

            }

        })


        EmiratesIdFile1.mv(EmiratesIdFile1SP, (error) => {

            if (error) {

                return res.json({error: error.message})

            }

        })


        newPassportCountryFile.mv(newPassportCountryFileSP, (error) => {

            if (error) {

                return res.json({error: error.message})

            }

        })

        newEmiratesIdFile.mv(newEmiratesIdFileSP, (error) => {

            if (error) {

                return res.json({error: error.message})

            }

        })


        // let allFiles=req.files

        // console.log("All Data",req.body)

        const {email, MobileNo} = req.body

        const mobile_number = '971' + MobileNo

        let [record] = await agentServices.verifyExistingAgent(connection, email, mobile_number)

        console.log(record.length)

        if (record.length !== 0) {

            return res.json({error: true, message: 'Email and Mobile Number already Exists..'});

        } else {

            const date = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

            const alldata =

                {

                    establishment_name: req.body.nameEstablishment,

                    company_trade_license: req.body.tradeLicense,

                    company_trade_license_path: uploadLicenseDP,

                    address: req.body.address,

                    nature_of_business: req.body.natureOfBusiness,

                    area: req.body.area,

                    emirates: req.body.emirates,

                    email: req.body.email,

                    mobile: mobile_number,

                    director1_name: req.body.namePassport1,

                    director1_nationality: req.body.Nationality1,

                    director1_passport_issuing_country: req.body.PassportCountry1,

                    director1_passport_number: req.body.PassportNumber1,

                    director1_passport_expiry: req.body.PassportExpiryDate1,

                    director1_emirates_id_path: EmiratesIdFile1DP,

                    director1_emirates_passport_path: PassportCountryFile1DP,

                    director1_emirates_id_expiry: req.body.EmiratesIdValidity1,

                    director1_email: req.body.emailId1,

                    director1_mobile: req.body.mobileId1,

                    director1_emirates_id: req.body.EmiratesId1,


                    director2_name: req.body.namePassport2,

                    director2_nationality: req.body.Nationality2,

                    director2_passport_issuing_country: req.body.PassportCountry2,

                    director2_passport_number: req.body.PassportNumber2,

                    // director2_passport_expiry: req.body.director2_passport_expiry,

                    director2_passport_expiry: director2_passport_expiry,

                    director2_emirates_id: req.body.EmiratesId2,

                    director2_emirates_id_path: EmiratesIdFile2DP,

                    director2_emirates_passport_path: PassportCountryFile2DP,

                    director2_email: req.body.emailId2,

                    director2_mobile: director2_mobile,

                    director2_emirates_id_expiry: EmiratesIdValidity2,


                    authorized_person_name: req.body.newNamePassport,

                    authorized_person_nationality: req.body.newNationality,

                    authorized_person_passport_issuing_country: newPassportCountry,

                    authorized_person_passport_number: req.body.newPassportNumber,


                    authorized_person_passport_expiry: req.body.newPassportExpiryDate,

                    authorized_person_emirates_id: req.body.newEmiratesId,

                    authorized_person_emirates_id_path: newEmiratesIdFileDP,

                    authorized_person_emirates_passport_path: newPassportCountryFileDP,

                    authorized_person_emirates_id_expiry: req.body.newEmiratesIdValidity,

                    authorized_person_email: req.body.newEmailId,

                    authorized_person_mobile: req.body.newMobileId,


                    banker_name: req.body.bankerName,

                    branch_location: req.body.branchLocation,

                    account_number: req.body.accountNumber,

                    current_business_volume: req.body.businessVolume,

                    iata_accredited: req.body.iataAccredited,

                    iata_document_path: iataAccreditedFileDP,

                    email_for_invoice: req.body.email,

                    assisted_by: req.body.staffName,

                    assisted_by_details: req.body.staffId,

                    password: null,

                    status: 0,

                    createdOn: date,

                    createdBy: 'self',

                    verifiedBy: null

                }


            const datetime = moment().tz(process.env.TIME_ZONE).format('YYYY-MM-DD HH:mm:ss')

            let [result2] = await agentServices.addAgents(connection, alldata)

            console.log(result2)

            const {insertId} = result2


            if (req.body.staffName.trim() !== "" && req.body.staffId.trim() !== "") {


                const [data] = await agentServices.getEmailMobile(connection, req.body.staffId);

                let email = data[0].email

                let mobile = data[0].mobile

                const [data1] = await agentServices.updateEmailMobile(connection, insertId, email, mobile);

            }

            // const insertId=148

            let result5 = await agentServices.prepaid_wallet(connection, insertId, datetime)


            let expireTime = moment().add(5, 'minutes').tz(process.env.TIME_ZONE).format('YYYY-MM-DD HH:mm:ss')

            const mobileOTP = crypto.randomInt(100000, 999999)

            const emailOTP = crypto.randomInt(100000, 999999)

            const result3 = await agentServices.sendOTPToAgentEmail(connection, email, emailOTP, datetime, expireTime, insertId)

            const result4 = await agentServices.sendOTPToAgentMobile(connection, mobile_number, mobileOTP, datetime, expireTime, insertId)

            await mailFuncs.sendOTPEmail(email, emailOTP)

            await smsFuncs.sendSMS(mobile_number, mobileOTP)

            await connection.commit()

            return res.send({

                error: false,

                message: 'Your Data has been Saved Successfully, Please Verify Your Email and Phone Number.',

                id: insertId

            })

        }


    } catch (e) {

        // await connection.rollback()

        console.log('----', e.message)

        return res.send({error: true, message: e.message})

    } finally {

        if (connection) connection.release();  // Return the connection to the pool

    }

}
indexController.VerifyAgentOTP = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        const {id, mobileOTP, emailOTP} = req.body
        let [verifyEmailOTP] = await agentServices.verifyEmailOTP(connection, emailOTP, id)
        let [verifyMobileOTP] = await agentServices.verifyMobileOTP(connection, mobileOTP, id)
        if (verifyEmailOTP.length === 0) {
            return res.send({responseCode: 1, error: false, warning: true, message: "Invalid Email OTP."})
        } else if (verifyMobileOTP.length === 0) {
            return res.send({responseCode: 1, error: false, warning: true, message: "Invalid Mobile OTP."})
        } else {
            let [details] = await agentServices.getAgentDetailsByID(connection, id)
            let email = details[0].email
            await mailFuncs.signUpMail(email)

            return res.send({
                responseCode: 2,
                error: false,
                warning: false,
                message: "OTP has been verifies successfully."
            })
        }
    } catch (e) {
        // await connection.rollback()
        console.log('----', e.message)
        return res.send({error: true, message: e.message})
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
indexController.GetOtp = async (req, res) => {
    let connection
    // let connection = await connectToDatabase();
    // await connection.beginTransaction()
    try {
        connection = await connectToDatabase();
        let {id} = req.params
        let [result] = await agentServices.GetOtp(connection, id)
        // console.log(result[0].otp)

        return res.send({
            responseCode: 2,
            error: false,
            warning: false,
            otp: result[0].otp
        })
    } catch (e) {
        // await connection.rollback()
        console.log('----', e.message)
        return res.send({error: true, message: e.message})
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
indexController.ChangePassword = async (req, res) => {
    let connection;
    try {
        // console.log("req.Agent", req.agent);
        let {agentEmail, agentId, userType, userId} = req.agent;  // Extract values from the middleware
        let {oldPassword, newPassword} = req.body;
        console.log(oldPassword)
        connection = await connectToDatabase();

        // Get client IP address
        let clientIp = req.headers['x-forwarded-for']?.split(',').shift() || req.connection?.remoteAddress || req.socket?.remoteAddress;

        // Initialize variables for password check and logs
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss");
        let remarks = "Update Password";

        // Step 1: Check old password based on user type (agent or sub-user)
        let hashOldPassword;
        if (userType === "Travel agent") {
            // Fetch agent password
            let [result] = await agentServices.checkOldPassword(connection, agentId);
            if (result.length === 0) {
                return res.send({responseCode: 1, error: false, warning: true, message: "Agent not found."});
            }
            hashOldPassword = result[0].password;
        } else {
            // Fetch sub-user password
            let [result1] = await agentServices.checkOldPasswordSubUser(connection, userId);
            if (result1.length === 0) {
                return res.send({responseCode: 1, error: false, warning: true, message: "Sub-user not found."});
            }
            hashOldPassword = result1[0].password;
        }

        // Step 2: Compare the provided old password with the stored hash
        let isMatch = await bcrypt.compare(oldPassword, hashOldPassword);
        if (!isMatch) {
            return res.send({responseCode: 1, error: false, warning: true, message: "Old Password is not correct."});
        }

        // Step 3: Generate new hashed password
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(newPassword, salt);

        // Step 4: Update password based on user type
        if (userType === "Travel agent") {
            await agentServices.updatePassword(connection, agentId, hashPassword);
            await agentServices.agentActivityLog(connection, agentEmail, remarks, time, agentId, clientIp);

        } else {
            console.log("done this ")
            await agentServices.updatePasswordSubUser(connection, userId, hashPassword);
        }

        // Step 5: Log the activity
        // await agentServices.agentActivityLog(connection, agentEmail, remarks, time, agentId, clientIp);

        // Send success response
        return res.send({
            responseCode: 2,
            error: false,
            warning: false,
            message: "Password Changed Successfully"
        });
    } catch (e) {
        console.log('-----', e.message);
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.GetFPOtp = async (req, res) => {
    let connection
    try {
        // console.log(req.body)
        const {Email} = req.body
        connection = await connectToDatabase();
        // const password = generatePassword(8);
        const otp = `${crypto.randomInt(100000, 999999)}`

        let [agentData] = await agentServices.readAgentByEmail(connection, Email)

        if (agentData.length === 0) {
            return res.send({responseCode: 1, error: false, warning: true, message: "Email Does Not Exist."});
        } else {
            let [data] = await agentServices.updateOtp(connection, otp, Email)
            await mailFuncs.sendFPOtp(Email, otp)


            return res.send({
                responseCode: 2,
                error: false,
                warning: false,
                message: "OTP has been Sent To Given Email Address."
            });
        }

    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
indexController.VerifyFPOtp = async (req, res) => {
    let connection
    try {
        // console.log(req.body)
        const {Email, otp} = req.body
        let otp1 = otp
        connection = await connectToDatabase();
        // const password = generatePassword(8);
        const password = generatePassword(8);
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)
        let [agentData] = await agentServices.readAgentByEmail(connection, Email)

        if (agentData[0].otp !== otp1) {
            // console.log(agentData[0].otp)
            // console.log(otp1)
            return res.send({responseCode: 1, error: false, warning: true, message: "OTP does not Matched."});
        } else {

            let [data] = await agentServices.updatePasswordByEmail(connection, hashPassword, Email)
            await mailFuncs.sendResetPasswordEmail(Email, password)

            return res.send({
                responseCode: 2,
                error: false,
                warning: false,
                message: "Password has been sent successfully."
            });
        }

    } catch (e) {
        // console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
indexController.GetLogData = async (req, res) => {
    let connection
    try {
        let {agentId} = req.agent
        connection = await connectToDatabase();
        let [result] = await agentServices.getLogData(connection, agentId)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.get_assistance_data = async (req, res) => {
    let connection
    try {
        let {agentId} = req.agent
        connection = await connectToDatabase();
        let [result] = await agentServices.getStaffData(connection, agentId)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.GetFlightSearch = async (req, res) => {
    let connection
    try {
        let {agentId} = req.agent

        connection = await connectToDatabase();
        let [result] = await agentServices.getFlightSearch(connection, agentId)
        let [result1] = await agentServices.getFlightBook(connection, agentId)
        let [totalFlightRevenue] = await agentServices.getTotalFlightRevenue(connection, agentId)
        result[0].book_count = result1[0].book_count;
        result[0].totalFlightRevenue = totalFlightRevenue[0].totalFlightRevenue;
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.VerifyStaff = async (req, res) => {
    let connection
    try {
        let {id} = req.params
        connection = await connectToDatabase();
        let [result] = await agentServices.verifyStaffId(connection, id)
        if (result.length === 0) {
            return res.send({responseCode: 1, error: false, warning: true, message: "No Staff Found"})
        } else {
            return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
        }

    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.GetFare = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let [result] = await agentServices.getFareData(connection)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.GetCarrier = async (req, res) => {
    let connection
    try {
        let {agentId} = req.agent
        connection = await connectToDatabase();
        let [result] = await agentServices.getCarrierData(connection, agentId)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.AddAgentMarkup = async (req, res) => {
    let connection
    try {
        console.log(req.body)
        let {agentId, agentEmail} = req.agent;
        let {plan_type, fare_type, trip_type, markup_type, deposit_value, airline} = req.body;
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss");
        connection = await connectToDatabase();

        // If the airline is an empty string, handle case 1
        if (airline === '') {
            let [result] = await agentServices.addMarkup1(connection, plan_type, trip_type, markup_type, deposit_value, agentId, agentEmail, time);
            return res.send({responseCode: 2, error: false, warning: false, message: "Markup Added Successfully"});
        }
        // If 'all' airlines are selected, handle case 2
        else {
            let [result] = await agentServices.addMarkup2(connection, plan_type, fare_type, trip_type, markup_type, deposit_value, airline, agentId, agentEmail, time);
            return res.send({responseCode: 2, error: false, warning: false, message: "Markup Added Successfully"});
        }
        // If a single airline is selected, ensure it is treated as a single ID, not split into characters
        // else if (typeof airline === 'string' && airline.length > 2) {
        //     // Single airline ID as string, handle as one item
        //     let [result] = await agentServices.addMarkup2(connection, plan_type, fare_type, trip_type, markup_type, deposit_value, airline, agentId, agentEmail, time);
        //     return res.send({ responseCode: 2, error: false, warning: false, message: "Markup Added Successfully" });
        // }

        // else {
        //     return res.send({ responseCode: 1, error: true, warning: true, message: "Invalid airline data" });
        // }
    } catch (e) {
        console.log('-----', e.message);
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.getAgentMarkup = async (req, res) => {
    let connection
    try {
        let {agentId} = req.agent
        connection = await connectToDatabase();
        let [result] = await agentServices.getMarkup(connection, agentId)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();
    }
};
indexController.UpdateAgentMarkup = async (req, res) => {
    let connection
    try {
        let {markup_id, deposit_value} = req.body
        connection = await connectToDatabase();
        let [result] = await agentServices.updateAgentMarkup(connection, markup_id, deposit_value)
        return res.send({responseCode: 2, error: false, warning: false, message: "Markup Value Updated Successfully"});
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();
    }
};
indexController.DeleteAgentMarkup = async (req, res) => {
    let connection
    try {
        let {id} = req.params
        connection = await connectToDatabase();
        let [result] = await agentServices.deleteAgentMarkup(connection, id)
        return res.send({responseCode: 2, error: false, warning: false, message: "Markup Deleted Successfully"});
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();
    }
};
indexController.GetSearchLog = async (req, res) => {
    let connection
    try {
        let {agentId} = req.agent
        connection = await connectToDatabase();
        let [result] = await agentServices.getSearchLog(connection, agentId)
        return res.send({responseCode: 2, error: false, warning: false, message: "Success", data: result});
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();
    }
};
indexController.GetBalance = async (req, res) => {
    let connection
    try {
        let {agentId} = req.agent
        connection = await connectToDatabase();
        let [walletId] = await agentServices.getWalletId(connection, agentId)
        console.log(walletId[0].id)
        let [checkCreditAmount] = await agentServices.checkCreditAmount(connection, walletId[0].id)
        let [checkDebitAmount] = await agentServices.checkDebitAmount(connection, walletId[0].id)
        let creditAmount = parseFloat(checkCreditAmount[0].total_credit)
        let debitAmount = parseFloat(checkDebitAmount[0].total_debit)
        let amount = creditAmount - debitAmount
        walletId[0].creditAmount = creditAmount;
        walletId[0].debitAmount = debitAmount
        walletId[0].balance = amount
        return res.send({responseCode: 2, error: false, warning: false, message: "Success", data: walletId});
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();
    }
};
indexController.getActivityData = async (req, res) => {
    let connection
    try {
        let {agentId} = req.agent
        connection = await connectToDatabase();
        let [result] = await agentServices.getActivityData(connection, agentId)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.GetWalletSummary = async (req, res) => {
    let connection
    try {
        let {agentId} = req.agent
        connection = await connectToDatabase();
        let [data] = await agentServices.getWalletId(connection, agentId)
        let [result] = await agentServices.getWalletSummary(connection, data[0].id)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.GetWalletSummaryByDates = async (req, res) => {
    let connection
    try {
        let {agentId} = req.agent
        let {fromDate, toDate} = req.body
        console.log(fromDate, toDate, agentId)
        connection = await connectToDatabase();
        let [data] = await agentServices.getWalletId(connection, agentId)
        let [result] = await agentServices.getWalletSummaryByDates(connection, data[0].id, fromDate, toDate)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.AddWalletRequest = async (req, res) => {
    console.log(req.body)
    let connection
    try {
        let clientIp = req.headers['x-forwarded-for']?.split(',').shift() || req.connection?.remoteAddress || req.socket?.remoteAddress;
        let {amount, deposit_date, p_mode, account, transaction_id, agent_remarks} = req.body
        console.log(req.body)
        let {agentId, agentEmail} = req.agent
        let status = 0
        connection = await connectToDatabase();
        // Check if the transaction ID already exists
        let [existingTransaction] = await agentServices.checkTransactionIdExists(connection, transaction_id);
        if (existingTransaction.length > 0) {
            return res.send({
                responseCode: 1,
                error: false,
                warning: true,
                message: "Transaction ID already exists."
            });
        } else {
            let {transaction_screenshot} = req.files
            const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
            let serverPath = `public/upload/payment_screenshot/${agentId}_${transaction_screenshot.name}`
            let DBPath = `/upload/payment_screenshot/${agentId}_${transaction_screenshot.name}`
            let remarks = "Request to Add Money"
            transaction_screenshot.mv(serverPath, async (error) => {
                if (error) {
                    return res.json({error: error.message})
                } else {
                    let [result] = await agentServices.addRequest(connection, agentId, amount, deposit_date, p_mode, account, transaction_id, agent_remarks, DBPath, status)
                    let [addWalletRequesLog] = await agentServices.agentActivityLog(connection, agentEmail, remarks, time, agentId, clientIp)
                    return res.send({
                        responseCode: 2,
                        error: false,
                        warning: false,
                        message: "Wallet request sent successfully."
                    })
                }
            })
        }
    } catch (e) {
        console.log('----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
indexController.GetAgentWalletRequest = async (req, res) => {
    let connection
    try {
        console.log(req.body)
        let {agentId} = req.agent
        connection = await connectToDatabase();
        let [result] = await agentServices.AgentWalletRequest(connection, agentId)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.AddWalletDetails = async (req, res) => {
    // console.log(req.body)
    let connection
    try {
        let {agentId} = req.agent
        let {amount, transaction_type, mode_of_payment} = req.body
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
        connection = await connectToDatabase();
        let [getWalletId] = await agentServices.getWalletId(connection, agentId)
        let [result] = await agentServices.addWalletDetails(connection, getWalletId[0].id, transaction_type, amount, time, mode_of_payment)

        return res.send({responseCode: 2, error: false, warning: false, message: "success"})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.getSubUserLogData = async (req, res) => {
    let connection
    try {
        // let {agentId} = req.agent
        connection = await connectToDatabase();
        let [result] = await agentServices.getSubUserLogData(connection)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};
indexController.fetchGatewayCharges = async (req, res) => {
    let connection
    try {
        connection = await connectToDatabase();
        let [result] = await agentServices.fetchGatewayCharges(connection)
        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }

}
indexController.topUp_options = async (req, res) => {
    const tx = new Date().getTime().toString();

    let {agentName, agentEmail, agentMobile} = req.agent
    let {payment_option, total_amount, payType} = req.body
    payment_option = capitalizeFirstLetter(payment_option);
    try {
        connection = await connectToDatabase();

        // Razorpay payment options
        const options = {
            key: 'rzp_test_VWMHIe8lj7h1ib',
            amount: parseInt(total_amount) * 100,
            currency: "INR",
            name: "Travel Deals Online DXB",
            description: "Test Transaction",
            image: "/assets/img/TDO_logo1.png",

            // Prefill Razorpay form with customer details
            prefill: {
                "name": `${agentName}`,
                "email": `${agentEmail}`,
                "contact": `${agentMobile}`
            },
            // Payment method configuration
            config: {
                display: {
                    blocks: {
                        banks: {
                            name: `Pay via ${payment_option}`,
                            instruments: [
                                {
                                    method: `${payType}` // e.g., card, netbanking
                                }
                            ],
                        },
                    },
                    sequence: ['block.banks'],
                    preferences: {
                        show_default_blocks: false,
                    },
                },
            },

            // callback_url: ${process.env.CALL_BACK_URL}/agent/topupSuccess/${res.razorpay_payment_id}/${payment_option},
            callback_url: `${process.env.CALL_BACK_URL}/agent/topUpSuccess`,

            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#ff0000"
            }
        };
        res.json(options);


    } catch (e) {
        console.error("Error in topUp_options:", e.message);
        return res.status(500).send({responseCode: 1, error: true, warning: false, message: e.message});
    }
}
indexController.agentWalletTopUp = async (req, res) => {
    const tx = new Date().getTime().toString();
    let {agentId, agentName, agentEmail, agentMobile} = req.agent
    let {amount, payment_option, processing_fee, total_amount, payType} = req.body
    payment_option = capitalizeFirstLetter(payment_option);

    let clientIp = req.headers['x-forwarded-for']?.split(',').shift() || req.connection?.remoteAddress || req.socket?.remoteAddress;
    const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
    try {
        connection = await connectToDatabase();
        let [walletId] = await agentServices.getWalletId(connection, agentId);
        let transaction_type = "Credit";
        let remarks = `By Payment Gateway. Processing fee: ${processing_fee}, Total amount: ${total_amount}`;
        let log_remarks = "Wallet TopUp (Success)"
        //
        let [result] = await agentServices.WalletTopUp(connection, walletId[0].id, transaction_type, amount, time, remarks, tx, payment_option, 'self');
        let [WalletLog] = await agentServices.agentActivityLog(connection, agentEmail, log_remarks, time, agentId, clientIp)
        return res.json({
            responseCode: 2,
            error: false,
            message: `Success - ${amount} added to your wallet.`
        });
    } catch (e) {
        console.error("Error in topUp_options:", e.message);
        return res.status(500).send({responseCode: 1, error: true, warning: false, message: e.message});
    }
}
indexController.user_action = async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();

        // Extract request body and agent data
        const {firstName, lastName, mobile, email, userType, location} = req.body;
        const {agentId, agentEmail, agentName} = req.agent;


        // Format the mobile number with the country code and set other default values
        const mobileNo = '971' + mobile;
        const status = 'active';
        const travelAgent = agentEmail;
        const remarks = "Sub User Added";
        const password = `Tdo@${crypto.randomInt(1000, 9999)}`;
        let clientIp = req.headers['x-forwarded-for']?.split(',').shift() || req.connection?.remoteAddress || req.socket?.remoteAddress;
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")

        // Hash the password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Verify if the email or mobile already exists for agents or sub-agents
        const [existingAgentEmail] = await agentServices.verifyExistingAgentEmail(connection, email);
        if (existingAgentEmail.length !== 0) {
            return res.json({error: true, message: 'Email already exists for an agent.'});
        }

        const [existingAgentMobile] = await agentServices.verifyExistingAgentMobile(connection, mobileNo);
        if (existingAgentMobile.length !== 0) {
            return res.json({error: true, message: 'Mobile number already exists for an agent.'});
        }

        const [existingSubAgentEmail] = await agentServices.verifyExistingSubAgentEmail(connection, email);
        if (existingSubAgentEmail.length !== 0) {
            return res.json({error: true, message: 'Email already exists for a sub-agent.'});
        }

        const [existingSubAgentMobile] = await agentServices.verifyExistingSubAgentMobile(connection, mobileNo);
        if (existingSubAgentMobile.length !== 0) {
            return res.json({error: true, message: 'Mobile number already exists for a sub-agent.'});
        }
        let [insertData] = await agentServices.addSubAgents(connection, firstName, lastName, mobileNo, email, hashPassword, userType, status, travelAgent, location)
        let [SubUserLogoSuccess] = await agentServices.agentActivityLog(connection, agentEmail, remarks, time, agentId, clientIp)

        await mailFuncs.sendMailSubUser(email, password, agentEmail, agentName)
        await connection.commit()
        return res.send({
            error: false,
            message: 'New user successfully registered.'

        })
    } catch (error) {
        console.log('----', error.message);
        return res.json({error: true, message: error.message});
    } finally {
        // Release the connection back to the pool, if established
        if (connection) connection.release();
    }
};
indexController.read_users = async (req, res) => {
    let connection
    try {

        let {agentEmail} = req.agent
        connection = await connectToDatabase();
        let [result] = await agentServices.read_subUsers(connection, agentEmail)

        return res.send({responseCode: 2, error: false, warning: false, message: "success", data: result})
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}
indexController.user_status = async (req, res) => {
    let connection;
    try {
        const {status} = req.body;  // Extract status from request body
        const {id} = req.params;    // Extract user ID from request parameters
        const {agentId, agentEmail, agentName} = req.agent;
        const remarks = "Sub User Status Updated"

        // Connect to database
        connection = await connectToDatabase();
        let clientIp = req.headers['x-forwarded-for']?.split(',').shift() || req.connection?.remoteAddress || req.socket?.remoteAddress;
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")

        // Call the service to update the user status
        let [result] = await agentServices.updateUserStatus(connection, status, id);
        let [SubUserLogoSuccess] = await agentServices.agentActivityLog(connection, agentEmail, remarks, time, agentId, clientIp)


        // Return success response
        return res.send({
            responseCode: 2,
            error: false,
            warning: false,
            message: "The Sub-user status has been successfully updated."
        });
    } catch (e) {
        console.log('-----', e.message);
        // Return error response
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release(); // Release the database connection
    }
};
indexController.user_resetPassword = async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();
        const {id} = req.params
        const password = `Tdo@${crypto.randomInt(1000, 9999)}`;
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)
        let [subUserData] = await agentServices.readAgentByID(connection, id)

        if (subUserData.length === 0) {
            return res.send({responseCode: 1, error: false, warning: true, message: "Invalid Sub-User."});
        }
        // else if (subUserData[0]['status']==='')
        else {
            if (subUserData[0]['status']==='active') {
                let email = subUserData[0].email;
                // console.log(agentData[0].password)

                let [data] = await agentServices.updateResendPassword(connection, hashPassword, id)
                await mailFunc.sendResetPasswordEmailSubUser(email, password)


                return res.send({
                    responseCode: 2,
                    error: false,
                    warning: false,
                    message: "Password has been Sent successfully."
                });
            }
            else{
                // return res.send({
                //     responseCode: 2,
                //     error: false,
                //     warning: true,
                //     message: "Sub-User Account is not activated Now"
                // });
                return res.send({
                    responseCode: 1,
                    error: false,
                    warning: true,
                    message: "Sub-user account is inactive."
                });
            }
        }
    } catch (e) {
        console.log('-----', e.message)
        return res.send({responseCode: 1, error: true, warning: false, message: "Error Occurred - " + e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}


module.exports = indexController;
