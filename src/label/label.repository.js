let prisma = require("../db");
let QRCode = require("qrcode");

async function createLabel(order, product) {
  let qrCode = await QRCode.toString(`https://supply-chain-frontend-seven.vercel.app/supplier/order/${order.order_id}`);
  try {
    await prisma.label.create({
      data: {
        order_id: parseInt(order.order_id),
        description: `Product Name: ${product.product_name}, Quantity: ${order.quantity}, Total: ${order.total}, Take at: ${order.updated_at}`,
        qr_code: qrCode,
      },
    });
  } catch (error) {
    throw new Error("Failed to create label");
  }
}

async function findLabelById(label_id) {
  try {
    let label = await prisma.label.findUnique({
      where: {
        label_id: parseInt(label_id),
      },
    });
    return label;
  } catch (error) {
    throw new Error("Failed to create label");
  }
}
module.exports = { createLabel, findLabelById };
