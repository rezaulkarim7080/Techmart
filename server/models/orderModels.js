import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.ObjectId,
                ref: "Product",
            },
        ],
        payment: {},
        buyer: {
            type: mongoose.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            default: "Not Process",
            enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    });

const Order = mongoose.model('Order', orderSchema);

export default Order;
