import {DocumentDefinition, FilterQuery} from 'mongoose';
import Promotion, {PromotionDocument} from './../model/promotion.model';

export async function createPromotion(input: DocumentDefinition<PromotionDocument>){
    try {
        return await Promotion.create(input);
    } catch (error) {
        throw error;
    }
}

export async function getPromotionByTypeProduct(query: FilterQuery<PromotionDocument>){
    try {
        query.expire = true;
        const listPromotion = await Promotion.findOne(query).sort("-discount");
        return listPromotion;
    } catch (error) {
        throw error;
    }
}

export async function getPromotionByProduct(query: FilterQuery<PromotionDocument>){
    try {
        const promoByProduct = await Promotion.findOne({
            listProduct: query.productId,
            expire: true
        }).sort("-discount").exec();

        const promoByType = await Promotion.findOne({
            productType: query.productType,
            expire: true
        }).sort("-discount").exec();

        if(!promoByProduct && promoByType)
            return promoByType
        if(promoByProduct && !promoByType)
            return promoByProduct
        if((promoByProduct != null && promoByType != null) && promoByProduct.discount > promoByType.discount)
            return promoByProduct;
        else
            return promoByType;

    } catch (error) {
        throw error;
    }
}

export async function updateProduct(input: DocumentDefinition<PromotionDocument>){
    try {
        const updatePromotion = await Promotion.updateOne({
            name: input.name,
            expire: true
        }, input);
        return updatePromotion;
    } catch (error) {
        throw error;
    }
}

export async function removeProduct(input: DocumentDefinition<PromotionDocument>){
    try {
        const updatePromotion = await Promotion.updateOne({
            name: input.name,
            expire: true
        }, {
            expire: false
        });
        return updatePromotion;
    } catch (error) {
        throw error;
    }
}

export async function getAllPromotion(){
    try {
        const listPromotion = await Promotion.find({
            expire: true
        }).sort("-discount").exec();
        return listPromotion;
    } catch (error) {
        throw error;
    }
}

export async function getListPromoByMethodPayment(input: Array<String>){
    try {
        console.log('input: ', input);
        const lstResult = [];
        for(var i = 0; i < input.length; i++){
            const promo = await Promotion.findOne({
                typeOfPaymentMethod: input[i],
                expire: true
            }).sort("-discount").lean();
            if(promo){
                lstResult.push({
                    paymentMethod: input[i],
                    name: promo.name,
                    discount: promo.discount 
                })
            } else{
                lstResult.push({
                    paymentMethod: input[i],
                    name: null,
                    discount: null 
                })
            }
        }
        return lstResult;

    } catch (error) {
        throw error;
    }
}
