const PDFDocument = require("pdfkit");
const fs = require("fs");
const {
    unique_code_generator
} = require("../utils/code_generator");

const generate_bill_PDF = (details) => { 
    const doc = new PDFDocument();
    const today = new Date().toLocaleDateString("es-CR");

    doc.pipe(fs.createWriteStream(`invoice_${today}.pdf`));

    doc
    .fontSize(18)
    .text("Corporation Example", { align: "center" });

    doc
    .moveDown()
    .fontSize(14)
    .text(`Invoice Date: ${today}`, { align: "right" });

    doc
    .moveDown()
    .fontSize(14)
    .text(`Code: ${unique_code_generator()}`, { align: "right" });

    details.forEach(({ value }) => {
        doc
        .moveDown()
        .fontSize(12)
        .text(`${value.order} - ${value.quantity} = ${value.amount}`, { align: "left" });
    });

    doc
    .moveDown()
    .fontSize(14)
    .text(`Subtotal: ${details.total}`, { align: "right" });

    doc
    .moveDown()
    .fontSize(14)
    .text(`Total: ${details.total}`, { align: "right" });

    doc.moveDown();
    doc.end();

    return doc;
}

const generate_payment_PDF = (content, outputPath) => {
}

module.exports = {
    generate_bill_PDF,
    generate_payment_PDF,
};