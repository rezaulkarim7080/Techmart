import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.ObjectId,
        ref: "Category",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    shipping: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
)



const Product = mongoose.model('Product', productSchema);

export default Product;