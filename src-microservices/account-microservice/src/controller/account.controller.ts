
import {query, Request, Response} from 'express';
import {createUser, getAllUser, getUserByUsername, updateRefreshToken} from '../service/account.service';
import {generateToken, verifyToken} from '../helpers/jwt';
import config from '../../config/default';
import log from '../logger';
import client from '../logger/client';
//import {IGetUserAuthInfoRequest} from '../types/IGetUserAuthInfoRequest';
const randToken = require('rand-token');

const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function createHandleUser(req:Request, res: Response) {
    try {

        if(req.body.username == '' || req.body.password == ''){
            return res.json({
                ResponseResult: {
                    ErrorCode: 400,
                    Message:'Vui lòng nhập username hoac password',
                    Result: null
                }
            });
        }
        bcrypt.hash(req.body.password, saltRounds, async function(err:any, hash: String) {
            try {
                const user = {
                    username: req.body.username,
                    password: hash,
                    role: req.body.role,
                    address: req.body.address,
                    full_name: req.body.full_name,
                    age: req.body.age
                };
                await createUser(user);
                client.LogInfo({
                    msg: `[ms-account]:create user.`,
                    level: 'info',
                    topic: 'micro-service-account'
                }, ()=>{
        
                });
                return res.json({
                    ResponseResult: {
                        ErrorCode: 0,
                        Message:'Thành công',
                        Result: null
                    }
                });
            } catch (error) {
                return res.status(400).send('Error when create user');
            }
        });
    } catch (e) {
        log.error(e);
        console.log('error: ', e);
        client.LogInfo({
            msg: `[ms-account]:create user. Error: ${e}`,
            level: 'error',
            topic: 'micro-service-account'
        }, ()=>{

        });
        return res.status(400).send('Error when create user');
    }
}

export async function handleGetAll(req: Request, res: Response){
    try {
        const listUser = await getAllUser();
        return res.json({
            ResponseResult: {
                ErrorCode: 0,
                Message:'Thành công',
                Result: listUser 
            }
        });
    } catch (error) {
        log.error(error);
        return res.status(400).send('Error when get user');

    }
}

export async function handleLogin(req: Request, res: Response){
    try {
        const queryUser = {
            username: req.body.username,
            is_delete: false
        };
        const user = await getUserByUsername(queryUser);
        let password: String = '';
        if(user != null){
            password = user.password;
        }else{
            return res.json({
                ResponseResult: {
                    ErrorCode: 0,
                    Message:'Username hoặc Password không hợp lệ',
                    Result: null
                }
            });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, password);

        if(!isPasswordValid){
            return res.json({
                ResponseResult: {
                    ErrorCode: 0,
                    Message:'Username hoặc Password không hợp lệ',
                    Result: null
                }
            });
        }
        const payload = {
                username: user.username,
                full_name: user.full_name,
                age: user.age,
                role: user.role,
                address: user.address
        };
        const access_token = await generateToken(payload, config.ACCESS_TOKEN_SECRET, config.ACCESS_TOKEN_LIFE);
        if(!access_token){
            return res.json({
                ResponseResult: {
                    ErrorCode: 0,
                    Message:'Đăng nhập không thành công, vui lòng thử lại.',
                    Result: null
                }
            });
        }
        let refresh_token = randToken.generate(50);
   
        if (!user.refresh_token) {
            const refresh_token_input = {
                username: user.username,
                refresh_token: refresh_token
            };
            await updateRefreshToken(refresh_token_input);
        } else {
            refresh_token = user.refresh_token;
        }
        client.LogInfo({
            msg: `[ms-account]:login. `,
            level: 'info',
            topic: 'micro-service-account'
        }, ()=>{

        });
            return res.json({
                ResponseResult: {
                    ErrorCode: 0,
                    Message:'Thành công',
                    Result: {
                        accessToken: access_token,
                        refreshToken: refresh_token,
                        username: user.username,
                        role: user.role,
                        address: user.address,
                        full_name: user.full_name,
                        age: user.age
                    }
                }
            });
        
    } catch (error) {
        log.error(error);
        console.log('error: ', error);
        client.LogInfo({
            msg: `[ms-account]:login. Error: ${error}`,
            level: 'error',
            topic: 'micro-service-account'
        }, ()=>{

        });
        return res.status(400).send('Error when get user');

    }
}

// export async function refreshToken(req: Request, res: Response) {
// 	// Lấy access token từ header
// 	const accessTokenFromHeader = req.headers.x_authorization;
// 	if (!accessTokenFromHeader) {
// 		return res.status(400).send('Không tìm thấy access token.');
// 	}

// 	// Lấy refresh token từ body
// 	const refreshTokenFromBody = req.body.refreshToken;
// 	if (!refreshTokenFromBody) {
// 		return res.status(400).send('Không tìm thấy refresh token.');
// 	}

// 	const accessTokenSecret =
// 		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
// 	const accessTokenLife =
// 		process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

// 	// Decode access token đó
// 	const decoded = await authMethod.decodeToken(
// 		accessTokenFromHeader,
// 		accessTokenSecret,
// 	);
// 	if (!decoded) {
// 		return res.status(400).send('Access token không hợp lệ.');
// 	}

// 	const username = decoded.payload.username; // Lấy username từ payload

// 	const user = await userModel.getUser(username);
// 	if (!user) {
// 		return res.status(401).send('User không tồn tại.');
// 	}

// 	if (refreshTokenFromBody !== user.refreshToken) {
// 		return res.status(400).send('Refresh token không hợp lệ.');
// 	}

// 	// Tạo access token mới
// 	const dataForAccessToken = {
// 		username,
// 	};

// 	const accessToken = await authMethod.generateToken(
// 		dataForAccessToken,
// 		accessTokenSecret,
// 		accessTokenLife,
// 	);
// 	if (!accessToken) {
// 		return res
// 			.status(400)
// 			.send('Tạo access token không thành công, vui lòng thử lại.');
// 	}
// 	return res.json({
// 		accessToken,
// 	});
// };