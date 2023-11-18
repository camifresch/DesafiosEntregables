import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id: Number,
    title: { type: String, required: true, index: true },
    description: String,
    price: { type: Number, required: true },
    discountPercentage: Number,
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: String,
    category: String,
    thumbnail: String,
    images: [String]
});

export default mongoose.model('Product', ProductSchema)