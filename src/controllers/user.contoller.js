const {createUser} = require('../database')

/*
* createUserProfile - creates a user
* req: http request object
* res: http response object
* Returns: object of the new user created
*/
exports.createUserProfile = async (req, res) => {
    const {userId, email} = req.body
    try {
        const result = await createUser(userId, email);
        res.status(201).json({status: "success", data: result});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({status: "failure", message: "Error creating event"});
    }
}