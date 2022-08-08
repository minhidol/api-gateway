import {DocumentDefinition, FilterQuery} from 'mongoose';
import PaymentMethod, {PaymentMethodDocument} from '../model/paymentMethod.model';

export async function createPaymentMethod(input: DocumentDefinition<PaymentMethodDocument>){
    try {
        return await PaymentMethod.create(input);
    } catch (error) {
        throw error;
    }
}

export async function getPaymentMethod(query: FilterQuery<PaymentMethodDocument>){
    try {
       
        const listBill = await PaymentMethod.find({
            idDelete: 0
        });
        return listBill;
    } catch (error) {
        throw error;
    }
}

