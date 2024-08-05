import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: { type: String, required: true },
    price: { type: Number, required: true },
    ean: { type: String},
    image: { type: String, default: 'no_image.jpg'}

});

export interface IProduct extends mongoose.Document {
    name: string,
    description: string,
    price: number,
    ean?: string,
    image?: string
}

export default mongoose.model<IProduct>("Product", ProductSchema);
