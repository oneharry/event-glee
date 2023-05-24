const {getEventsByUser, createEventByUser, getAllEvents} = require('./event.contoller')
const {buyTicket, getUsersTicket} = require('./ticket.controller')
const {createUserProfile} = require('./user.contoller')

module.exports = {getEventsByUser, createEventByUser, getAllEvents, buyTicket, getUsersTicket, createUserProfile}