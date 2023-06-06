const express = require("express");
const app = express();
const multer = require('multer');
const cors = require('cors');

const bodyParser = require('body-parser')
const homeRoute = require('./src/routes/app.route')




//MIDDLEWARES
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());



//routers
app.use('/api/', homeRoute)

app.listen(5000, () => console.log("Server running on Port 5000"));