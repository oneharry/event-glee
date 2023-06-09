const {initializePayment, verifyPayment} = require('../utils/payment.utils')
const {createTicket, getEventById, getUser} = require('../database')
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
const getTicket = async (eventId, userId) => {
    const ticketId = getRandomNum();

    try {
        const eventInfo = await getEventById(eventId);
        const user = await getUser(userId)
    
        const myTicket = {
            "ticketId": ticketId,
            "eventId": eventId,
            "userId": eventInfo.userId
        }

        await createTicket(myTicket);
        console.log("1", eventInfo);
        const mailRes = await sendMail(eventInfo, user, ticketId)
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
        const {eventId, userId} = req.body;
        await getTicket(eventId, userId)
        res.status(200).json({status: "success"})
        process.exit();
        // if (req.body.amount === '0') {
        //     //if ticket price is free
        //     const {eventId} = req.body;
        //     getTicket(eventId)
        //     res.status(200).json({status: "success"})
        // } else {
        //     //if ticket price is not free
        //     //initialize payment
        //     initializePayment(req.body, (err, body) => {
        //         if(err) {
        //             console.log(err)
        //             res.status(500).json({status: "failure", message: 'error initializing payment' });
        //         } else {
        //             //redirect client to paystack payment url 
        //             const response = JSON.parse(body);
        //             console.log("create payment body", response)
        //             res.redirect(response.data.authorization_url)
        //         }
        //     })
        // }

    } catch (error) {
        console.log("error initializing payment")
        res.status(500).json({status: "failure", message: 'error initializing payment', error: error });
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
                    res.status(500).json({status: "failure", message: 'error confirming paystack payment' });
                } else {
                    const response = JSON.parse(body);
                    const {eventId} = req.body;
                    getTicket(eventId, userId)
                    res.status(200).json({status: "success"})
                }
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({status: "failure", message: 'error comfirming payment', error: err });
        }
    } else {
        console.log(err)
      res.status(500).json({ status: "failure", message: 'invalid payment reference' });
    }
  }