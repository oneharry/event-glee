
const admin = require("firebase-admin");
require('dotenv').config();

const serviceAccount = process.env.SERVICE_ACCOUNT;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
