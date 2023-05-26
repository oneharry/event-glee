const express = require("express");
const router = express.Router();
const {getEventsByUser, createEventByUser, getAllEvents, buyTicket, getUsersTicket, createUserProfile} = require('../controllers')
const {verifyToken} = require('../middleware/authenticate')
const {upload} = require('../middleware/multer')


//ROUTES
router.post('/user', createUserProfile)

router.post('/ticket', buyTicket)

router.get('/:userId/ticket', getUsersTicket)

router.get('/:userId/events', getEventsByUser)

router.post('/:userId/events', upload, createEventByUser)

router.get('/events', getAllEvents)

router.get('/verify', getAllEvents)


module.exports = router;