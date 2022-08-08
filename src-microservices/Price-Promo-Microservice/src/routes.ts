import {Express, Request, Response} from "express";
import { createPromotionHandler,handleGetPromotionByProductType, 
    handleGetPromoByProduct, handleRemove, handleUpdate
    , handleGetListPromoByPaymentMethod, handleGetAllPromotion } from "./controller/promotion.controller";


export default function(app: Express) {
    app.get('/healthcheck', (req : Request, res : Response) => res.sendStatus(200));
    // create promotion
    // giam gia theo san pham, giam gia tat ca, giam gia mot vai
    // loai dth (nguoi dung truyen vao ten cua chuong
    // trinh km) sau do lay ds nhung sp dc giam gia? hoi lai
    app.post('/create-promotion', createPromotionHandler);
    // get promotion by type product, payment method ss %
    app.get('/get-promotion-by-type', handleGetPromotionByProductType);

    // gui cai tt tung san pham len, lay dc cai ten km luc do, xong gui len coi con hong, con thi thoi
    // hong thi search theo type product, search them product do co nam trong ds nhung product dang km k
    // roi lay cai lon nhat (chi lay theo %)
    app.get('/get-promotion-by-product', handleGetPromoByProduct);

    app.get('/get-all-promotion', handleGetAllPromotion);

    app.post('/update-promo', handleUpdate);
    
    app.post('/remove-promo', handleRemove);

    app.get('/get-promo-by-payment', handleGetListPromoByPaymentMethod);
  

}