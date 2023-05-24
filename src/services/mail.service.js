const transporter = require('../config/nodemailer.config');

exports.sendMail = async () => {
    const data = {
        from: 'gleeventhub@gmail.com',
        to: 'ezugwuharrison@gmail.com',
        subject: "Testing mail services",
        text: "This is your test text"
    }

    const myTransport = await transporter()

    try {
        const info = await myTransport.sendMail(data)
        console.log("Here", info.response)
        return info;
    } catch (err) {
        console.log(err)
    }
}