const {sendMail} = require('./mail.service')
const {createTicketPDF} = require('./pdf.service')


module.exports = {sendMail, createTicketPDF};