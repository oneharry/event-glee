const {getUserEventTickets, createTicket, createUser} = require('../database')

exports.buyTicket = async (req, res) => {
    const data = req.body

    const form = {
        'ticketNumber': data.ticketNumber,
        'eventId': data.eventId,
        'userId': data.userId
    }
    try {
        const result = await createTicket(form);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event');
    }
}

exports.getUsersTicket = async (req, res) => {
    const userId = req.params.userId
    try {
        const tickets = await getUserEventTickets(userId)
        res.send(tickets)
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event');
    }
}