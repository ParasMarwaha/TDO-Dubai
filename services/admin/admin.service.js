const connectToDatabase = require("../../db/connection");

const agentServices = {}





agentServices.verifyStaff = async (connection, email) => {
    return connection.execute(`SELECT ms.*, msr.name as role FROM midoffice_staff ms inner join midoffice_staff_roles msr on ms.roleId=msr.id WHERE ms.email='${email}'`);
}
agentServices.checkRoleName=(connection,RoleName)=>{
    return connection.execute(`select * from midoffice_staff_roles where name='${RoleName}'`);
}
agentServices.addNewRoles = (connection, RoleName, Description, createdBy, createdAt) => {
    return connection.execute('insert into midoffice_staff_roles(name, description, createdBy, createdAt) values(?,?,?,?)',
        [RoleName, Description, createdBy, createdAt])
}
agentServices.updateNewRoles = (connection, RoleName, Description, createdBy, createdAt) => {
    return connection.execute(`update midoffice_staff_roles set description='${Description}', status=1 ,createdBy='${createdBy}',createdAt='${createdAt}' where name='${RoleName}'`);
}
agentServices.readRoles=(connection)=>{
    return connection.execute('select id, name, description, status, createdBy, DATE_FORMAT(createdAt, "%d-%m-%Y %H:%i:%s") as createdAt, updatedBy, DATE_FORMAT(updatedAt, "%d-%m-%Y %H:%i:%s") as updatedAt from midoffice_staff_roles where status="1" ');
}
agentServices.updateRoles=(connection,id,RoleName,Description, updatedBy,updatedAt)=>{
    return connection.execute(`update midoffice_staff_roles set name='${RoleName}', description='${Description}',updatedBy='${updatedBy}',updatedAt='${updatedAt}' where id=${id}`);
}

agentServices.checkRole=(connection,id)=>{
    return connection.execute(`select * from midoffice_staff where roleId=${id}`);
}

agentServices.deleteRoles=(connection,id)=>{
    return connection.execute(`update midoffice_staff_roles set status="0" where id=${id}`);
}

agentServices.readAgents=(connection)=>{
    return connection.execute('select * from agents');
}

agentServices.readAgentByID=(connection, id)=>{
    return connection.execute('select * from agents where id=?', [id]);
}

agentServices.readAgent=(connection, id)=>{
    return connection.execute(`select id,establishment_name, company_trade_license, company_trade_license_path,address, nature_of_business, area, emirates, email, mobile, director1_name, director1_nationality, director1_passport_issuing_country, director1_passport_number,DATE_FORMAT(director1_passport_expiry, "%d-%m-%Y") as director1_passport_expiry, director1_emirates_id,DATE_FORMAT(director1_emirates_id_expiry, "%d-%m-%Y") as director1_emirates_id_expiry, director1_email, director1_mobile,director1_emirates_id_path,director1_emirates_passport_path, director2_name, director2_nationality, director2_passport_issuing_country, director2_passport_number,DATE_FORMAT(director2_passport_expiry, "%d-%m-%Y") as director2_passport_expiry, director2_emirates_id,DATE_FORMAT(director2_emirates_id_expiry, "%d-%m-%Y") as director2_emirates_id_expiry, director2_email, director2_mobile,director2_emirates_id_path,director2_emirates_passport_path, authorized_person_name, authorized_person_nationality, authorized_person_passport_issuing_country, authorized_person_passport_number,DATE_FORMAT(authorized_person_passport_expiry, "%d-%m-%Y") as authorized_person_passport_expiry, authorized_person_emirates_id,DATE_FORMAT(authorized_person_emirates_id_expiry, "%d-%m-%Y") as authorized_person_emirates_id_expiry, authorized_person_email, authorized_person_mobile,authorized_person_emirates_id_path,authorized_person_emirates_passport_path, banker_name, branch_location, account_number, current_business_volume, iata_accredited, iata_document_path, email_for_invoice, assisted_by, assisted_by_details,staff_email,staff_mobile,status, createdOn, createdBy from agents where id=${id}`);
}
agentServices.addUserGroup = (connection, GroupName, Description, createdDate, createdBy, updatedDate, UpdatedBy) => {
    return connection.execute('insert into user_group(name, description, createdDate, createdBy, updatedDate, updatedBy) values(?,?,?,?,?,?)',
        [GroupName, Description, createdDate, createdBy, updatedDate, UpdatedBy])
}
agentServices.readUserGroup=(connection)=>{
    return connection.execute('select id, name, description, DATE_FORMAT(createdDate, "%d-%m-%Y %H:%i:%s") as createdDate, createdBy, DATE_FORMAT(updatedDate, "%d-%m-%Y %H:%i:%s") as updatedDate, updatedBy from user_group order by id desc');
}
agentServices.updateUserGroup=(connection,id,GroupName,Description, updatedDate,updatedBy)=>{
    return connection.execute(`update user_group set name='${GroupName}', description='${Description}',updatedDate='${updatedDate}',updatedBy='${updatedBy}' where id=${id}`);
}
agentServices.deleteUserGroup=(connection,id)=>{
    return connection.execute(`delete from user_group where id=${id}`);
}

agentServices.activateWithPassword = (connection, password, id) => {
    const status = 1
    // return connection.execute("update agents set password=? and status=? where id=?", [password, status, id]);
    return connection.execute(`update agents set password="${password}" , status="${status}" where id=${id}`);
}

agentServices.activateAgent = (connection, id) => {
    const status = 1
    return connection.execute("update agents set status=? where id=?", [status, id]);
}

agentServices.deactivateAgent = (connection, id) => {
    const status = 0
    return connection.execute("update agents set status=? where id=?", [status, id]);
}


// ------------------------------------------------------------------------------------------------------------------

agentServices.readStaff=(connection,staffId)=>{
    return connection.execute(`SELECT ms.id,ms.first_name,ms.last_name,ms.email,ms.mobile,ms.status, msr.name as role FROM midoffice_staff ms inner join midoffice_staff_roles msr on ms.roleId=msr.id where ms.id != ${staffId} `)
}
agentServices.checkStaffEmail=(connection,email)=>{
    return connection.execute(`select * from midoffice_staff where email='${email}'`);
}
agentServices.checkStaffMobile=(connection,mobile)=>{
    return connection.execute(`select * from midoffice_staff where mobile='${mobile}'`);
}

agentServices.addStaff = (connection, firstName, lastName, email, mobile, hashPassword, createdAt,createdBy,role) => {
    return connection.execute('insert into midoffice_staff(first_name, last_name, email, mobile, password, status, createdBy, createdAt, roleId) values(?,?,?,?,?,?,?,?,?)',
        [firstName, lastName, email, mobile, hashPassword, 1, createdBy,createdAt,role])
}
agentServices.getStaffId=(connection,email,mobile)=>{
    return connection.execute(`select id from midoffice_staff where email='${email}' and mobile='${mobile}'`);
}
agentServices.activeStaff=(connection,id)=>{
    return connection.execute(`update midoffice_staff set status='1' where id=${id}`);
}
agentServices.checkStaff=(connection,id)=>{
    return connection.execute(`select * from agents where staff_mapped=${id}`);
}
agentServices.inactiveStaff=(connection,id)=>{
    return connection.execute(`update midoffice_staff set status='0' where id=${id}`);
}

agentServices.checkOldPassword=(connection,staffId)=>{
    return connection.execute(`select * from midoffice_staff where id=${staffId}`);
}
agentServices.updatePassword=(connection,staffId,hashPassword)=>{
    return connection.execute(`update midoffice_staff set password='${hashPassword}' where id=${staffId}`);
}
agentServices.updateResendPassword=(connection,hashPassword,id)=>{
    return connection.execute(`update agents set password='${hashPassword}' where id=${id}`);
}

agentServices.staffDetails=(connection,staffId)=>{
    return connection.execute(`SELECT ms.first_name,ms.last_name, msr.name as role FROM midoffice_staff ms inner join midoffice_staff_roles msr on ms.roleId=msr.id where ms.id=${staffId}`);
}
agentServices.checkProduct=(connection,product)=>{
    return connection.execute(`select * from platform_fee where product='${product}'`);
}
agentServices.addProduct=(connection,product,fee,tax)=>{
    return connection.execute(`insert into platform_fee(product, fees, tax) Values('${product}',${fee},${tax})`);
}
agentServices.updateProduct=(connection,product_id,fee,tax)=>{
    return connection.execute(`update platform_fee set fees=${fee}, tax=${tax} where id='${product_id}'`);
}
agentServices.readPlatformFee=(connection)=>{
    return connection.execute(`select * from platform_fee`);
}

agentServices.addFare=(connection,fareType)=>{
    return connection.execute(`insert into fare(fare) Values('${fareType}')`);
}
agentServices.getFareData=(connection)=>{
    return connection.execute(`select * from fare`);
}
agentServices.updateFare=(connection,fareType,fare_id)=>{
    return connection.execute(`update fare set fare='${fareType}' where id=${fare_id}`);
}
agentServices.checkFare=(connection,id)=>{
    return connection.execute(`SELECT * FROM flight_markup WHERE fare_types = ${id} OR fare_types = 'all'`);
}
agentServices.deleteFare=(connection,id)=>{
    return connection.execute(`delete from fare where id=${id}`);
}

agentServices.addSupplier=(connection,supplier)=>{
    return connection.execute(`insert into supplier(supplier) Values('${supplier}')`);
}
agentServices.getSupplierData=(connection)=>{
    return connection.execute(`select * from supplier`);
}
agentServices.updateSupplier=(connection,supplier,supplier_id)=>{
    return connection.execute(`update supplier set supplier='${supplier}' where id=${supplier_id}`);
}
agentServices.checkSupplier=(connection,id)=>{
    return connection.execute(`SELECT * FROM flight_markup WHERE suppliers = ${id} OR suppliers = 'all'`);
}
agentServices.deleteSupplier=(connection,id)=>{
    return connection.execute(`delete from supplier where id=${id}`);
}

agentServices.checkPlan=(connection,plan_name)=>{
    return connection.execute(`select * from flight_markup where plan_name='${plan_name}'`);
}
agentServices.addPlan=(connection,plan_name,type,MarkupValue,suppliers,fareTypes,carriers,cancellation,rescheduling)=>{
    return connection.execute(`insert into flight_markup(plan_name, type, value, suppliers, fare_types, carriers, cancellation, rescheduling) Values('${plan_name}','${type}','${MarkupValue}','${suppliers}','${fareTypes}','${carriers}','${cancellation}','${rescheduling}')`);
}
agentServices.checkPlanName=(connection,id)=>{
    return connection.execute(`select plan_name from flight_markup where id='${id}'`);
}
agentServices.deleteMarkup=(connection,plan)=>{
    return connection.execute(`delete from flight_markup where plan_name='${plan}'`);
}
agentServices.getMarkupData=(connection)=>{
    return connection.execute(`SELECT 
    MIN(id) AS id, 
    plan_name, 
    type, 
    value, 
    cancellation, 
    rescheduling
FROM 
    flight_markup
GROUP BY 
    plan_name, 
    type, 
    value, 
    cancellation, 
    rescheduling;
`);
}
agentServices.getData=(connection,plan_name)=> {
    return connection.execute(`SELECT 
    CASE 
        WHEN flight_markup.carriers = 'all' THEN 'All'
        ELSE airlines.Name 
    END AS carriers,
    CASE 
        WHEN flight_markup.suppliers = 'all' THEN 'All'
        ELSE supplier.supplier 
    END AS supplier, 
    CASE 
        WHEN flight_markup.fare_types = 'all' THEN 'All'
        ELSE fare.fare 
    END AS fare 
FROM 
    flight_markup 
LEFT JOIN 
    supplier ON flight_markup.suppliers = supplier.id AND flight_markup.suppliers != 'all'
LEFT JOIN 
    fare ON flight_markup.fare_types = fare.id AND flight_markup.fare_types != 'all'
LEFT JOIN 
    airlines ON flight_markup.carriers = airlines.AirlineIndex AND flight_markup.carriers != 'all'
WHERE 
    plan_name = '${plan_name}'
`);
}

agentServices.getStaffCount=(connection)=>{
    return connection.execute(`select count(*) as users from midoffice_staff`);
}
agentServices.getAgentCount=(connection)=>{
    return connection.execute(`select count(*) as partners from agents`);
}
agentServices.getPendingRequestCount=(connection)=>{
    return connection.execute(`select count(*) as pendingRequest from agent_wallet_request where status=0`);
}
agentServices.getFlightSearchCount=(connection)=>{
    return connection.execute(`select count(*) as flightSearchCount from flight_search_log`);
}
agentServices.getFlightBookCount=(connection)=>{
    return connection.execute(`select count(*) as flightBookCount from flight_booking`);
}
agentServices.getTotalFlightRevenue=(connection)=>{
    return connection.execute(`SELECT SUM(total_net_fare) AS totalFlightRevenue
FROM flight_booking`);
}
agentServices.getCarrierData=(connection)=>{
    return connection.execute(`select * from airlines`);
}

agentServices.checkEmail = (connection,semail,status,remarks,time,client_ip) => {
    return connection.execute(`insert into staff_log(email, status, Remarks, time,client_ip) values('${semail}','${status}','${remarks}','${time}','${client_ip}')`)
}
agentServices.accountNotActive = (connection,sname,semail,status,remarks,time,client_ip) => {
    return connection.execute(`insert into staff_log(name,email, status, Remarks, time,client_ip) values('${sname}','${semail}','${status}','${remarks}','${time}','${client_ip}')`)
}
agentServices.invalidPassword = (connection,sname,semail,status,remarks,time,client_ip) => {
    return connection.execute(`insert into staff_log(name,email, status, Remarks, time,client_ip) values('${sname}','${semail}','${status}','${remarks}','${time}','${client_ip}')`)
}
agentServices.loginSuccess = (connection,sname,semail,status,remarks,time,client_ip) => {
    return connection.execute(`insert into staff_log(name,email, status, Remarks, time,client_ip) values('${sname}','${semail}','${status}','${remarks}','${time}','${client_ip}')`)
}
agentServices.logout = (connection,sname,semail,status,remarks,time,client_ip) => {
    return connection.execute(`insert into staff_log(name,email, status, Remarks, time,client_ip) values('${sname}','${semail}','${status}','${remarks}','${time}','${client_ip}')`)
}
agentServices.getStaffLogData = (connection) => {
    return connection.execute(`select id, name, email, status, Remarks,DATE_FORMAT(time, "%d-%m-%Y %H:%i:%s") as  time,client_ip from staff_log ORDER BY id DESC`)
}
agentServices.getAgentLogData = (connection) => {
    return connection.execute(`select id, name, email, status, remarks,DATE_FORMAT(time, "%d-%m-%Y %H:%i:%s") as  time,client_ip from agent_log ORDER BY id DESC`)
}
agentServices.updateEstablishmentDetails=(connection,nature_of_business,establishment_name,address,area,emirates,email,mobile,id)=>{
    return connection.execute(`update agents set establishment_name='${establishment_name}', address='${address}', nature_of_business='${nature_of_business}', area='${area}',emirates='${emirates}', email='${email}', mobile='${mobile}' where id=${id}`);
}
agentServices.updateDirector1Details=(connection,name, nationality,passportNumber,passportIssuingCountry,passportExpiry,emiratesId,emiratesIdExpiry,email1,mobile1,id)=>{
    return connection.execute(`update agents set director1_name='${name}', director1_nationality='${nationality}', director1_passport_number='${passportNumber}', director1_passport_issuing_country='${passportIssuingCountry}',director1_passport_expiry='${passportExpiry}', director1_emirates_id='${emiratesId}', director1_emirates_id_expiry='${emiratesIdExpiry}',director1_email='${email1}',director1_mobile='${mobile1}' where id=${id}`);
}
agentServices.updateDirector2Details=(connection,name2, nationality2,passportNumber2,passportIssuingCountry2,passportExpiry2,emiratesId2,emiratesIdExpiry2,email2,mobile2,id)=>{
    return connection.execute(`update agents set director2_name='${name2}', director2_nationality='${nationality2}', director2_passport_number='${passportNumber2}', director2_passport_issuing_country='${passportIssuingCountry2}',director2_passport_expiry='${passportExpiry2}', director2_emirates_id='${emiratesId2}', director2_emirates_id_expiry='${emiratesIdExpiry2}',director2_email='${email2}',director2_mobile='${mobile2}' where id=${id}`);
}
agentServices.updateSignatoryDetails=(connection,authorized_person_name,authorized_person_nationality,authorized_person_passport_number,authorized_person_passport_issuing_country,authorized_person_passport_expiry,authorized_person_emirates_id,authorized_person_emirates_id_expiry,authorized_person_email,authorized_person_mobile,id)=>{
    return connection.execute(`update agents set authorized_person_name='${authorized_person_name}', authorized_person_nationality='${authorized_person_nationality}', authorized_person_passport_number='${authorized_person_passport_number}', authorized_person_passport_issuing_country='${authorized_person_passport_issuing_country}',authorized_person_passport_expiry='${authorized_person_passport_expiry}', authorized_person_emirates_id='${authorized_person_emirates_id}', authorized_person_emirates_id_expiry='${authorized_person_emirates_id_expiry}',authorized_person_email='${authorized_person_email}',authorized_person_mobile='${authorized_person_mobile}' where id=${id}`);
}
agentServices.updateBankDetails=(connection,banker_name,branch_location,account_number,current_business_volume,id)=>{
    return connection.execute(`update agents set banker_name='${banker_name}',branch_location='${branch_location}',account_number='${account_number}',current_business_volume='${current_business_volume}' where id=${id}`);
}
agentServices.insertDetails=(connection,id,time,staffName,old_values,new_values)=>{
    return connection.execute(`insert into agent_profile_history(agent_id, updated_on, updated_by, old_values, new_values)Values(${id},'${time}','${staffName}','${old_values}','${new_values}')`);
}
agentServices.getIataDocument=(connection,id)=>{
    return connection.execute(`select iata_accredited as iata from agents where id=${id}`);
}
agentServices.getDocument=(connection,FileType,id)=>{
    return connection.execute(`select ${FileType} as file from agents where id=${id}`);
}
agentServices.updateDocument=(connection,fileType,DBPath,Id)=>{
    return connection.execute(`update agents set ${fileType}='${DBPath}' where id=${Id}`);
}
agentServices.insertDocument=(connection,Id,fileType,document,time,staffName,remarks)=>{
    return connection.execute(`insert into agent_document_history(agentId, document_type, document_path,updated_on,updated_by, remarks)Values(${Id},'${fileType}','${document}','${time}','${staffName}','${remarks}')`);
}
agentServices.suspendAgent = (connection, id) => {
    const status = 2
    return connection.execute("update agents set status=? where id=?", [status, id]);
}
agentServices.readSalesStaff=(connection)=>{
    return connection.execute(`SELECT ms.id as id, ms.first_name,ms.last_name, msr.name as role FROM midoffice_staff ms inner join midoffice_staff_roles msr on ms.roleId=msr.id WHERE msr.name='Sales'`);
}

agentServices.salesMapping = (connection, SalesPerson,remarks,id) => {
    return connection.execute(`update agents set staff_mapped=${SalesPerson},remarks='${remarks}' where id=${id}`);
}
agentServices.getSalesDetails = (connection, SalesPerson) => {
    return connection.execute(`select first_name,last_name,id,email,mobile from midoffice_staff where id=${SalesPerson}`);
}
agentServices.updateStaffDetails = (connection,name,staffId,id,email,mobile) => {
    return connection.execute(`update agents set assisted_by='${name}',assisted_by_details='${staffId}',staff_email='${email}',staff_mobile='${mobile}' where id=${id}`);
}
agentServices.readActiveAgents = (connection) => {
    return connection.execute(`select id, establishment_name from agents where status='1'`);
}
agentServices.countSearch = (connection,id) => {
    return connection.execute(`select count(*) as search_count from flight_search_log where agent_id='${id}'`);
}
agentServices.countBook = (connection,id) => {
    return connection.execute(`select count(*) as book_count from flight_booking where agent_id='${id}'`);
}
agentServices.detailsLogs = (connection) => {
    return connection.execute(`SELECT aph.*, agents.establishment_name FROM agent_profile_history aph inner join agents  on aph.agent_id=agents.id`);
}
agentServices.documentLogs = (connection) => {
    return connection.execute(`SELECT adh.*, agents.establishment_name FROM agent_document_history adh inner join agents  on adh.agentId=agents.id`);
}
agentServices.mappedAgentsData = (connection,id) => {
    return connection.execute(`SELECT id,establishment_name,email,mobile,assisted_by from agents where staff_mapped=${id}`);
}

agentServices.allAgentName=(connection)=>{
    return connection.execute(`select id,establishment_name from agents`);
}
agentServices.getAgentDetails=(connection,id)=>{
    return connection.execute(`select id,establishment_name,email,mobile from agents where id=${id}`);
}
agentServices.getWalletId=(connection,id)=>{
    return connection.execute(`select id from prepaid_wallet where agent_id=${id}`);
}
agentServices.checkDetails=(connection,id)=>{
    return connection.execute(`select * from prepaid_wallet_details where walletId=${id}`);
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
agentServices.addWalletDetails=(connection,walletId,action,amount,remarks,dateTime,Tid,MOT,staffName)=>{
    return connection.execute(`insert into prepaid_wallet_details(walletId, transaction_type, amount, transaction_date_time, remarks,transaction_id,mode_of_payment,done_by) values(${walletId},'${action}',${amount},'${dateTime}','${remarks}','${Tid}','${MOT}','${staffName}')`);
}

agentServices.generalActivityLog=(connection,staffName,staffEmail,description,createdAt,client_ip)=>{
    return connection.execute(`insert into midoffice_general_activity_logs(name, email, description, time,client_ip) values('${staffName}','${staffEmail}','${description}','${createdAt}','${client_ip}')`);
}
agentServices.getActivityLogs=(connection)=>{
    return connection.execute(`select name, email, description, DATE_FORMAT(time, "%d-%m-%Y %H:%i:%s") as time,client_ip from midoffice_general_activity_logs order by id desc`);
}

agentServices.addAgentLog=(connection,staffName,staffEmail,description,createdAt,id,client_ip)=>{
    return connection.execute(`insert into midoffice_agent_activity_log(name, email, description, time,agentId,client_ip) values('${staffName}','${staffEmail}','${description}','${createdAt}',${id},'${client_ip}')`);
}

agentServices.getAgentLogs=(connection)=>{
    return connection.execute(`select ma.name, ma.email, ma.description, DATE_FORMAT(ma.time, "%d-%m-%Y %H:%i:%s") as time,ma.client_ip, agents.email as agentEmail  from midoffice_agent_activity_log ma inner join agents on ma.agentId=agents.id order by ma.id desc`);
}

agentServices.getAgentActivityLogs=(connection)=>{
    return connection.execute(`select al.email, al.remarks, DATE_FORMAT(al.time, "%d-%m-%Y %H:%i:%s") as time,al.client_ip, agents.establishment_name as name  from agent_activity_logs al inner join agents on al.agent_id=agents.id order by al.id desc`);
}
agentServices.getWalletSummary=(connection,id)=>{
    return connection.execute(`select id, walletId, transaction_type, amount,DATE_FORMAT(transaction_date_time, "%d-%m-%Y %H:%i:%s") as transaction_date_time, remarks,transaction_id,mode_of_payment,done_by from prepaid_wallet_details where walletId=${id} order by id desc`);
}
// agentServices.getPendingRequestData=(connection)=>{
//     return connection.execute(`select awr.id,DATE_FORMAT(awr.date_of_deposit, "%d-%m-%Y") as date_of_deposit, awr.amount, awr.mode_of_payment, awr.transaction_id, awr.screenshot,agents.establishment_name,agents.email from agent_wallet_request awr inner join agents on awr.agent_id=agents.id where awr.status=0`);
// }
agentServices.getPendingRequestData=(connection)=>{
    return connection.execute(`select awr.id,DATE_FORMAT(awr.date_of_deposit, "%d-%m-%Y") as date_of_deposit, awr.amount, awr.mode_of_payment, awr.transaction_id, awr.screenshot,agents.establishment_name,agents.email from agent_wallet_request awr inner join agents on awr.agent_id=agents.id where awr.status=0 order by awr.id desc`);
}
// agentServices.approvePendingRequest=(connection,id)=>{
//     return connection.execute(`update agent_wallet_request set status=1 where id=${id}`);
// }
agentServices.approvePendingRequest=(connection,id,remarks_admin,update_by,dateTime)=>{
    return connection.execute(`update agent_wallet_request set status=1,remark_midoffice='${remarks_admin}',updateby='${update_by}',updateon='${dateTime}' where id=${id}`);
}
agentServices.getWalletRequestData=(connection,id)=>{
    return connection.execute(`select agent_id,date_of_deposit,amount,mode_of_payment,transaction_id,remark_midoffice from agent_wallet_request where id=${id}`);
}
agentServices.getAgentEmail=(connection,id)=>{
    return connection.execute(`select email from agents where id=${id}`);
}


agentServices.insertWalletDetails=(connection,id,transaction_type,amount,dateTime,remarks,transaction_id,mode_of_payment,staffName)=>{
    return connection.execute(`insert into prepaid_wallet_details(walletId, transaction_type, amount, transaction_date_time, remarks,transaction_id,mode_of_payment,done_by) values(${id},'${transaction_type}',${amount},'${dateTime}','${remarks}','${transaction_id}','${mode_of_payment}','${staffName}')`);
}

// agentServices.rejectPendingRequest=(connection,id)=>{
//     return connection.execute(`update agent_wallet_request set status=2 where id=${id}`);
// }
agentServices.rejectPendingRequest=(connection,id,remarks_admin,update_by,dateTime)=>{
    return connection.execute(`update agent_wallet_request set status=2,remark_midoffice='${remarks_admin}',updateby='${update_by}',updateon='${dateTime}' where id=${id}`);
}
agentServices.getSearchResults=(connection,id)=>{
    return connection.execute(`select fs.id, fs.agent_id, fs.from, fs.to, fs.total_no_of_pax, fs.no_of_adults, fs.no_of_childs, fs.no_of_infants,DATE_FORMAT(fs.departure_date, "%d-%m-%Y") as departure_date,DATE_FORMAT(fs.return_date, "%d-%m-%Y") as return_date, fs.journey_type, fs.class,DATE_FORMAT(fs.search_date_time, "%d-%m-%Y %H:%i:%s") as search_date_time, agents.establishment_name as name  from flight_search_log fs inner join agents on fs.agent_id=agents.id where agent_id=${id} order by fs.id desc`);
}

agentServices.getFlightBookResults=(connection)=>{
    return connection.execute(`select fb.* , agents.email as email  from flight_booking fb inner join agents on fb.agent_id=agents.id  order by fb.booking_id desc`);
}
agentServices.getFlightBookingDetailResults=(connection,booking_id)=>{
    return connection.execute(`select * from flight_booking_details where booking_id=${booking_id}`);
}
module.exports = agentServices;