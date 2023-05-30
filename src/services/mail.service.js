const transporter = require('../config/nodemailer.config');
const {createTicketPDF} = require('./pdf.service')
exports.sendMail = async (data, ticketId) => {

    const {email, name} = data;

    const doc = await createTicketPDF(data, ticketId);
    const emailOption = {
        from: 'gleeventhub@gmail.com',
        to: 'ezugwuharrison@gmail.com',
        subject: 'EVENTGLEE',
        text: name,
        attachments: [{
            filename: `${ticketId}_ticket.pdf`,
            content: doc
        }]
    }

    const myTransport = await transporter()

    try {
        const info = await myTransport.sendMail(emailOption)
        console.log("Here", info.response)
        return info;
    } catch (err) {
        console.log(err)
    }
}