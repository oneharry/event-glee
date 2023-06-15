const transporter = require('../config/nodemailer.config');
const {createTicketPDF} = require('./pdf.service')


/*
* sendMail - send tickets to users mail
* data: object of user
* ticketId: id of the ticket
* Returns: an array of tickets 
*/
exports.sendMail = async (data, user, ticketId) => {

    const {name} = data;
    const {email} = user;


    //create a document
    const doc = await createTicketPDF(data, ticketId);
    const emailOption = {
        from: 'gleeventhub@gmail.com',
        to: email,
        subject: 'EVENTGLEE',
        text: name,
        attachments: [{
            filename: `${ticketId}_${name}.pdf`,
            content: doc
        }]
    }

    const myTransport = await transporter()
    try {
        const info = await myTransport.sendMail(emailOption)
        console.log("Mail response", info.response)
        return info;
    } catch (err) {
        console.log(err)
        return (err)
    }
}