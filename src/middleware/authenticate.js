const admin = require('../config/firebase.config')



exports.authenticate = async (req, res, next) => {

  
  const token = req.headers.authorization.split(" ")[1];
  
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        
        return next();
      }
    } catch (e) {
      console.log(e)
      return res.json({ message: "Internal Error" });
    }
  };