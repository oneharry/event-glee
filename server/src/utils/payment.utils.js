const request = require('request')
require('dotenv').config();

//sk_test_xxxx to be replaced by your own secret key
const MySecretKey = `Bearer ${process.env.PAYSTACK_SECRET_KEY}`;


//initialize payment API
exports.initializePayment = (form, mycallback) => {
    const option = {
        url : 'https://api.paystack.co/transaction/initialize',
        headers : {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
       },
       form
    }
    const callback = (error, response, body)=>{
        return mycallback(error, body);
    }
    request.post(option,callback);
}


//verify payment API
exports.verifyPayment = (ref, mycallback) => {
    const option = {
        url : 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
        headers : {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
       }
    }
    const callback = (error, response, body)=>{
        return mycallback(error, body);
    }
    request(option,callback);
}