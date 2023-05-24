const {initializePayment, verifyPayment} = require('../utils/payment.utils')


exports.makePayment = async (data) => {
    const ref = await initializePayment(data, (err, body) => {
        if(err) {
            console.log(err)
        } else {
            const response = JSON.parse(body);
            console.log("create payment body", response)
            return response;
        }
    })
    return ref;
}

exports.confirmPayment = async (ref) => {
    if (ref) {
        verifyPayment(ref, (err, body) => {
            if(err) {
                console.log("Can't confirm", err);
            } else {
                const response = JSON.parse(body);
                console.log("confirm payment", response)
                return response;
            }
        })
    }
}