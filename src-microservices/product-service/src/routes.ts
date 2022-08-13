import express, {Express, Request, Response} from "express";
import { createProductHandler, handleGetAllProduct, handleCreateProduct, handleGetCountProduct,
handleGetProductForCart, handleRemove} from "./controller/product.controller";
import multer from 'multer';
import {isAdmin} from './middleware/auth.middleware';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    
    filename: function (req: any, file: any, cb: any) {
        console.log('filename')
        cb(null, file.originalname.split('.')[0] + Date.now() + '.jpeg')
    }
});

const fileFilter = (req: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
}}

const upload = multer({storage: storage, fileFilter : fileFilter});

router.post('/create-product-test', upload.array('listImage', 2), handleCreateProduct);
router.get('/get-count-product-by-category', handleGetCountProduct);
router.post('/create-product', isAdmin, upload.array('listImage', 2), createProductHandler);
router.get('/get-all-product', handleGetAllProduct);
router.get('/get-list-product-for-cat', handleGetProductForCart);
router.get('/remove-product', handleRemove);
export {router as ProductRoutes}