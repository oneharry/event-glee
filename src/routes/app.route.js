const express = require("express");
const router = express.Router();
const {getEventsByUser, createEventByUser, getAllEvents, buyTicket, getUsersTicket, createUserProfile, verifyPay} = require('../controllers')
const {authenticate} = require('../middleware/authenticate')
const multer = require('multer');


const upload = multer({ dest: 'uploads/' });


//ROUTES
router.post('/user', createUserProfile)

router.post('/ticket', authenticate, buyTicket)
router.get('/paystack/verify', authenticate, verifyPay)

router.get('/:userId/ticket', authenticate, getUsersTicket)

router.get('/:userId/events', authenticate, getEventsByUser)

router.post('/:userId/events', authenticate, upload.single('image'), createEventByUser)

router.get('/events', getAllEvents)

router.get('/verify', getAllEvents)


module.exports = router;