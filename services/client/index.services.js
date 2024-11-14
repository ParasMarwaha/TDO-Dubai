const connectToDatabase = require("../../db/connection");

const agentServices = {}


agentServices.checkLogin = async (connection, Email) => {
    return connection.execute(`SELECT * from agents WHERE email='${Email}'`);
}
agentServices.checkSubUserLogin= async (connection, Email) => {
    return connection.execute(`SELECT * from subuser WHERE email='${Email}'`);
}
agentServices.readAgentByID=(connection, id)=>{
    return connection.execute('select * from subuser where id=?', [id]);
}
agentServices.updateResendPassword=(connection,hashPassword,id)=>{
    return connection.execute(`update subuser set password='${hashPassword}' where id=${id}`);
}


agentServices.updateUserStatus = async (connection, user_status, id) => {
    // Using parameterized query to avoid SQL injection
    return connection.execute(
        `UPDATE subuser SET status = ? WHERE id = ?`,
        [user_status, id]
    );
};

agentServices.verifyExistingAgent = async (connection, email, mobile) => {
    return connection.execute('select * from agents where email=? or mobile=?', [email, mobile])
}
agentServices.getAgentDetailsByID = async (connection, id) => {
    return connection.execute('select * from agents where id=?', [id])
}
agentServices.addSubAgents=async (connection,firstName,lastName,mobileNo,email, hashPassword,userType,status,travelAgent,location)=>{
    return connection.execute('insert into subuser(firstName,lastName,mobileNo,email, password,type,status,travelAgent,location) values(?,?,?,?,?,?,?,?,?)',
        [firstName,lastName,mobileNo,email,hashPassword,userType,status,travelAgent,location])
}
agentServices.addAgents = async (connection, alldata) => {
    // const connection = await connectToDatabase();
    const {
        establishment_name,
        company_trade_license,
        company_trade_license_path,
        address,
        nature_of_business,
        area,
        emirates,
        email,
        mobile,
        director1_name,
        director1_nationality,
        director1_passport_issuing_country,
        director1_passport_number,
        director1_passport_expiry,
        director1_emirates_id_path,
        director1_emirates_passport_path,
        director1_emirates_id_expiry,
        director1_email,
        director1_mobile,
        director2_name,
        director2_nationality,
        director2_passport_issuing_country,
        director2_passport_number,
        director2_passport_expiry,
        director2_emirates_id,
        director2_emirates_id_path,
        director2_emirates_passport_path,
        director2_email,
        director2_mobile,
        authorized_person_name,
        authorized_person_nationality,
        authorized_person_passport_issuing_country,
        authorized_person_passport_number,
        authorized_person_passport_expiry,
        authorized_person_emirates_id,
        authorized_person_emirates_id_path,
        authorized_person_emirates_passport_path,
        authorized_person_emirates_id_expiry,
        authorized_person_email,
        banker_name,
        branch_location,
        account_number,
        current_business_volume,
        iata_accredited,
        iata_document_path,
        email_for_invoice,
        assisted_by,
        assisted_by_details,
        password,
        status,
        createdOn,
        createdBy,
        verifiedBy,
        director1_emirates_id,
        director2_emirates_id_expiry,
        authorized_person_mobile
    } = alldata;

    const insertQuery = `INSERT INTO agents (
    establishment_name,
    company_trade_license,
    company_trade_license_path,
    address,
    nature_of_business,
    area,
    emirates,
    email,
    mobile,
    director1_name,
    director1_nationality,
    director1_passport_issuing_country,
    director1_passport_number,
    director1_passport_expiry,
    director1_emirates_id,
    director1_emirates_id_path,
    director1_emirates_passport_path,  -- Added this column
    director1_emirates_id_expiry,
    director1_email,
    director1_mobile,
    director2_name,
    director2_nationality,
    director2_passport_issuing_country,
    director2_passport_number,
    director2_passport_expiry,
    director2_emirates_id,
    director2_emirates_id_path,
    director2_emirates_passport_path,
    director2_emirates_id_expiry,
    director2_email,
    director2_mobile,
    authorized_person_name,
    authorized_person_nationality,
    authorized_person_passport_issuing_country,
    authorized_person_passport_number,
    authorized_person_passport_expiry,
    authorized_person_emirates_id,
    authorized_person_emirates_id_path,
    authorized_person_emirates_passport_path,
    authorized_person_emirates_id_expiry,
    authorized_person_email,
    authorized_person_mobile,
    banker_name,
    branch_location,
    account_number,
    current_business_volume,
    iata_accredited,
    iata_document_path,
    email_for_invoice,
    assisted_by,
    assisted_by_details,
    password,
    status,
    createdOn,
    createdBy,
    verifiedBy
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
     ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        establishment_name,
        company_trade_license,
        company_trade_license_path,
        address,
        nature_of_business,
        area,
        emirates,
        email,
        mobile,
        director1_name,
        director1_nationality,
        director1_passport_issuing_country,
        director1_passport_number,
        director1_passport_expiry,
        director1_emirates_id,
        director1_emirates_id_path,
        director1_emirates_passport_path,  // Ensure this matches the column list
        director1_emirates_id_expiry,
        director1_email,
        "971" + director1_mobile,
        director2_name,
        director2_nationality,
        director2_passport_issuing_country,
        director2_passport_number,
        director2_passport_expiry,
        director2_emirates_id,
        director2_emirates_id_path,
        director2_emirates_passport_path,
        director2_emirates_id_expiry,
        director2_email,
        director2_mobile,
        authorized_person_name,
        authorized_person_nationality,
        authorized_person_passport_issuing_country,
        authorized_person_passport_number,
        authorized_person_passport_expiry,
        authorized_person_emirates_id,
        authorized_person_emirates_id_path,
        authorized_person_emirates_passport_path,
        authorized_person_emirates_id_expiry,
        authorized_person_email,
        "971" + authorized_person_mobile,
        banker_name,
        branch_location,
        account_number,
        current_business_volume,
        iata_accredited,
        iata_document_path,
        email_for_invoice,
        assisted_by,
        assisted_by_details,
        password,
        status,
        createdOn,
        createdBy,
        verifiedBy
    ];
    return connection.execute(insertQuery, values)
    // return new Promise((resolve, reject) => {
    //     connection.query(insertQuery, values, (error, results) => {
    //         connection.end(); // Ensure the connection is closed
    //         if (error) {
    //             // console.error('Error executing SQL query:', error);
    //             reject(error);
    //         } else {
    //             // console.log('Agent added successfully:', results);
    //             resolve(results);
    //         }
    //     });
    // });
};

agentServices.getEmailMobile = async (connection, id) => {
    return connection.execute(`select email,mobile from midoffice_staff where id=${id}`)
}
agentServices.updateEmailMobile = async (connection, id,email,mobile) => {
    return connection.execute(`update agents set staff_email='${email}',staff_mobile='${mobile}' where id=${id}`)
}
agentServices.sendOTPToAgentEmail = async (connection, email, otp, datetime, expiry, remarks_id) => {
    const remarks = 'Agent'
    const status = 0
    const otp_type = "Email"
    return connection.execute('insert into otp(email, remarks, otp, datetime, expiry, status, remarks_id,otp_type) values(?,?,?,?,?,?,?,?)',
        [email, remarks, otp, datetime, expiry, status, remarks_id, otp_type])
}
agentServices.sendOTPToAgentMobile = async (connection, mobile, otp, datetime, expiry, remarks_id) => {
    const remarks = 'Agent'
    const status = 0
    const otp_type = "Mobile"
    return connection.execute('insert into otp(mobile, remarks, otp, datetime, expiry, status, remarks_id,otp_type) values(?,?,?,?,?,?,?,?)',
        [mobile, remarks, otp, datetime, expiry, status, remarks_id, otp_type])
}
agentServices.verifyEmailOTP = (connection, emailOTP, id) => {
    const remarks = 'Agent'
    const otp_type = "Email"
    return connection.execute("select * from otp where otp_type=? and remarks=? and otp=? and remarks_id=?", [otp_type, remarks, emailOTP, id])
}
agentServices.checkOldPassword = (connection, agentId) => {
    return connection.execute(`select * from agents where id=${agentId}`);
}
agentServices.checkOldPasswordSubUser= (connection, agentId) => {
    return connection.execute(`select * from subuser where id=${agentId}`);
}
agentServices.updatePassword = (connection, agentId, hashPassword) => {
    return connection.execute(`update agents set password='${hashPassword}' where id=${agentId}`);
}
agentServices.updatePasswordSubUser = (connection, agentId, hashPassword) => {
    return connection.execute(`update subuser set password='${hashPassword}' where id=${agentId}`);
}
agentServices.agentActivityLog = (connection,  semail,  remarks, time, id,clientIp) => {
    return connection.execute(`insert into agent_activity_logs(email, Remarks, time,agent_id,client_ip) values('${semail}','${remarks}','${time}',${id},'${clientIp}')`)
}
agentServices.verifyMobileOTP = (connection, mobileOTP, id) => {
    const remarks = 'Agent'
    const otp_type = "Mobile"
    return connection.execute("select * from otp where otp_type=? and remarks=? and otp=? and remarks_id=?", [otp_type, remarks, mobileOTP, id])
}
agentServices.GetOtp = (connection, id) => {
    const otp_type = 'Mobile'
    return connection.execute("select * from otp where otp_type=? and remarks_id=?", [otp_type, id])
}
agentServices.readAgentByEmail = (connection, Email) => {
    return connection.execute('select * from agents where email=?', [Email]);
}
agentServices.updateOtp = (connection, otp, Email) => {
    return connection.execute(`update agents set otp=${otp} where email='${Email}'`);
}
agentServices.updatePasswordByEmail = (connection, hashPassword, Email) => {
    return connection.execute(`update agents set password='${hashPassword}', otp=NULL where email='${Email}'`);
}
agentServices.updatePhoto=(connection, agentId,DBPath)=>{
    return connection.execute(`update agents set logo='${DBPath}' where id='${agentId}'`);
}



agentServices.GetAgentData = (connection, agentId) => {
    return connection.execute(`select id, establishment_name, company_trade_license, company_trade_license_path, address, nature_of_business, area, emirates, email, mobile, director1_name, director1_nationality, director1_passport_issuing_country, director1_passport_number,DATE_FORMAT(director1_passport_expiry, "%d-%m-%Y") as director1_passport_expiry, director1_emirates_id, director1_emirates_id_path, director1_emirates_passport_path,DATE_FORMAT(director1_emirates_id_expiry, "%d-%m-%Y") as director1_emirates_id_expiry, director1_email, director1_mobile, director2_name, director2_nationality, director2_passport_issuing_country, director2_passport_number,DATE_FORMAT(director2_passport_expiry, "%d-%m-%Y") as director2_passport_expiry, director2_emirates_id, director2_emirates_id_path, director2_emirates_passport_path,DATE_FORMAT(director2_emirates_id_expiry, "%d-%m-%Y") as director2_emirates_id_expiry, director2_email, director2_mobile, authorized_person_name, authorized_person_nationality, authorized_person_passport_issuing_country, authorized_person_passport_number,DATE_FORMAT(authorized_person_passport_expiry, "%d-%m-%Y") as authorized_person_passport_expiry, authorized_person_emirates_id, authorized_person_emirates_id_path, authorized_person_emirates_passport_path,DATE_FORMAT(authorized_person_emirates_id_expiry, "%d-%m-%Y") as authorized_person_emirates_id_expiry, authorized_person_email, authorized_person_mobile, banker_name, branch_location, account_number, current_business_volume, iata_accredited, iata_document_path, email_for_invoice, assisted_by, assisted_by_details, password, status, createdOn, createdBy, verifiedBy, otp, logo from agents where id=${agentId}`);
}
agentServices.checkEmail = (connection,semail,status,remarks,time,clientIp) => {
    return connection.execute(`insert into agent_log(email, status, Remarks, time,client_ip) values('${semail}','${status}','${remarks}','${time}','${clientIp}')`)
}
agentServices.accountNotActive = (connection,sname,semail,status,remarks,time,id,clientIp) => {
    return connection.execute(`insert into agent_log(name,email, status, Remarks, time,agent_id,client_ip) values('${sname}','${semail}','${status}','${remarks}','${time}',${id},'${clientIp}')`)
}
agentServices.subUserLog = (connection,email,status,remarks,time,id,clientIp) => {
    return connection.execute(`insert into subuser_logs (email, status, Remarks, time,subuser_id,client_ip) values('${email}','${status}','${remarks}','${time}',${id},'${clientIp}')`)
}
agentServices.invalidPassword = (connection,sname,semail,status,remarks,time,id,clientIp) => {
    return connection.execute(`insert into agent_log(name,email, status, Remarks, time,agent_id,client_ip) values('${sname}','${semail}','${status}','${remarks}','${time}',${id},'${clientIp}')`)
}
agentServices.loginSuccess = (connection,sname,semail,status,remarks,time,id,clientIp) => {
    return connection.execute(`insert into agent_log(name,email, status, Remarks, time,agent_id,client_ip) values('${sname}','${semail}','${status}','${remarks}','${time}',${id},'${clientIp}')`)
}
agentServices.logout = (connection,sname,semail,status,remarks,time,id,clientIp) => {
    return connection.execute(`insert into agent_log(name,email, status, Remarks, time,agent_id,client_ip) values('${sname}','${semail}','${status}','${remarks}','${time}',${id},'${clientIp}')`)
}
agentServices.getLogData = (connection,agentId) => {
    return connection.execute(`select id, name, email, status, remarks,DATE_FORMAT(time, "%d-%m-%Y %H:%i:%s") as  time,client_ip from agent_log  where agent_id='${agentId}' ORDER BY id DESC`)
}
agentServices.getSubUserLogData = (connection) => {
    return connection.execute(`select id, email, status, remarks,DATE_FORMAT(time, "%d-%m-%Y %H:%i:%s") as  time,client_ip from subuser_logs  ORDER BY id DESC`)
}
agentServices.getStaffData = (connection,agentId) => {
    return connection.execute(`SELECT agents.staff_mapped as id, ms.first_name,ms.last_name, ms.email,ms.mobile FROM agents inner join midoffice_staff ms on agents.staff_mapped=ms.id WHERE agents.id=${agentId}`)
}
agentServices.getFlightSearch = (connection,agentId) => {
    return connection.execute(`SELECT count(*) as search_count from flight_search_log WHERE agent_id=${agentId}`)
}
agentServices.getFlightBook = (connection,agentId) => {
    return connection.execute(`SELECT count(*) as book_count from flight_booking WHERE agent_id=${agentId}`)
}
agentServices.getTotalFlightRevenue=(connection,agentId)=>{
    return connection.execute(`SELECT SUM(total_net_fare) AS totalFlightRevenue
FROM flight_booking where agent_id=${agentId}`);
}
agentServices.verifyStaffId = (connection,id) => {
    return connection.execute(`SELECT * from midoffice_staff WHERE id=${id} and status=1`);
}
agentServices.getFareData=(connection)=>{
    return connection.execute(`select * from fare`);
}
agentServices.getCarrierData = (connection, agentId) => {
    return connection.execute(`
        SELECT Code, Name
        FROM (
            SELECT Code, Name
            FROM airlines 
            WHERE Code NOT IN (
                SELECT airline 
                FROM travelagent_markup_flight
                WHERE airline IS NOT NULL
                AND TRIM(airline) <> ''
                AND travel_agent_id = ${agentId}
            )
            
            UNION ALL
            
            SELECT 'all' AS Code, 'all' AS Name
            WHERE NOT EXISTS (
                SELECT 1 
                FROM travelagent_markup_flight
                WHERE TRIM(airline) = 'all'
                AND travel_agent_id = ${agentId}
            )
        ) AS CombinedResults
        ORDER BY CASE 
            WHEN Code = 'all' THEN 0 
            ELSE 1 
        END, Name
    `);
}

// agentServices.getCarrierData = (connection,agentId) => {
//     return connection.execute(`
//         SELECT AirlineIndex, Name
//         FROM (
//             SELECT AirlineIndex, Name
//             FROM airlines
//             WHERE AirlineIndex NOT IN (
//                 SELECT airline
//                 FROM travelagent_markup_flight
//                 WHERE airline IS NOT NULL
//                 AND TRIM(airline) <> ''
//                 AND travel_agent_id = ${agentId}
//             )
//
//             UNION ALL
//
//             SELECT 'all' AS AirlineIndex, 'all' AS Name
//             WHERE NOT EXISTS (
//                 SELECT 1
//                 FROM travelagent_markup_flight
//                 WHERE TRIM(airline) = 'all'
//                 AND travel_agent_id = ${agentId}
//             )
//         ) AS CombinedResults
//         ORDER BY CASE
//             WHEN AirlineIndex = 'all' THEN 0
//             ELSE 1
//         END, Name
//     `);
// }
agentServices.getAirlineData=(connection,agentId)=>{
    return connection.execute(`select airline as airline from travelagent_markup_flight where id=${agentId}`);
}
agentServices.addMarkup1 = (connection,plan_type,trip_type,markup_type,deposit_value,agentId,agentEmail,time) => {
    return connection.execute(`insert into travelagent_markup_flight(travel_agent_id, plan_type, trip_type, markup_type,markup_amount, created_by, created_on) values(${agentId},'${plan_type}','${trip_type}','${markup_type}',${deposit_value},'${agentEmail}','${time}')`)
}
agentServices.addMarkup2 = (connection,plan_type,fare_type,trip_type,markup_type,deposit_value,selectedAirlines,agentId,agentEmail,time) => {
    return connection.execute(`insert into travelagent_markup_flight(travel_agent_id, plan_type, fare_type, trip_type, markup_type, markup_amount, airline, created_by, created_on) values(${agentId},'${plan_type}','${fare_type}','${trip_type}','${markup_type}',${deposit_value},'${selectedAirlines}','${agentEmail}','${time}')`)
}
agentServices.getMarkup=(connection,agentId) => {
    return connection.execute(`SELECT 
    CASE 
        WHEN mf.airline = 'ALL' THEN 'All'
        WHEN mf.airline IS NULL THEN 'null'
        ELSE airlines.Name 
    END AS airline,
    mf.id as id,
    mf.plan_type AS plan,
    mf.fare_type AS fare,
    mf.trip_type AS trip,
    mf.markup_type AS markup,
    mf.markup_amount AS amount,
    mf.created_by,
    DATE_FORMAT(mf.created_on, "%d-%m-%Y") AS created_on
FROM 
    travelagent_markup_flight mf
LEFT JOIN 
    airlines ON mf.airline = airlines.Code
WHERE 
    mf.travel_agent_id = ${agentId}
    order by mf.id desc;
`)
}

agentServices.updateAgentMarkup = (connection,id,amount) => {
    return connection.execute(`update travelagent_markup_flight set markup_amount=${amount} where id=${id}`);
}
agentServices.deleteAgentMarkup = (connection,id) => {
    return connection.execute(`delete from travelagent_markup_flight where id=${id}`);
}
agentServices.getSearchLog = (connection, agentId) => {
    return connection.execute(`
        SELECT agent_id, 
               \`from\`, 
               \`to\`, 
               total_no_of_pax, 
               no_of_adults, 
               no_of_childs, 
               no_of_infants, 
               DATE_FORMAT(departure_date, "%d-%m-%Y") AS departure_date, 
               DATE_FORMAT(return_date, "%d-%m-%Y") AS return_date, 
               journey_type, 
               \`class\`, 
               DATE_FORMAT(search_date_time , "%d-%m-%Y") as search_date_time ,
               client_ip
        FROM flight_search_log 
        WHERE agent_id = ${agentId}
        order by id desc`);
}
agentServices.getWalletId = (connection,agentId) => {
    return connection.execute(`select id from prepaid_wallet where agent_id=${agentId}`);
}
agentServices.checkCreditAmount=(connection,id)=>{
    return connection.execute(`SELECT COALESCE(SUM(amount), 0) AS total_credit
FROM prepaid_wallet_details
WHERE transaction_type = 'Credit' and walletId=${id}`);
}

agentServices.checkDebitAmount = (connection, id) => {
    return connection.execute(`
        SELECT COALESCE(SUM(amount), 0) AS total_debit
        FROM prepaid_wallet_details
        WHERE transaction_type IN ('Debit', 'Flight Booked') AND walletId = ${id}
    `);
};

// agentServices.checkDebitAmount=(connection,id)=>{
//     return connection.execute(`SELECT COALESCE(SUM(amount), 0) AS total_debit
// FROM prepaid_wallet_details
// WHERE transaction_type = 'Debit' and walletId=${id}`);
// }
agentServices.getActivityData = (connection, agentId) => {
    return connection.execute(`
        SELECT 
            id, 
            email,
            remarks, 
            DATE_FORMAT(time, "%d-%m-%Y %H:%i:%s") AS time,
            client_ip 
        FROM 
            agent_activity_logs
         WHERE 
            agent_id = '${agentId}' 
              
       
        ORDER BY 
            id DESC
    `);
}
agentServices.prepaid_wallet = async (connection, agent_id, creationDate) => {
    try {
        const query = `INSERT INTO prepaid_wallet(agent_id, creationDate) VALUES (?, ?)`;
        const result = await connection.execute(query, [agent_id, creationDate]);

        return result;
    } catch (err) {
        console.error("Error executing query:", err);
        throw err;
    }
}
agentServices.getWalletSummary = (connection, walletId) => {
    return connection.execute(`select 
    pwd.id,pwd.walletId, 
    pwd.transaction_type, 
    pwd.transaction_id, 
    pwd.mode_of_payment,
    pwd.amount, 
    DATE_FORMAT(pwd.transaction_date_time, "%d-%m-%Y %H:%i:%s") AS transaction_date_time, 
    pwd.remarks,
    pw.agent_id,
    a.establishment_name AS agent_name,
    a.email AS agent_email
FROM 
    prepaid_wallet_details pwd
INNER JOIN 
    prepaid_wallet pw ON pwd.walletId = pw.id
INNER JOIN 
    agents a ON pw.agent_id = a.id
WHERE 
    pwd.walletId = ${walletId}
order by id desc 
    
    `);
}
// agentServices.getWalletSummaryByDates = (connection, walletId, fromDate, toDate) => {
//     return connection.execute(`
//         SELECT
//             pwd.id,
//             pwd.walletId,
//             pwd.transaction_type,
//             pwd.amount,
//             DATE_FORMAT(pwd.transaction_date_time, "%d-%m-%Y %H:%i:%s") AS transaction_date_time,
//             pwd.remarks,
//             pw.agent_id,
//             a.establishment_name AS agent_name,
//             a.email AS agent_email
//         FROM
//             prepaid_wallet_details pwd
//         INNER JOIN
//             prepaid_wallet pw ON pwd.walletId = pw.id
//         INNER JOIN
//             agents a ON pw.agent_id = a.id
//         WHERE
//             pwd.walletId = ?
//             AND pwd.transaction_date_time >= ?
//             AND pwd.transaction_date_time <= ?
//         ORDER BY
//             pwd.transaction_date_time ASC  -- Order by transaction date in ascending order
//     `, [walletId, `${fromDate} 00:00:00, ${toDate} 23:59:59`]);
// }
agentServices.getWalletSummaryByDates = (connection, walletId, fromDate, toDate) => {
    return connection.execute(`
        SELECT 
            pwd.id, 
            pwd.walletId, 
            pwd.transaction_type, 
            pwd.transaction_id, 
    pwd.mode_of_payment,
            pwd.amount, 
            DATE_FORMAT(pwd.transaction_date_time, "%d-%m-%Y %H:%i:%s") AS transaction_date_time, 
            pwd.remarks,
            pw.agent_id,
            a.establishment_name AS agent_name,
            a.email AS agent_email
        FROM 
            prepaid_wallet_details pwd
        INNER JOIN 
            prepaid_wallet pw ON pwd.walletId = pw.id
        INNER JOIN 
            agents a ON pw.agent_id = a.id
        WHERE 
            pwd.walletId = ? 
            AND pwd.transaction_date_time >= ? 
            AND pwd.transaction_date_time <= ?
        ORDER BY 
            pwd.transaction_date_time desc  -- Order by transaction date in descending order
    `, [walletId, `${fromDate} 00:00:00`, `${toDate} 23:59:59`]); // Fixed parameter formatting
}

agentServices.addRequest = (connection, agentId, amount, deposit_date, p_mode, account,transaction_id,agent_remarks,DBPath,status) => {
    const sql = `INSERT INTO agent_wallet_request (agent_id, date_of_deposit, amount, mode_of_payment, transaction_id, bank_account, screenshot, status, remark_agent) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return connection.execute(sql, [
        agentId,
        deposit_date,
        amount,
        p_mode,
        transaction_id,
        account,
        DBPath,
        status,
        agent_remarks
    ]).catch(error => {
        console.error("Error inserting agent wallet request:", error);
        throw error; // re-throw the error after logging it
    });
}
// agentServices.addRequest = (connection, agentId,date,amount,mode_of_payment,transaction_id,DBPath,status) => {
//     return connection.execute(`insert into agent_wallet_request(agent_id, date_of_deposit, amount, mode_of_payment, transaction_id, screenshot, status) values(${agentId},'${date}','${amount}','${mode_of_payment}',${transaction_id},'${DBPath}','${status}')`)
// }
// agentServices.addRequest = (connection, agentId, date, amount, mode_of_payment, transaction_id, DBPath, status) => {
//     const sql = `INSERT INTO agent_wallet_request(agent_id, date_of_deposit, amount, mode_of_payment, transaction_id, screenshot, status)
//                  VALUES (?, ?, ?, ?, ?, ?, ?)`;
//     return connection.execute(sql, [agentId, date, amount, mode_of_payment, transaction_id, DBPath,status]);
// }

agentServices.AgentWalletRequest= async (connection, agentId) => {
    return connection.execute(`SELECT DATE_FORMAT(date_of_deposit, "%d-%m-%Y") AS date_of_deposit,amount,mode_of_payment,transaction_id,bank_account,status from agent_wallet_request WHERE agent_id='${agentId}' order by id desc`);
}
agentServices.read_subUsers= async (connection, agentEmail) => {
    return connection.execute(`SELECT id,firstName, lastName,email, mobileNo,status,type,location,lastLogin from subuser WHERE travelAgent='${agentEmail}' order by id desc`);
}

agentServices.checkTransactionIdExists = async (connection, id) => {
    return connection.execute(`SELECT * from agent_wallet_request WHERE transaction_id='${id}'`);
}


agentServices.addWalletDetails=(connection,walletId,action,amount,dateTime,MOT,remark,self)=>{
    return connection.execute(`insert into prepaid_wallet_details(walletId, transaction_type, amount, transaction_date_time,remarks,mode_of_payment,done_by) values(${walletId},'${action}',${amount},'${dateTime}','${remark}','${MOT}','${self}')`);
}

agentServices.fetchGatewayCharges=async (connection)=>{
    return connection.execute(`select * from gateway_charges`)
}

agentServices.WalletTopUp = (connection, walletId, transaction_type, amount, transaction_date_time, remarks, transaction_id, mode_of_payment, done_by) => {
    try{
        const sql = `INSERT INTO prepaid_wallet_details 
                 (walletId, transaction_type, amount, transaction_date_time, remarks, transaction_id, mode_of_payment, done_by) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        return connection.execute(sql, [
            walletId,
            transaction_type,
            amount,
            transaction_date_time,
            remarks,
            transaction_id,
            mode_of_payment,
            done_by // Add 'done_by' to the parameters
        ]).catch(error => {
            console.error("Error inserting agent wallet request:", error);
            throw error; // re-throw the error after logging it
        });}
    catch (e) {
        res.json(e.message)
    }
}
agentServices.verifyExistingAgentEmail = async (connection, email) => {
    return connection.execute('select * from agents where email=?', [email])
}
agentServices.verifyExistingAgentMobile = async (connection,  mobile) => {
    return connection.execute('select * from agents where mobile=?', [ mobile])
}
agentServices.verifyExistingSubAgentEmail = async (connection, email) => {
    return connection.execute('select * from subuser where email=?', [email])
}
agentServices.verifyExistingSubAgentMobile = async (connection,  mobile) => {
    return connection.execute('select * from subuser where mobileNo=?', [ mobile])
}
module.exports = agentServices;
