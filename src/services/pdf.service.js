const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument({size: 'A4'})


const createTicket = async () => {
    const imgurl = 'student2' 
    const ticketNumber = 19;
    const eventName = 'TEst event lormewnjjfdjkmnsdjknsdjvnsdkjmvnsdjvnjcj'
    const eventDate = "saturdar, 13 Dec 2023"
    const eventPrice = 1000;


    try {
    
        doc.pipe(fs.createWriteStream('test.pdf'));

        doc.moveUp(3)
        doc.fillColor('green')
        .fontSize(30)
        .text("Event Glee", {
            align: 'center'
        })
        .rect(20, 60, 550, 250)
        .stroke('green')

        doc.moveDown()
        doc.fillColor('black')
        .fontSize(8)
        .text(`Ticket No: ${ticketNumber}`, {
            width: 200,
            align: 'left'
        })
        
        doc.moveDown(2)
        doc.fillColor('black')
        .fontSize(20)
        .font('Times-Roman')
        .text(`${eventName}`, {
            width: 300,
            align: 'center'
        })

        doc.moveDown(0.5)
        doc.fillColor('black')
        .fontSize(15)
        .text(`${eventDate}`, {
            width: 200,
            align: 'left'
        })


        doc.moveDown()
        doc.fillColor('black')
        .fontSize(15)
        .text(`N${eventPrice}`, {
            width: 200,
            align: 'left'
        })

        doc.moveDown()
        doc.fillColor('green')
        .fontSize(8)
        .text("Want to organize events? visit eventglee.com", {
            align: 'right',
            link: 'www.google.com',
            align: 'right'
        })

        doc
        .image(`${imgurl}`, 430, 80, {
            width: 100,
            height: 100,
            align: 'right'
        })
        .moveUp()

        doc.end()
    } catch (error) {
        console.log("Error writing pdf", error)
    }
}
