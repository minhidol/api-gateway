import { NextFunction, Request, Response } from 'express';
import {rsErrorPermission} from '../helpers/respone';
export function aMiddleware(req: Request, res: Response, next: NextFunction) {
    next();
}
export function isAdmin (req: Request, res: Response, next: NextFunction) {
	
	const jwt = req.headers['userjwt'] as string;
	const jsonJwt = JSON.parse(jwt);
	if(jsonJwt.role == 'admin')
		next()
	else{
		return res.json({ ErrorCode: 400, Message: "Permission denied", Result: null });
	}
		
}


// export const isAuth = (req:Request, res: Response, next: NextFunction) => {
//     // if(req.token){
//     next();
//     // }
//     //console.log('token: ', req.token);
// 	// Lấy access token từ header
// 	//const accessTokenFromHeader = req.token;
// 	// if (!accessTokenFromHeader) {
// 	// 	return res.status(401).send('Không tìm thấy access token!');
// 	// }

// 	// const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// 	// const verified = await authMethod.verifyToken(
// 	// 	accessTokenFromHeader,
// 	// 	accessTokenSecret,
// 	// );
// 	// if (!verified) {
// 	// 	return res
// 	// 		.status(401)
// 	// 		.send('Bạn không có quyền truy cập vào tính năng này!');
// 	// }

// 	// const user = await userModle.getUser(verified.payload.username);
// 	// req.user = user;

// 	// return next();
// };
// const isRoleRoot = async(req, res, next) => {
//     try {
//         const partner = req.jwtDecode;
//         if(partner.role != 'root')
//             return res.json(rsErrorPermission());
//         return next();
//     } catch (error) {
//         return res.json(rsErrorOperation(error.message));
//     }
// };

// const isRoleAdmin = async(req, res, next) => {
//     try {
//         const partner = req.jwtDecode;
//         if(partner.role == 'member')
//             return res.json(rsErrorPermission());
//         return next();
//     } catch (error) {
//         return res.json(rsErrorOperation(error.message));
//     }
// };


