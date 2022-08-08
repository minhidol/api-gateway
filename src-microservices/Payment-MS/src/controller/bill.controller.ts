import {Request, Response} from 'express';
import {createBill, getBill} from '../service/bill.service';
import config from '../../config/env/index';
import request from 'request';
import log from '../logger';
import client from '../logger/client';

export async function handleGetBill(req: Request, res: Response){
    try {
        const listBill = await getBill(req.query);
        client.LogInfo({
            msg: `[ms-payment]:get bill: ${listBill}`,
            level: 'error',
            topic: 'micro-service-payment'
        }, ()=>{

        });
        return res.json({ResponseResult:{
            ErrorCode: 0,
            Message: 'Thành công',
            Result: listBill
        }});
    } catch (error) {
        log.error(error);
        client.LogInfo({
            msg: `[ms-payment]:get bill. Error: ${error}`,
            level: 'error',
            topic: 'micro-service-payment'
        }, ()=>{

        });
        return res.json({ResponseResult:{
            ErrorCode: 400,
            Message: 'Error when get bill',
            Result: null
        }});
    }
}

function doRequest(url: any, header: object, bodyPost: object) {
    return new Promise(function (resolve, reject) {
      request(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(bodyPost)
      }, function (error: any, res: any, body: string) {
        if (!error && res.statusCode == 200) {
            console.log('res: ', body);
            const res = JSON.parse(body);
          resolve(res);
        } else {
          reject(error);
        }
      });
    });
  }



export async function createBillHandler(req:Request, res: Response) {
    try {
        client.LogInfo({
            msg: '[ms-payment]: create bill',
            level: 'info',
            topic: 'micro-service-payment'
        }, ()=>{

        });
        const user = JSON.parse(req.headers['userjwt'] as string);
        const info_bill = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            address_line_1: req.body.address_line_1,
            address_line_2: req.body.address_line_2,
            mobile_no: req.body.mobile_no,

        };
        const body = {
            username: user.username,
            infoCustomer: user,
            listBill: req.body.list_item,
            total: req.body.total,
            status: 0,
            typeOfPaymentMethod: req.body.payment,
            info_bill: info_bill,
        };
        var checkInventory:any = {};
       
        checkInventory = await doRequest(`${config.index.url_cart_inventory}/check-inventory`, {
            Authorization: req.headers['authorization'],
            'Content-Type': 'application/json',
        }, {
            list_item: req.body.list_item
        }) as Object;

        const listProduct = checkInventory.ResponseResult.Result;
        if(listProduct.length != 0){
             return res.json({ResponseResult:{
            ErrorCode: 400,
            Message: 'Các sản phẩm sau không còn hàng!',
            Result: listProduct
        }});
        }
        await createBill(body);
        var updateInventory:any = {};
       
        updateInventory = await doRequest(`${config.index.url_cart_inventory}/update-inventory`, {
            Authorization: req.headers['authorization'],
            'Content-Type': 'application/json',
        }, {
            list_item: req.body.list_item,
            username: user.username
        }) as Object;

        console.log('update inventory: ', updateInventory);
        //const listProduct = checkInventory.ResponseResult.Result;
        return res.json({ResponseResult:{
            ErrorCode: 0,
            Message: 'Thành công',
            Result: null
        }});
    } catch (e) {
        log.error(e);
        client.LogInfo({
            msg: `[ms-payment]: create bill. Error: ${e}`,
            level: 'error',
            topic: 'micro-service-payment'
        }, ()=>{

        });
        return res.json({ResponseResult:{
            ErrorCode: 400,
            Message: 'Error when get bill',
            Result: null
        }});
    }
}

