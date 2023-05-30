const express = require("express");
const router = express.Router();
const {getEventsByUser, createEventByUser, getAllEvents, buyTicket, getUsersTicket, createUserProfile, verifyPay} = require('../controllers')
const {authenticate} = require('../middleware/authenticate')
const {upload} = require('../middleware/multer');



//ROUTES
router.post('/user', createUserProfile)

router.post('/ticket', authenticate, buyTicket)
router.get('/paystack/verify', authenticate, verifyPay)

router.get('/:userId/ticket', authenticate, getUsersTicket)

router.get('/:userId/events', authenticate, getEventsByUser)

router.post('/:userId/events', authenticate, upload, createEventByUser)

router.get('/events', getAllEvents)

router.get('/verify', getAllEvents)


module.exports = router;