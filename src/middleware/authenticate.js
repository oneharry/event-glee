const admin = require('../config/firebase.config')



exports.verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
  
    try {
      const decodeValue = await admin.verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
    } catch (e) {
      return res.json({ message: "Internal Error" });
    }
  };