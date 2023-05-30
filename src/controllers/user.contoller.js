const {createUser} = require('../database')
const {sendMail} = require('../services')

//creates a user profile in the database
exports.createUserProfile = async (req, res) => {
    const {userId, email} = req.body

    try {
        
        const result = await createUser(userId, email);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event');
    }
}