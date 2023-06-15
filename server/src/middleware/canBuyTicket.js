const {getEventById} = require('../database')

exports.canGetTicket = async (req, res, next) => {
    const eventId = req.body.eventId;
    const eventObj  = await getEventById(eventId);

    const totalTickets = eventObj.totalTickets;
    const soldTickets = eventObj.numSold;

    if(soldTickets < totalTickets) {
        next()
    } else {
        console.log("event tickets sold out", err)
        return res.status(500).send({ status: "failure", message: "event sold out" });
    }
}