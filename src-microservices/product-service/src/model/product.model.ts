import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document{
    name: String,
    description: String,
    price: String,
    listImage: [
        {
            filename: String,
        }
    ],
    linkPath: String [],
    numberOfReviews: Number;
    quantitySold: Number;
    category: String,
    categoryDetail: String,
    branch: String,
    numberStar: Number,
    comment: any[],
    createdBy: String,
    createdDate: Date,
    updatedBy: String,
    updatedDate: Date,
    isDelete: Boolean,
    length: Number,
    amount: Number
}

const ProductSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        description: {type: String, default: null},
        price: {type: String, required: true},
        listImage: {type: Array, default: []},
        numberOfReviews: {type: Number, default: 0},
        quantitySold: {type: Number, default: 0},
        category: {type: String, required: true},
        categoryDetail: {type: String, default: null},
        branch: {type: String, default: null},
        numberStar: {type: Number, default: 0},
        comment: {type: Array, default: []},
        createdBy: {type: String, default: ''},
        createdDate: {type: Date, default: Date.now()},
        updatedBy: {type: String, default: ''},
        updatedDate: {type: Date, default: Date.now()},
        isDelete: {type: Boolean, default: false}
    }   
);

const Product = mongoose.model<ProductDocument>('products', ProductSchema);

export default Product;

