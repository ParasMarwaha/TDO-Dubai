const nodeMailer = require("nodemailer");
const mailFuncs = {}

mailFuncs.sendMailSubUser = (to,password,agentEmail,agentName) => {

    let email = to;
    console.log(to,password,agentEmail,agentName)
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `New User Signup Confirmation`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;font-weight:normal;color:rgb(34,34,34)">
                                            <p>Dear Team,</p>
                                            <p>You has been added by Travel Agent named ${agentName} ,(${agentEmail}), Your login details are as follows</p>
                                            
                                            <br><br>
                                            
                                            <table border="1" cellpadding="10" cellspacing="0">
  
  <tr>
    <th>Email Id</th>
    <td>${email}</td>
  </tr>
  <tr>
    <th>Password</th>
    <td>${password}</td>
  </tr>
</table>

                                            
                                          
                                            Thanks and regards,
                                            <br>TDO DXB
                                            <br>Unit of Golden Gateways LLC
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.sendResetPasswordEmail = (to, password) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `New Password`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;color:rgb(34,34,34)">
                                         <p>Dear Travel Partner,</p>
                                           <p>We wanted to inform you that your password has been successfully reset.</p>
                                           <p>Your new password is: <b>${password}</b></p>
                                           <p>For security reasons, we recommend that you log in and change this password as soon as possible.</p>
                                            <br>
                                           <p>If you encounter any issues or need further assistance, please do not hesitate to contact us.</p>
                                           <br>
                                           Regards,<br>
                                           Team TDO DXB
</div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.sendResetPasswordEmailSubUser = (to, password) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `New Password Confirmation`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;color:rgb(34,34,34)">
                                         <p>Dear Travel Sub-Partner,</p>
                                           <p>We wanted to inform you that your password has been successfully reset.</p>
                                           <p>Your new password is: <b>${password}</b></p>
                                           <br>
                                           Thanks and Regards,<br>
                                           Team TDO DXB <br>
                                           Unit of Golden Gateways LLC
</div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.sendOTPEmail = (to, otp) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `Email Verification OTP: ${otp}`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;font-weight:normal;color:rgb(34,34,34)">
                                            <p>Dear Travel Partner,</p>
                                            <p>Your email verification OTP: ${otp}.</p>
                                            <p> Please verify your otp. </p>
                                            <br><br>
                                            Regards,
                                            <br>Team TDO DXB
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.signUpMail = (to) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `Registration Successful`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;font-weight:normal;color:rgb(34,34,34)">
                                            <p>Dear Travel Partner,</p>
                                            <p>We have received your request.</p>
                                            <p> Please wait while we verify your details. </p>
                                            <br><br>
                                            Regards,
                                            <br>Team TDO DXB
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.sendPasswordEmail = (to, password) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `Account Activation`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;font-weight:normal;color:rgb(34,34,34)">
                                            <p>Dear Travel Partner,</p>
                                            <p>Your Account has been Activated</p>
                                            <p> Please Use below credentials. </p>
                                            <p>Email - ${to}</p>
                                            <p>Password - ${password}</p>
                                            <br><br>
                                            Regards,
                                            <br>Team TDO DXB
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.sendDeactivationEmail = (to) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `Account Deactivation`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;font-weight:normal;color:rgb(34,34,34)">
                                            <p>Dear Travel Partner,</p>
                                            <p>Your Account has been Deactivated.</p>
                                            <p> Please Contact Mid Office for further Assistance. </p>
                                            
                                            <br><br>
                                            Regards,
                                            <br>Team TDO DXB
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.sendActivationEmail = (to) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `Account Activation`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;font-weight:normal;color:rgb(34,34,34)">
                                            <p>Dear Travel Partner,</p>
                                            <p>Your Account has been Activated.</p>
                                            <p> Please Login to your Account Now. </p>
                                            
                                            <br><br>
                                            Regards,
                                            <br>Team TDO DXB
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.sendPasswordEmailDist = (to, password,name) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `Account Activation`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;font-weight:normal;color:rgb(34,34,34)">
                                            <p>Dear ${name},</p>
                                            <p>Your Account has been Activated</p>
                                            <p> Please Use below credentials. </p>
                                            <p>Email - ${to}</p>
                                            <p>Password - ${password}</p>
                                            <br><br>
                                            Regards,
                                            <br>Team TDO DXB
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.sendConfirmationToDistributor = (to, agency_email, agency_name) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `Account Activation`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;font-weight:normal;color:rgb(34,34,34)">
                                            <p>Dear Distributor,</p>
                                            <p>A new Agent has been added to your Network.</p>
                                            <p>Please check below information. </p>
                                            <p>Agency Name - ${agency_name}</p>
                                            <p>Email - ${agency_email}</p>
                                            <br><br>
                                            Regards,
                                            <br>Team TDO DXB
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.sendFPOtp = (to, otp) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `OTP for Reset Password`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;font-weight:normal;color:rgb(34,34,34)">
                                            <p>Dear Travel Partner,</p>
                                            <p>Your OTP for Reset Password is : ${otp}.</p>
                                            <p> Please verify your otp. </p>
                                            <br><br>
                                            Regards,
                                            <br>Team TDO DXB
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.sendSuspendEmail = (to) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `Account Suspended`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;font-weight:normal;color:rgb(34,34,34)">
                                            <p>Dear Travel Partner,</p>
                                            <p>Your Account has been Suspended.</p>
                                            <p> Please Contact Mid Office for further Assistance. </p>
                                            
                                            <br><br>
                                            Regards,
                                            <br>Team TDO DXB
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.walletAcceptRequest = (to,t_id) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `Wallet Request Accepted`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;font-weight:normal;color:rgb(34,34,34)">
                                            <p>Dear Agent,</p>
                                            <p>Your wallet request has been <strong>accepted for Transaction ID: ${t_id}</strong>.</p>
                                            
                                            <p>Thank you for your request!</p><br>
                                            
                                            Regards,
                                            <br>Team TDO DXB
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

mailFuncs.walletRejectRequest = (to,t_id) => {

    let email = to;
    let mailer = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Removed space before password
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: `Wallet Request Rejected`,
        html: `<table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0px;background:rgb(242,242,242)" width="100%">
            <tbody>
                <tr>
                    <td style="padding:30px 20px" valign="top">
                        <table cellpadding="0" cellspacing="0" style="margin:0px auto" width="90%">
                            <tbody>
                                <tr>
                                    <td valign="top" style="border:1px solid rgb(218,218,218);background-color:rgb(255,255,255);padding:30px">
                                        <div style="font-family:lucida grande,lucida sans,lucida sans unicode,arial,helvetica,verdana,sans-serif;font-size:14px;line-height:24px;font-weight:normal;color:rgb(34,34,34)">
                                            <p>Dear Agent,</p>
                                            <p>Your wallet request has been <strong>rejected for Transaction ID: ${t_id}</strong>.</p>
                                            <p>Please contact support for further information.</p>
                                            <br><br>
                                            Regards,
                                            <br>Team TDO DXB
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td style="padding-top:5px" valign="top">  </td> </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>`
    };

    mailer.sendMail(options, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
}

module.exports = mailFuncs