import {Express, Request, Response} from "express";
import { createBillHandler, handleGetBill} from "./controller/bill.controller";
import {handleCreatePaymentMethod, handleGetPaymentMethod} from './controller/paymentMethod.controller';


export default function(app: Express) {
  
   
    app.get('/get-payment', handleGetPaymentMethod);
    app.post('/create-payment', handleCreatePaymentMethod);
    app.post('/create-bill', createBillHandler);
    app.get('/get-bill', handleGetBill);
  

}