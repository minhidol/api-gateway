import {Request, Response} from 'express';
import {createPaymentMethod, getPaymentMethod} from '../service/paymentMethod.service';
import log from '../logger';
import client from '../logger/client';
export async function handleCreatePaymentMethod(req:Request, res: Response) {
    try {
        const payment = await createPaymentMethod(req.body);
        client.LogInfo({
            msg: `[ms-payment]:create payment: ${payment}`,
            level: 'error',
            topic: 'micro-service-payment'
        }, ()=>{

        });
        return res.json({ResponseResult: {
            ErrorCode: 0,
            Message: 'Thành công',
            Result: null
        }});
    } catch (e: any) {
        log.error(e);
        client.LogInfo({
            msg: `[ms-payment]:create payment. Error: ${e}`,
            level: 'error',
            topic: 'micro-service-payment'
        }, ()=>{

        });
        return res.json({ResponseResult: {
            ErrorCode: 400,
            Message: e.Message(),
            Result: null
        }});
    }
}

export async function handleGetPaymentMethod(req: Request, res: Response){
    try {
        const lstPayment = await getPaymentMethod(req.query);
        client.LogInfo({
            msg: `[ms-payment]:get payment: ${lstPayment}`,
            level: 'error',
            topic: 'micro-service-payment'
        }, ()=>{

        });
        return res.json({ResponseResult:{
            ErrorCode: 0,
            Message: 'Thành công',
            Result: lstPayment
        }});
    } catch (e) {
        log.error(e);
        client.LogInfo({
            msg: `[ms-payment]:get payment. Error: ${e}`,
            level: 'error',
            topic: 'micro-service-payment'
        }, ()=>{

        });
        return res.status(400).send('Error when get payment');
    }
}

