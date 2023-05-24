const { createEvent, getEvents, getUserEvents } = require('./events.db.js');
const { createTickets, getUserEventTickets } = require('./tickets.db.js');
const { createUser } = require('./users.db.js');

module.exports = {createEvent, getEvents, getUserEvents, getUserEventTickets, createTickets, createUser}