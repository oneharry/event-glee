const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument({size: 'A4'})


/*
* createTicketPDF - create ticket
* userId: id of the user
* Returns: a doc
*/
exports.createTicketPDF = async (data, ticketId) => {
    const {name, imgurl, start, end, amount} = data

    const dateCompare = (start, end) => {
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

        const formattedDate1 = start.toLocaleDateString(undefined, options);
        const formattedDate2 = end.toLocaleDateString(undefined, options);

        if (start.toDateString() === end.toDateString()) {
            const timeDiff = Math.abs(end - start);
            const formattedTimeDiff = new Date(timeDiff).toISOString().substr(11, 8);
            return `${formattedDate1} - ${formattedTimeDiff}`;
        } else {
            const dates = [];
            const currentDate = new Date(start);
            currentDate.setHours(0, 0, 0, 0);
            const endDate = new Date(end);
            endDate.setHours(0, 0, 0, 0);

            while (currentDate <= endDate) {
            dates.push(currentDate.toLocaleDateString(undefined, options));
            currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates.join('\n');
        }
    }

    const date = dateCompare(start, end);
    const price = (amount == 0) ? "Free" : `N${amount}`;
    
    try {
        // doc.pipe(fs.createWriteStream(`${eventName}_${tickedId}.pdf`));

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

        // doc
        // .image(`${imgurl}`, 430, 80, {
        //     width: 100,
        //     height: 100,
        //     align: 'right'
        // })
        // .moveUp()

        doc.end()
        return doc;
    } catch (error) {
        console.log("Error writing pdf", error)
        return (error)
    }
}
