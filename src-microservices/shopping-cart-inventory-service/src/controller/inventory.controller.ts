import {Request, Response} from 'express';
import {findAll, createInventory, checkInventory, updateInventory} from '../service/inventory.service';
import request from 'request';
import config from '../../config/env/index';
import client from '../logger/client';

function doRequest(url: any, header: object, bodyPost: object) {
    return new Promise(function (resolve, reject) {
      request(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(bodyPost)
      } ,function (error: any, res: any, body: string) {
        if (!error && res.statusCode == 200) {
            const res = JSON.parse(body);
          resolve(res);
        } else {
          reject(error);
        }
      });
    });
  }
  export async function handleUpdateInventory(req: Request, res: Response){
    try {
        const inventory = await updateInventory(req.body);
        client.LogInfo({
            msg: `[ms-cart-inventory]:update inventory ${req.body}`,
            level: 'info',
            topic: 'micro-service-cart-inventory'
        }, ()=>{

        });
             return res.json({ResponseResult: {
                ErrorCode: 0,
                Message: 'Thành công',
                Result: null
            }})
    } catch (error) {
        console.log('error: ', error);
        client.LogInfo({
            msg: `[ms-cart-inventory]:update inventory. ${error}`,
            level: 'error',
            topic: 'micro-service-cart-inventory'
        }, ()=>{

        });
        return res.json({
            ErrorCode: 0,
            Message: 'Error when update inventory',
            Result: null
    });
    }
}
export async function handleCheckInventory(req: Request, res: Response){
    try {
        const inventory = await checkInventory(req.body);
        client.LogInfo({
            msg: `[ms-cart-inventory]:check inventory ${req.body}`,
            level: 'info',
            topic: 'micro-service-cart-inventory'
        }, ()=>{

        });
             return res.json({ResponseResult: {
                ErrorCode: 400,
                Message: 'Sản phẩm không hợp lệ!',
                Result: inventory
            }})
    } catch (error) {
        console.log('error: ', error);
        client.LogInfo({
            msg: `[ms-cart-inventory]:check inventory ${req.body}`,
            level: 'error',
            topic: 'micro-service-cart-inventory'
        }, ()=>{

        });
        return res.json({
            ErrorCode: 0,
            Message: 'Error when get check inventory',
            Result: null
    });
    }
}

export async function handleGetAllInventory(req: Request, res: Response){
    try {
        const data = await findAll();
        client.LogInfo({
            msg: `[ms-cart-inventory]:get inventory ${data}`,
            level: 'info',
            topic: 'micro-service-cart-inventory'
        }, ()=>{

        });
        return res.json({
            ErrorCode: 0,
            Message: 'Thành công',
            Result: data
        });
    } catch (error) {
        console.log('error: ', error);
        client.LogInfo({
            msg: `[ms-cart-inventory]:get inventory ${error}`,
            level: 'error',
            topic: 'micro-service-cart-inventory'
        }, ()=>{

        });
        return res.json({
                ErrorCode: 400,
                Message: 'Error when get all inventory',
                Result: null
        });
    }
}

export async function handleCreateInventory(req: Request, res: Response){
    try {
        await createInventory(req.body);
        client.LogInfo({
            msg: `[ms-cart-inventory]:create inventory ${req.body}`,
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
        client.LogInfo({
            msg: `[ms-cart-inventory]:create inventory ${req.body}`,
            level: 'error',
            topic: 'micro-service-cart-inventory'
        }, ()=>{

        });
        console.log('error: ', error);
        return res.json({
            ErrorCode: 400,
            Message: 'Error when create inventory',
            Result: null
        });
    }
}