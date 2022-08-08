import mongoose from "mongoose";

export interface PromotionDocument extends mongoose.Document{
    name: String;
    discount: String;
    timeStart: Date;
    timeEnd: Date;
    expire: Boolean;
    productType: String;
    typeOfPaymentMethod: String;
    listProduct: Array<String>
}

const PromotionSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        discount: {type: String, required: true},
        timeStart: {type: Date, required: true},
        timeEnd: {type: Date, required: true},
        expire: {type: Boolean, required: true},
        productType: {type: String},
        typeOfPaymentMethod: {type: String},
        listProduct: {type: Array}
    }   
);

const Promotion = mongoose.model<PromotionDocument>('Promotion', PromotionSchema);

export default Promotion;

