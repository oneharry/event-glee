const {initializePayment, verifyPayment} = require('../utils/payment.utils')
const {createTicket, getEventById} = require('../database')
const {sendMail} = require('../services')


/*
* getRandomNum - gets random number
* Returns: random number
*/
const getRandomNum = () => {
    const min = 5;
    const max = 500000000;
    return Math.floor(Math.random() * (max - min) + max);
}


/*
* getTicket - get Ticket
* eventId: Id of the event
* Returns: an array of the events object response owned by userId to client
*/
const getTicket = async (eventId) => {
    const ticketId = getRandomNum();

    
    const eventInfo = await getEventById(eventId);

    
    const myTicket = {
        "ticketId": ticketId,
        "eventId": eventId,
        "userId": eventInfo.userId
    }

    try {
        await createTicket(myTicket);
        const mailRes = await sendMail(eventInfo, ticketId)
        return (mailRes)
    } catch (err) {
        console.log("DB failed", err)
        return (err)
    }
}

/*
* buyTicket - buys ticket 
* req: http request object
* res: http response object
* Returns: a success or failure message to clien
*/
exports.buyTicket = async (req, res) => {

    try {
        if (req.body.amount === 0) {
            //if ticket price is free
            const {eventId} = req.body;
            getTicket(eventId)
        } else {
            //if ticket price is not free
            //initialize payment
            initializePayment(req.body, (err, body) => {
                if(err) {
                    console.log(err)
                    res.status(500).send({status: "failure", message: 'error initializing payment', error: err });
                } else {
                    //redirect client to paystack payment url 
                    const response = JSON.parse(body);
                    console.log("create payment body", response)
                    res.redirect(response.data.authorization_url)
                }
            })
        }

    } catch (error) {
        console.log("error initializing payment")
        res.status(500).send({status: "failure", message: 'error initializing payment', error: error });
    }
}


/*
* verifyPay - confirms payment from paystack using a reference
* req: http request object
* res: http response object
* Returns: a success or failure message to client
*/
exports.verifyPay = (req, res) => {
    const ref = req.query.reference;
  
    if (ref) {
        try {
            verifyPayment(ref, (err, body) => {
                if (err) {
                    console.log("error confirming paystack", err);
                    res.status(500).send({status: "failure", message: 'error comfirming payment', error: err });
                } else {
                    const response = JSON.parse(body);
                    const {eventId} = req.body;
                    getTicket(eventId, userId)
                    res.status(200).send({status: "success"})
                }
            });
        } catch (err) {
            res.status(500).send({status: "failure", message: 'error comfirming payment', error: err });
        }
    } else {
      res.status(500).send({ status: "failure", message: 'invalid payment reference' });
    }
  }