const {getEvents, getUserEvents, createEvent} = require('../database')
const cloudinary = require('../config/cloudinary.config')
const dataUri = require('../middleware/multer')
const { v4: uuidv4 } = require('uuid')



//get events owned by user userId
exports.getEventsByUser = async (req, res) => {
    const userId = req.params.userId
    const userEvents = await getUserEvents(userId)
    res.send(userEvents)
}

//create an event
exports.createEventByUser = async (req, res) => {
    console.log("FILE", req.file)

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
        'end': data.end,
        'imageUrl': result.secure_url,
        'organizer': data.organizer,
        'userId': req.params.userId
    }

    console.log("EVEN", form)

    try {
        const result = await createEvent(form);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event');
    }
}


//Returns all event
exports.getAllEvents =  async (req, res) => {
    const events = await getEvents()
    res.send(events);
}