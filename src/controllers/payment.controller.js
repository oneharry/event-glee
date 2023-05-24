const {initializePayment, verifyPayment} = require('../utils/payment.utils')


exports.initiatePayment = (req, res) => {
    try {
        initializePayment(req.body, (err, body) => {
            if (err) {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while initiating payment' });
            } else {
            const response = JSON.parse(body);
            console.log("create payment body", response);
            res.json({ authorization_url: response.data.authorization_url });
            }
        });
    } catch (error) {
      console.error('Error initiating payment:', error.message);
      res.status(500).json({ error: 'An error occurred while initiating payment' });
    }
}


exports.verifyPay = (req, res) => {
    const ref = req.body.reference;
  
    if (ref) {
        verifyPayment(ref, (err, body) => {
            if (err) {
            console.log("Can't confirm", err);
            res.status(500).json({ error: 'An error occurred while confirming payment' });
            } else {
            const response = JSON.parse(body);
            console.log("confirm payment", response);
            res.json({ message: 'Payment confirmed successfully' });
            }
        });
    } else {
      res.status(400).json({ error: 'Invalid reference' });
    }
  }