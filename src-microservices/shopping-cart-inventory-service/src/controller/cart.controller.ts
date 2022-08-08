import {Request, Response} from 'express';
import {createCart, getCartByAccount, removeCart} from '../service/cart.service';
import {removeItemFromCart, } from '../service/cart_item.service';
import request from 'request';
import config from '../../config/env/index';
import client from '../logger/client';




function doRequest(url: any, header: object) {
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

export async function handleRemoveItem(req: Request, res: Response){
    try{
        const jwt = req.headers['userjwt'] as string;
	    const jsonJwt = JSON.parse(jwt);
        await removeItemFromCart({
            idProduct: req.body.id_product,
            idCart: req.body.id_cart
        })
        if(req.body.is_final == 1)
            await removeCart({
                username: jsonJwt.username
            });
        return res.json({
            ErrorCode: 0,
            Message: 'Thành công',
            Result: null
    });
    }catch (error) {
        console.log('error: ', error);
        return res.json({
                ErrorCode: 400,
                Message: 'Error when remove item',
                Result: null
        });
    }
}

export async function handleGetCartByAccount(req: Request, res: Response){
    try {
        const jwt = req.headers['userjwt'] as string;
	    const jsonJwt = JSON.parse(jwt);
        const data = await getCartByAccount({username: jsonJwt.username});
        if(data == null)
            return res.json({
                ErrorCode: 0,
                Message: 'Thành công',
                Result: null
            });
        const listItem = data.listItem;
        const listRes: Array<Object> = [];
        var resProduct:any = {};
       
        resProduct = await doRequest(`${config.index.url_product}/get-all-product`, {
            Authorization: req.headers['authorization'],
            'Content-Type': 'application/json'
        }) as Object;
        const listProduct = resProduct.ResponseResult.Result;
       
        let count = listProduct.length;
        for(let i = 0; i < listItem.length; i++){
            for(let k = 0; k < count; k++){
                if(listItem[i].idProduct == listProduct[k].id){
                    let itemProduct = {
                        id: listProduct[k].id,
                        name: listProduct[k].name,
                        description: listProduct[k].description,
                        price: listProduct[k].price,
                        numberOfReviews: listProduct[k].numberOfReviews,
                        quantitySold: listProduct[k].quantitySold,
                        category: listProduct[k].category,
                        branch: listProduct[k].branch,
                        numberStar: listProduct[k].numberStar,
                        linkPath: listProduct[k].listImage,
                        nameDiscount: listProduct[k].nameDiscount,
                        discount: listProduct[k].discount,
                        timeStart: listProduct[k].timeStart,
                        timeEnd: listProduct[k].timeEnd,
                        amount: listProduct[k].amount ?? 0,
                        quantityCart: listItem[i].quantity
                      };
                    listRes.push(itemProduct)
                }
            }
        }
        client.LogInfo({
            msg: `[ms-cart-inventory]:get cart. ${listRes}`,
            level: 'info',
            topic: 'micro-service-cart-inventory'
        }, ()=>{

        });
        return res.json({
            ErrorCode: 0,
            Message: 'Thành công',
            Result: {
                idCart: data.idCart,
                listItem: listRes
            }
        });
    } catch (error) {
        client.LogInfo({
            msg: `[ms-cart-inventory]:get cart. ${error}`,
            level: 'error',
            topic: 'micro-service-cart-inventory'
        }, ()=>{

        });
        console.log('error: ', error);
        return res.json({
                ErrorCode: 400,
                Message: 'Error when get cart by account',
                Result: null
        });
    }
}

export async function handleCreateCart(req: Request, res: Response){
    try {
        const jwt = req.headers['userjwt'] as string;
	    const jsonJwt = JSON.parse(jwt);
        const input = {
            username: jsonJwt.username,
            id_product: req.body.id_product,
            amount: req.body.amount,
            is_update: req.body.is_update
        };
        await createCart(input);
        client.LogInfo({
            msg: `[ms-cart-inventory]:create cart. ${input}`,
            level: 'info',
            topic: 'micro-service-cart-inventory'
        }, ()=>{

        });
        return res.json({
            ErrorCode: 0,
            Message: 'Thành công',
            Result: null
        });
    } catch (error) {
        console.log('error: ', error);
        client.LogInfo({
            msg: `[ms-cart-inventory]:create cart. ${error}`,
            level: 'error',
            topic: 'micro-service-cart-inventory'
        }, ()=>{

        });
        return res.json({
            ErrorCode: 0,
            Message: 'Error when create cart',
            Result: null
        });
    }
}