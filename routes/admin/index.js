const express = require('express');
const adminController = require("../../controllers/admin/admin.controller")
const router = express.Router()
const {verify} = require('jsonwebtoken')
let jwtSecret = process.env.JWT_SECRET;


// Mid-Office Login Routes
// router.get('/', indexController.login)

const authorizeAdminHTTP = (req, res, next) => {
    // console.log(req.headers.authorization)
    try {
        let accessToken = req.headers.authorization.split(" ")[1];
        // let accessToken = req.cookies.deanAuthToken;
        if (!accessToken) {
            return res.json({responseCode: 440, message: 'Invalid Session'})
        }
        try {
            req.admin = verify(accessToken, jwtSecret);
            next();
        } catch (err) {
            return res.json({responseCode: 440, message: 'Session Expired'})
        }
    } catch (e) {
        return res.send({responseCode: 1, message: 'Token Missing'})
    }
}

router.post('/login', adminController.login)
router.get('/login', adminController.renderLoginPage)

router.post('/staff-roles', authorizeAdminHTTP, adminController.AddStaffRoles)
router.get('/staff-roles', authorizeAdminHTTP, adminController.ReadStaffRoles)
router.put('/staff-roles/:id', authorizeAdminHTTP, adminController.UpdateStaffRoles)
router.delete('/staff-roles/:id', authorizeAdminHTTP, adminController.DeleteStaffRoles)

router.get('/agents', authorizeAdminHTTP, adminController.ReadAgentsData)
router.get('/agent/:id', authorizeAdminHTTP, adminController.ReadAgent)

router.post('/user-group', authorizeAdminHTTP, adminController.AddUserGroup)
router.get('/user-group', authorizeAdminHTTP, adminController.ReadUserGroup)
router.put('/user-group/:id', authorizeAdminHTTP, adminController.UpdateUserGroup)
router.delete('/user-group/:id', authorizeAdminHTTP, adminController.DeleteUserGroup)

router.post('/activate-agent/:id', authorizeAdminHTTP, adminController.activateAgent)
router.post('/deactivate-agent/:id', authorizeAdminHTTP, adminController.deactivateAgent)


router.get('/staff',authorizeAdminHTTP,adminController.ReadStaff)
router.post('/staff',authorizeAdminHTTP,adminController.AddStaff)
router.get('/staff-active/:id',authorizeAdminHTTP,adminController.ActiveStaff)
router.get('/staff-inactive/:id',authorizeAdminHTTP,adminController.InactiveStaff)

router.post('/change-password',authorizeAdminHTTP,adminController.ChangePassword)
router.post('/resend-agent-password/:id',authorizeAdminHTTP,adminController.ResendPassword)
router.get('/staff-detail',authorizeAdminHTTP,adminController.StaffDetails)
router.post('/service-fees',authorizeAdminHTTP,adminController.AddPlatformFee)
router.put('/service-fees',authorizeAdminHTTP,adminController.UpdatePlatformFee)
router.get('/service-fees',authorizeAdminHTTP,adminController.ReadPlatformFee)
router.post('/fare-types',authorizeAdminHTTP,adminController.AddFare)
router.get('/fare-types',authorizeAdminHTTP,adminController.GetFare)
router.put('/fare-types',authorizeAdminHTTP,adminController.UpdateFare)
router.delete('/fare-types/:id',authorizeAdminHTTP,adminController.DeleteFare)
router.post('/supplier',authorizeAdminHTTP,adminController.AddSupplier)
router.get('/supplier',authorizeAdminHTTP,adminController.GetSupplier)
router.put('/supplier',authorizeAdminHTTP,adminController.UpdateSupplier)
router.delete('/supplier/:id',authorizeAdminHTTP,adminController.DeleteSupplier)
router.post('/add-flight-markup',authorizeAdminHTTP,adminController.AddMarkup)
router.delete('/delete-flight-markup/:id',authorizeAdminHTTP,adminController.DeleteMarkup)
router.get('/markups',authorizeAdminHTTP,adminController.GetMarkup)
router.get('/count',authorizeAdminHTTP,adminController.Count)
router.get('/carriers',authorizeAdminHTTP,adminController.GetCarrier)
router.post('/logout',authorizeAdminHTTP,adminController.Logout)
router.get('/mid-office-logs',authorizeAdminHTTP,adminController.GetStaffLogData)
router.get('/travel-agent-logs',authorizeAdminHTTP,adminController.GetAgentLogData)
// -------------------------------------------------------------------------------------------------
router.post('/agent-establishment-update',authorizeAdminHTTP,adminController.UpdateEstablishmentDetails)
router.post('/agent-director1-update',authorizeAdminHTTP,adminController.UpdateDirector1Details)
router.post('/agent-director2-update',authorizeAdminHTTP,adminController.UpdateDirector2Details)
router.post('/agent-signatory-update',authorizeAdminHTTP,adminController.UpdateSignatoryDetails)
router.post('/agent-bank-update',authorizeAdminHTTP,adminController.UpdateBankDetails)
router.post('/agent-document-update',authorizeAdminHTTP,adminController.UpdateDocument)
// -------------------------------------------------------------------------------
router.post('/suspend-agent/:id', authorizeAdminHTTP, adminController.SuspendAgent)
router.get('/getSalesStaff',authorizeAdminHTTP,adminController.GetSalesStaff)
router.post('/agent-salesMapping-update',authorizeAdminHTTP,adminController.SalesMapping)
router.get('/agents-search-stats',authorizeAdminHTTP,adminController.SearchStats)
router.get('/travel-agents-details-changes',authorizeAdminHTTP,adminController.DetailsLogs)
router.get('/travel-agents-document-changes',authorizeAdminHTTP,adminController.DocumentLogs)
router.get('/agents-partners/:id',authorizeAdminHTTP,adminController.MappedAgentsData)

router.get('/getPartners',authorizeAdminHTTP,adminController.allAgentName)
router.get('/getAgentDetails/:id',authorizeAdminHTTP,adminController.GetAgentDetails)
router.post('/updateWallet',authorizeAdminHTTP,adminController.AddWalletDetails)
router.get('/mid-office-activity-general-logs',authorizeAdminHTTP,adminController.GetActivityLogs)
router.post('/mid-office-agent-activity-log',authorizeAdminHTTP,adminController.AddAgentLog)
router.get('/mid-office-activity-agent-logs',authorizeAdminHTTP,adminController.GetAgentLogs)
router.get('/travel-agent-activity-logs',authorizeAdminHTTP,adminController.GetAgentActivityLogs)
router.get('/getAgentTransactions/:id',authorizeAdminHTTP,adminController.GetWalletSummary)
// router.get('/pending-requests',adminController.getPendingRequest)
// router.post('/approve-requests/:id',authorizeAdminHTTP,adminController.ApprovePendingRequest)
router.get('/pending-requests',authorizeAdminHTTP,adminController.getPendingRequest)
router.post('/approve-requests/:id',authorizeAdminHTTP,adminController.ApprovePendingRequest)
router.post('/reject-requests/:id',authorizeAdminHTTP,adminController.RejectPendingRequest)
router.get('/agents-flight-search-stats/:id',authorizeAdminHTTP,adminController.GetSearchResults)
router.get('/flight-book-search-stats',adminController.GetFlightBookResults)
module.exports = router
