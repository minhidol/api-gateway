import { Request, Response } from 'express';
import {
    createProduct, getAllProduct, getCountListProductByCategory,
    getAllProductForCart, removeProduct
} from '../service/product.service';
import request from 'request';
import log from '../logger';
import client from '../logger/client';
import config from '../../config/env/index';

export async function handleRemove(req: Request, res: Response) {
    try {
        const listProduct = await removeProduct();
        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message: 'Thành công',
                Result: listProduct
            }
        });
    } catch (error) {
        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message: 'Error when create product',
                Result: error
            }
        });
    }
}

export async function handleGetProductForCart(req: Request, res: Response) {
    try {
        const listProduct = await getAllProductForCart();
        client.LogInfo({
            msg: `[ms-product]: Get product for cart: ${listProduct}`,
            level: 'info',
            topic: 'micro-service-product'
        }, ()=>{

        });
        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message: 'Thành công',
                Result: listProduct
            }
        });
    } catch (error) {
        client.LogInfo({
            msg: `[ms-product]: get product for cat. Error: ${error}`,
            level: 'error',
            topic: 'micro-service-product'
        }, ()=>{

        });
        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message: 'Error when create product',
                Result: error
            }
        });
    }
}

export async function handleCreateProduct(req: Request, res: Response) {
    try {

        const inputProduct = { ...req.body };
        inputProduct.listImage = req.files;
        await createProduct(inputProduct);
        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message: 'Thành công',
                Result: null
            }
        });
    } catch (error) {
        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message: 'Error when create product',
                Result: error
            }
        });
    }
}


export async function createProductHandler(req: Request, res: Response) {
    try {
        const body = req.body;
        request(`${config.index.url_category}/check-branch-valid`, {
            method: 'POST',
            body: {
                category: body.category,
                branch: body.branch,
            },
            headers: {
                Authorization: req.headers['authorization'],
                'Content-Type': 'application/json',

            },
            json: true
        }, async function (error, response) {
            if (response) {
                try {
                    const result = response.body.ResponseResult.Result.check;
                    if (result == false) {
                        
                        return res.json({
                            ResponseResult: {
                                ErrorCode: 401,
                                Message: 'Category hoặc Branch không hợp lệ',
                                Result: null
                            }
                        });
                    } else {
                        try {
                            const inputProduct = { ...req.body };
                            inputProduct.listImage = req.files;
                            console.log('input product: ', inputProduct);
                            const product = await createProduct(inputProduct);
                            request(`${config.index.url_cart_inventory}/create-inventory`, {
                                method: 'POST',
                                body: {
                                    id_product: product._id.toString(),
                                    amount: req.body.amount,
                                    category_product: product.category,
                                    branch_product: product.branch,
                                    name_product: product.name
                                },
                                headers: {
                                    Authorization: req.headers['authorization'],
                                    'Content-Type': 'application/json'
                                },
                                json: true
                            }, function(err, resInventory){
                                if(err){
                                    console.log('err: ', err);
                                    return res.json({
                                        ResponseResult: {
                                            ErrorCode: 0,
                                            Message: 'Error when create inventory',
                                            Result: err
                                        }
                                    });
                                }

                            });
                            return res.json({
                                ResponseResult: {
                                    ErrorCode: 0,
                                    Message: 'Thành công',
                                    Result: null
                                }
                            });
                        } catch (error) {
                            console.log('error: ', error);
                            return res.json({
                                ResponseResult: {
                                    ErrorCode: 401,
                                    Message: 'Error when create product',
                                    Result: null
                                }
                            });
                        }

                    }
                } catch (err) {
                    console.log("Fail while parse json: " + err);
                    return res.json({
                        ResponseResult: {
                            ErrorCode: 401,
                            Message: 'Error when check branch',
                            Result: null
                        }
                    });
                }
            }
        });
    } catch (e) {
        log.error(e);
        client.logInfo({
            msg: `[ms-product]: create product ${e}`,
            level: 'error',
            topic: 'micro-service-product'
        }, ()=>{

        });
        return res.json({
            ResponseResult: {
                ErrorCode: 401,
                Message: 'Error when create product',
                Result: null
            }
        });
    }
}



export async function handleGetCountProduct(req: Request, res: Response) {
    try {
        const body = req.body;
        const count = await getCountListProductByCategory(body);
        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message: 'Thành công',
                Result: count
            }
        });
    } catch (error) {
        log.error(error);
        client.logInfo({
            msg: `[ms-product]: Get count product ${error}`,
            level: 'error',
            topic: 'micro-service-product'
        }, ()=>{

        });
        return res.json({
            ResponseResult: {
                ErrorCode: 401,
                Message: 'Error when create product',
                Result: null
            }
        });
    }
}

function doRequest(url: any, header: any) {
    return new Promise(function (resolve, reject) {
        request(url, {
            headers: header
        }, function (error: any, res: any, body: string) {
            if (!error && res.statusCode == 200) {
                const res = JSON.parse(body);
                resolve(res);
            } else {
                reject(error);
            }
        });
    });
}

export async function handleGetAllProduct(req: Request, res: Response) {
    try {
        client.LogInfo({
            msg: '[ms-product]: Get all product',
            level: 'info',
            topic: 'micro-service-product'
        }, ()=>{

        });
    const jwt = req.headers['userjwt'] as string;
    console.log('jwt: ', jwt);
	    const jsonJwt = JSON.parse(jwt);
        const listProduct = await getAllProduct(jsonJwt);

        const listRes: Array<Object> = [];
        let count = listProduct.length;
        var resInventory:any = {};
        let resultInventory: Array<any> = [];
        if(jsonJwt != null && jsonJwt.role == 'admin'){
            resInventory = await doRequest(`${config.index.url_cart_inventory}/get-all-inventory`,
            {
                Authorization: req.headers['authorization'],
                'Content-Type': 'application/json'
            }) as Object;
            resultInventory = resInventory.Result
        }
        
        //console.log('res: ', resultInventory);
        for (let i = 0; i < count; i++) {
            let listPath: Array<String> = [];
            var countItem = listProduct[i].listImage.length;
            for (let j = 0; j < countItem; j++) {
                listPath.push(`172.16.0.90:3333/product/upload/${listProduct[i].listImage[j].filename}`);
            }
            var resPromo: any = {};
            resPromo = await doRequest(`${config.index.url_price_promo}/get-promotion-by-product?productId=${listProduct[i]._id}&productType=${listProduct[i].branch}`,
                {
                    Authorization: req.headers['authorization'],
                    'Content-Type': 'application/json'
                }) as Object;
            let result = resPromo.Result;
            if(jsonJwt != null && jsonJwt.role == 'admin'){
            for(let k = 0; k < resultInventory.length; k++){
              if(listProduct[i]._id == resultInventory[k].idProduct){
                listProduct[i].amount = resultInventory[k].amount
              }
            }}
            if(jsonJwt != null && jsonJwt.role == 'admin'){
              let itemProduct = {
                id: listProduct[i]._id,
                name: listProduct[i].name,
                description: listProduct[i].description,
                price: listProduct[i].price,
                numberOfReviews: listProduct[i].numberOfReviews,
                quantitySold: listProduct[i].quantitySold,
                category: listProduct[i].category,
                branch: listProduct[i].branch,
                numberStar: listProduct[i].numberStar,
                linkPath: listPath,
                nameDiscount: result != null ? result.name : '',
                discount: result != null ? result.discount : '',
                timeStart: result != null ? result.timeStart : '',
                timeEnd: result != null ? result.timeEnd : '',
                amount: listProduct[i].amount ?? 0
              };
          listRes.push(itemProduct);
        }else{
          let itemProduct = {
            id: listProduct[i]._id,
            name: listProduct[i].name,
            description: listProduct[i].description,
            price: listProduct[i].price,
            numberOfReviews: listProduct[i].numberOfReviews,
            quantitySold: listProduct[i].quantitySold,
            category: listProduct[i].category,
            branch: listProduct[i].branch,
            numberStar: listProduct[i].numberStar,
            linkPath: listPath,
            nameDiscount: result != null ? result.name : '',
            discount: result != null ? result.discount : '',
            timeStart: result != null ? result.timeStart : '',
            timeEnd: result != null ? result.timeEnd : ''
          };
          listRes.push(itemProduct);
      }
    }
        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message: 'Thành công',
                Result: listRes
            }
        });
     }catch (e) {
        log.error(e);
        console.log('error: ', e)
        client.logInfo({
            msg: `[ms-product]: Get all product ${e}`,
            level: 'error',
            topic: 'micro-service-product'
        }, ()=>{

        });
        return res.status(400).send('Error when get all product');
    }
}

