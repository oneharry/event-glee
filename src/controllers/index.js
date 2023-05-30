const {getEventsByUser, createEventByUser, getAllEvents} = require('./event.contoller')
const {getUsersTicket} = require('./ticket.controller')
const {createUserProfile} = require('./user.contoller')
const {buyTicket, verifyPay} = require('./payment.controller')

module.exports = {getEventsByUser, createEventByUser, getAllEvents, buyTicket, getUsersTicket, createUserProfile, verifyPay}