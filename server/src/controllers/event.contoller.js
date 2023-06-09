const {getEvents, getUserEvents, createEvent} = require('../database')
const cloudinary = require('../config/cloudinary.config')
const { v4: uuidv4 } = require('uuid')



/*
* getEventsByUser - Fetches events  from database 
* req: http request object
* res: http response object
* Returns: an array of the events object response owned by userId to client
*/
exports.getEventsByUser = async (req, res) => {
    const userId = req.params.userId
    try {
        const userEvents = await getUserEvents(userId)
        res.status(200).json({status: "success", data: userEvents})
    } catch (error) {
        console.log("Error getting events")
        res.status(500).json({status: "failure", message: "error fetching data"})
    }
}

/*
* createEventByUser - creates event using requesty body
* req: http request objec
* res: http response object
* Returns: a response object to the client
*/
exports.createEventByUser = async (req, res) => {

    const result = await cloudinary.uploader.upload(req.file.path);
    
    const data = req.body;
    const eventId = uuidv4();
    
    const form = {
        'eventId': eventId,
        'name': data.name,
        'category': data.category,
        'venue': data.venue,
        'description': data.description,
        'amount': data.price,
        'totalTickets': data.totalTickets,
        'start': data.start,
        'imageUrl': result.secure_url,
        'organizer': data.organizer,
        'userId': req.params.userId
    }

    try {
        console.log("EVENT", form)
        const result = await createEvent(form);
        res.status(201).json({status: "success", data: result});
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({status: "failure", message: "error creating event"});
    }
}


/*
* getAllEvents - Fetches events from database 
* req: http request object
* res: http response object
* Returns: an array of the events object response to client
*/
exports.getAllEvents =  async (req, res) => {
    try {
        const events = await getEvents()
        res.status(200).json({status: "success", data: events}); 
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({status: "failure", message: "error fetching data"});
    }
    
}