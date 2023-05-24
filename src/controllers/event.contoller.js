const {getEvents, getUserEvents, createEvent} = require('../database')
const cloudinary = require('../config/cloudinary.config')
const dataUri = require('../middleware/multer')


//get events owned by user userId
exports.getEventsByUser = async (req, res) => {
    const userId = req.params.userId
    const userEvents = await getUserEvents(userId)
    res.send(userEvents)
}

//create an event
exports.createEventByUser = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    

    const data = req.body;
    const currentDate = new Date();
    
    const form = {
        'name': data.name,
        'cat': data.category,
        'venue': data.venue,
        'desc': data.description,
        'price': data.price,
        'totalTickets': data.totalTickets,
        'start': currentDate,
        'end': currentDate,
        'image': result.url,
        'userId': req.params.userId
    }
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