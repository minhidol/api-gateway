import mongoose from "mongoose";

export interface PaymentMethodDocument extends mongoose.Document{
  idPayment: Number,
  typeOfPaymentMethod: String,
  isDelete: Number
}

const PaymentSchema = new mongoose.Schema(
    {
        idPayment: {type: String, default: null},
        typeOfPaymentMethod: {type: String, required: true, unique: true},
        idDelete: {type: Number, default: 0}
       
    }   
);

const PaymentMethod = mongoose.model<PaymentMethodDocument>('PaymentMethod', PaymentSchema);

export default PaymentMethod;

