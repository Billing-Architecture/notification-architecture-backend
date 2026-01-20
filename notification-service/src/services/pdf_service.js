const PDFDocument = require("pdfkit");
const unique_code_generator = require("../utils/code_generator");

const generate_bill_PDF = (details) => { 
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];
        const today = new Date().toLocaleDateString("es-CR");

        doc
        .on("data", buffers.push.bind(buffers));
        doc
        .on("end", () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });
        doc.on("error", reject);

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
        .text(`Code: ${unique_code_generator("INV-")}`, { align: "right" });

        details.products.forEach(product => {
            doc
            .moveDown()
            .fontSize(12)
            .text(
                `${product.product_name}  ${product.product_quantity} x ${product.product_price} = ${product.product_subtotal}`
            );
        });

        doc
        .moveDown()
        .fontSize(14)
        .text(`Subtotal: ${details.subtotal}`, { align: "right" });

        doc
        .moveDown()
        .fontSize(14)
        .text(`Total: ${details.total}`, { align: "right" });

        doc.end();

        return doc;
    });
}

const generate_payment_PDF = (payment_details, bill_details) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc
        .on("data", buffers.push.bind(buffers));
        doc
        .on("end", () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });
        doc.on("error", reject);

        doc
        .fontSize(18)
        .text("Corporation Example", { align: "center" });

        doc
        .moveDown()
        .fontSize(14)
        .text(`Payment Date: ${payment_details.payment_created_at}`, { align: "right" });

        doc
        .moveDown()
        .fontSize(14)
        .text(`Invoice Code: ${bill_details.bill_code}`, { align: "right" });

        doc
        .moveDown()
        .fontSize(14)
        .text(`Payment Type: ${payment_details.payment_type}`, { align: "right" });

        doc
        .moveDown()
        .fontSize(14)
        .text(`Total Payment: ${payment_details.payment_total}`, { align: "right" });

        doc
        .moveDown()
        .fontSize(14)
        .text(`Total Invoice: ${bill_details.bill_total}`, { align: "right" });

        doc
        .moveDown()
        .fontSize(14)
        .text(`Total Paid: ${bill_details.bill_total_paid}`, { align: "right" });

        doc.end();

        return doc;
    });
}

module.exports = {
    generate_bill_PDF,
    generate_payment_PDF,
};