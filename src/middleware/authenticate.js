const admin = require('../config/firebase.config')


/*
* authenticate - authenticates a user using JWT from the client request object
* req: request object
* res: response object
* Returns: if success, returns action to next function
*/
exports.authenticate = async (req, res, next) => {

  
  const token = req.headers.authorization.split(" ")[1];
  
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
    } catch (err) {
      console.log("error authenticating user", err)
      return res.status(500).send({ status: "success", message: "can't authenticate user", error: err });
    }
  };