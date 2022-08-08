import {Request, Response} from 'express';
import {createCategory, getCategory, getCategoryByBranch, checkCategoryValid, getCategoryByCountProduct} from '../service/category.service';
import log from '../logger';
import client from '../logger/client';

export async function handleGetCategoryForHomePage(req: Request, res: Response){
    try {
        const result = await getCategoryByCountProduct();

        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message:'Thành công',
                Result: result
            }
        });
    } catch (error) {
        console.log('error: ', error);
        return res.json({
            ResponseResult: {
                ErrorCode: 400,
                Message:'error when get category',
                Result: null
            }
        });
    }
}

export async function createCategoryHandler(req:Request, res: Response) {
    try {
        if(req.body.category == ''){
            return res.json({
                ResponseResult: {
                    ErrorCode: 400,
                    Message:'Vui lòng nhập category detail',
                    Result: null
                }
            });
        }
        client.LogInfo({
            msg: `[ms-category]:create category. `,
            level: 'info',
            topic: 'micro-service-category'
        }, ()=>{

        });
        await createCategory(req.body);
        return res.json({
            ResponseResult: {
                    ErrorCode: 0,
                    Message:'Thành công',
                    Result: null
                }
            });
    
        
    } catch (e) {
        log.error(e);
        client.LogInfo({
            msg: `[ms-category]:error category. ${e}`,
            level: 'error',
            topic: 'micro-service-category'
        }, ()=>{

        });
        return res.status(400).send('Error when create category');
    }
}

export async function getAllCategoryHandler(req:Request, res: Response) {
    try {
        const category = await getCategory();
        client.LogInfo({
            msg: `[ms-category]:get all category. ${category}`,
            level: 'info',
            topic: 'micro-service-category'
        }, ()=>{

        });
        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message:'Thành công',
                Result: category 
            }
        });
    } catch (e) {
        log.error(e);
        client.LogInfo({
            msg: `[ms-category]:get all category. ${e}`,
            level: 'error',
            topic: 'micro-service-category'
        }, ()=>{

        });
        return res.status(400).send('Error when get category');
    }
}

export async function getCategoryByBranchHandler(req:Request, res: Response) {
    try {
        const category = await getCategoryByBranch(req.query);
        
        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message:'Thành công',
                Result: category
            }
        });
    } catch (e) {
        log.error(e);
        return res.status(400).send('Error when get category');
    }
}

export async function handleCheckCategoryValid(req: Request, res: Response){
    try {
        const check = await checkCategoryValid(req.body);
        client.LogInfo({
            msg: `[ms-category]:check category. ${check}`,
            level: 'info',
            topic: 'micro-service-category'
        }, ()=>{

        });
        if(check){
            return res.json({
                ResponseResult: {
                    ErrorCode: 0,
                    Message: 'Thành công',
                    Result: {
                        check: true
                    }
                }
            });
        }else{
            return res.json({
                ResponseResult: {
                    ErrorCode: 0,
                    Message: 'Thành công',
                    Result: {
                        check: false
                    }
                }
            });
        }
        
    } catch (e) {
        log.error(e);
        client.LogInfo({
            msg: `[ms-category]:check category. ${e}`,
            level: 'error',
            topic: 'micro-service-category'
        }, ()=>{

        });
        return res.status(400).send('Error when get promotion by product type');
    }
}

