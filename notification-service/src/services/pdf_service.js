const PDFDocument = require("pdfkit");

const generate_bill_PDF = (details) => { 
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => resolve(Buffer.concat(buffers)));
        doc.on("error", reject);

        doc
        .fontSize(12)
        .text("Anonymous company", { align: "center" })
        .moveDown(0.5);

        const y = doc.y;
        doc
        .fontSize(10)
        .text(`Invoice Code: ${details.bill_code}`, 50, y)
        .text(`Date of Issue: ${details.bill_issue_date}`, 0, y,  { align: "right" });

        doc.moveDown(1.5);

        const tableTop = doc.y;
        const colProduct = 50;
        const colQty = 250;
        const colPrice = 320;
        const colSubtotal = 420;

        doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text('Product', colProduct, tableTop)
        .text('Quantity', colQty, tableTop, { width: 50, align: 'right' })
        .text('Price', colPrice, tableTop, { width: 60, align: 'right' })
        .text('Total', colSubtotal, tableTop, { width: 70, align: 'right' });

        doc
        .moveTo(50, tableTop + 15)
        .lineTo(545, tableTop + 15)
        .stroke();

        doc.moveDown(1.5)

        doc.font("Helvetica");

        details.details.products.forEach(product => {
            const y = doc.y+5;

            if (y > doc.page.height - doc.page.margins.bottom - 20) {
                doc.addPage();
            }

            doc
            .fontSize(10)
            .text(product.product_name, colProduct, y)
            .text(product.product_quantity, colQty, y, { width: 50, align: 'right' })
            .text(product.product_price, colPrice, y, { width: 60, align: 'right' })
            .text(product.product_subtotal, colSubtotal, y, { width: 70, align: 'right' });

            doc.moveDown();
        });

        doc.moveDown(1.5);

        doc
        .font("Helvetica-Bold")
        .text(`Subtotal: ${details.details.subtotal}`, 0, doc.y, { align: "right" })
        .moveDown(0.5)
        .fontSize(12)
        .text(`Total: ${details.details.total}`, { align: "right" });

        doc.end();

        return doc;
    });
}

const generate_payment_PDF = (payment_details, bill_details) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => resolve(Buffer.concat(buffers)));
        doc.on("error", reject);

        doc
        .fontSize(12)
        .text("Anonymous company", { align: "center" })
        .moveDown(0.5);

        const y = doc.y;
        doc
        .fontSize(10)
        .text(`Invoice Code: ${bill_details.bill_code}`, 50, y)
        .text(`Date of Issue: ${payment_details.payment_created_at}`, 0, y,  { align: "right" });

        doc
        .moveDown()
        .fontSize(12)
        .text(`Payment Type:  ${payment_details.payment_type}`, { align: "center" });

        doc
        .moveDown()
        .fontSize(12)
        .text(`Total Invoice:  ${bill_details.bill_total}`, { align: "center" });

        doc
        .moveDown()
        .fontSize(12)
        .text(`Total Paid:  ${payment_details.payment_total}`, { align: "center" });

        doc
        .moveDown()
        .fontSize(12)
        .text(`Total Payment:  ${bill_details.bill_total_paid}`, { align: "center" });

        doc
        .moveTo(50, y + 15)
        .lineTo(545, y + 15)
        .stroke();

        doc
        .moveDown()
        .fontSize(15)
        .text(`Total Remaining:  ${bill_details.bill_to_pay}`, { align: "center" });

        doc.end();

        return doc;
    });
}

module.exports = {
    generate_bill_PDF,
    generate_payment_PDF,
};