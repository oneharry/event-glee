const {getUserEventTickets} = require('../database')


/*
* getUsersTickets - Fetches all tickets by user Id from DB
* req: request object
* res: response object
* Returns: an array of tickets owned by userId
*/
exports.getUsersTicket = async (req, res) => {
    const userId = req.params.userId
    try {
        const tickets = await getUserEventTickets(userId)
        res.status(200).json({status: "success", data: tickets})
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({status: "failure", message: "error fetching data from database"});
    }
}