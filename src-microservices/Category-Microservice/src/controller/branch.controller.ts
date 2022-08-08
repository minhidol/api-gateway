import {Request, Response} from 'express';
import {createBranch, getBranch, checkBranchValid, checkBranchCategoryValid} from '../service/branch.service';
import log from '../logger';
import client from '../logger/client';

export async function handleCheckBranchCategoryValid(req: Request, res: Response){
    try {
        const check = await checkBranchCategoryValid(req.body);
        client.LogInfo({
            msg: `[ms-category]:check branch. Error: ${check}`,
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
            msg: `[ms-category]:login. Error: ${e}`,
            level: 'error',
            topic: 'micro-service-category'
        }, ()=>{

        });
        return res.status(400).send('Error when get promotion by product type');
    }
}

export async function createBranchHandler(req:Request, res: Response) {
    try {
        if(req.body.category == ''){
            return res.json({
                ResponseResult: {
                    ErrorCode: 400,
                    Message:'Vui lòng nhập category',
                    Result: null
                }
            });
        }
        await createBranch(req.body);
        client.LogInfo({
            msg: `[ms-category]:create branch}`,
            level: 'info',
            topic: 'micro-service-category'
        }, ()=>{

        });
        return res.json({
            ResponseResult: {
                    ErrorCode: 0,
                    Message:'Thành công',
                    Result: null
                }
            });
    
        
    } catch (e) {
        log.error(e);
        console.log('error: ', e);
        client.LogInfo({
            msg: `[ms-category]:create branch. Error: ${e}`,
            level: 'error',
            topic: 'micro-service-category'
        }, ()=>{

        });
        return res.json({
            ResponseResult: {
                ErrorCode: 400,
                Message: 'Error when create branch',
                Result:null
            }
        });
    }
}


export async function handleGetBranch(req: Request, res: Response){
    try {
        const branch = await getBranch(req.body);
        client.LogInfo({
            msg: `[ms-category]:get branch. ${branch}`,
            level: 'info',
            topic: 'micro-service-category'
        }, ()=>{

        });
        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message: 'Thành công',
                Result: branch
            }
        });
    } catch (e) {
        log.error(e);
        client.LogInfo({
            msg: `[ms-category]:get branch. Error: ${e}`,
            level: 'error',
            topic: 'micro-service-category'
        }, ()=>{

        });
        return res.json({
            ResponseResult: {
                ErrorCode: 400,
                Message: 'Error when get branch',
                Result:null
            }
        });
    }
}

export async function handleCheckBranchyValid(req: Request, res: Response){
    try {
        const check = await checkBranchValid(req.body);
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
        return res.json({
            ResponseResult: {
                ErrorCode: 400,
                Message: 'Error when create branch',
                Result:null
            }
        });
    }
}
