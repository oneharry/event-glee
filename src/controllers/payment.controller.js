const {initializePayment, verifyPayment} = require('../utils/payment.utils')
const {makePayment} = require('../services/paystack.service')
const {createTicket, getEventById} = require('../database')
const {sendMail} = require('../services')




const getRandomNum = () => {
    const min = 5;
    const max = 500000000;
    return Math.floor(Math.random() * (max - min) + max);
}

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
        console.log("Mail", mailRes.response);
        console.log("YOU DID IT")
        // res.status(200).json({message: "Hurray, you have gotten your ticket. See you soon!"});
    } catch (err) {
        console.log("DB failed", err)
        // res.status(500).json({error: "Error getting this ticket, try again later"})
    }
}

exports.buyTicket = async (req, res) => {
    const headers = req.headers;
  console.log(req.body);
    try {
        if (req.body.amount === 0) {
            console.log("AA")
            const {eventId} = req.body;
            getTicket(eventId)
        } else {
            initializePayment(req.body, (err, body) => {
                if(err) {
                    console.log(err)
                    res.status(500).json({ error: 'An error occurred while comfirming payment, try again later' });
                } else {
                    const response = JSON.parse(body);
                    console.log("create payment body", response)
        
                    res.redirect(response.data.authorization_url)
                }
            })
        }

    } catch (error) {
      
      res.status(500).json({ error: 'An error occurred, try later' });
    }
}


exports.verifyPay = (req, res) => {
    const ref = req.query.reference;
  
    if (ref) {
        try {
            verifyPayment(ref, (err, body) => {
                if (err) {
                    console.log("Can't confirm", err);
                    res.status(500).json({ error: 'An error occurred while confirming payment' });
                } else {
                    const response = JSON.parse(body);
                    console.log("confirm payment", response);
                    //check for eventID availability
                    const {eventId} = req.body;
                    getTicket(eventId, userId)
                }
            });
        } catch (err) {
            res.status(500).json({ error: 'An error occurred while confirming payment' });
        }
    } else {
      res.status(500).json({ error: 'Invalid reference' });
    }
  }