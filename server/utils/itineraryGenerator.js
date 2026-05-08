const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateItineraryPDF = (bookingData, outputPath) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });

        doc.pipe(fs.createWriteStream(outputPath));

        // Header
        doc.fillColor('#0ea5e9').fontSize(24).text('TRAVEL CRM', { align: 'right' });
        doc.fillColor('#475569').fontSize(10).text('Your Trusted Travel Partner', { align: 'right' });
        doc.moveDown();

        doc.hr = (y) => {
            doc.moveTo(50, y).lineTo(550, y).strokeColor('#e2e8f0').stroke();
            return doc;
        };

        doc.hr(doc.y);
        doc.moveDown();

        // Booking Details
        doc.fillColor('#1e293b').fontSize(18).text(`Travel Itinerary: ${bookingData.type}`, { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(12).text(`Customer: ${bookingData.customer.name}`);
        doc.text(`Booking Date: ${new Date(bookingData.createdAt).toLocaleDateString()}`);
        doc.moveDown();

        doc.hr(doc.y);
        doc.moveDown();

        // Itinerary items
        doc.fontSize(14).fillColor('#0ea5e9').text('Schedule Details');
        doc.moveDown(0.5);

        if (bookingData.details) {
            Object.entries(bookingData.details).forEach(([key, value]) => {
                doc.fillColor('#475569').fontSize(10).text(`${key.toUpperCase()}:`, { continued: true });
                doc.fillColor('#1e293b').fontSize(10).text(` ${value}`);
                doc.moveDown(0.5);
            });
        }

        doc.moveDown();
        doc.hr(doc.y);
        doc.moveDown();

        // Total Amount
        doc.fontSize(14).fillColor('#1e293b').text(`Total Amount: $${bookingData.totalAmount}`);
        doc.moveDown(0.5);
        doc.fontSize(10).fillColor('#64748b').text('Thank you for choosing our services!');

        doc.end();
        resolve();
    });
};

module.exports = { generateItineraryPDF };
