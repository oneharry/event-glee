const request = require('request')
require('dotenv').config();


const MySecretKey = `Bearer ${process.env.PAYSTACK_SECRET_KEY}`;
//sk_test_xxxx to be replaced by your own secret key
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