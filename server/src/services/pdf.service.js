const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument({size: 'A4'})
const axios = require('axios')


/*
* createTicketPDF - create ticket
* userId: id of the user
* Returns: a doc
*/
exports.createTicketPDF = async (data, ticketId) => {
    const {name, imageUrl, start, end, amount} = data

    const dateFormat = (dateString) => {
        const dayArr = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
        const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = monthArr[dateObj.getMonth()];
        const day = dayArr[dateObj.getDay()]
        const dayOfMonth = dateObj.getDate();
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
    
        const fmtDate = `${day}, ${month} ${dayOfMonth} ${year}  ${hours}:${minutes}`
        return fmtDate;
      }

      const imgBuff = async (url) => {
        try {
            const res = await axios.get(url, {responseType: 'arraybuffer'})
            const imageData = Buffer.from(res.data, 'binary');
            console.log("image buffer", imageData)
            return imageData;
        } catch (error) {
            console.log("error getting image buffer", error)
            return error
        }
    }

    const date = dateFormat(start);
    const price = (amount == 0) ? "Free" : `N${amount}`;
    
    try {
        // doc.pipe(fs.createWriteStream(`${eventName}_${tickedId}.pdf`));

        const img = await imgBuff(imageUrl);
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
        .fontSize(15)
        .text(`Ticket No: ${ticketId}`, {
            width: 200,
            align: 'left'
        })
        
        doc.moveDown(2)
        doc.fillColor('black')
        .fontSize(20)
        .font('Times-Roman')
        .text(`${name}`, {
            width: 300,
            align: 'center'
        })

        doc.moveDown(0.5)
        doc.fillColor('black')
        .fontSize(15)
        .text(`${date}`, {
            width: 200,
            align: 'left'
        })


        doc.moveDown()
        doc.fillColor('black')
        .fontSize(15)
        .text(`${price}`, {
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
        .image(img, 430, 80, {
            width: 100,
            height: 100,
            align: 'right'
        })
        .moveUp()

        doc.end()
        return doc;
    } catch (error) {
        console.log("Error writing pdf", error)
        return (error)
    }
}
