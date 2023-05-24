const {createUser} = require('../database')
const {sendMail} = require('../services')

//creates a user profile in the database
exports.createUserProfile = async (req, res) => {
    const email = req.body.email

    try {
        const result = await createUser(email);
        const mailRes = await sendMail()
        console.log("Mail", mailRes.response);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event');
    }
}