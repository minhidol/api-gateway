var jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const verify = promisify(jwt.verify).bind(jwt);

export async function generateToken (payload: any, secretSignature: any, tokenLife: any) {
    try {
        return await jwt.sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife
            }
        )
    } catch (error) {
        throw error;
    }
}

export async function verifyToken(token: any, secretKey:any) {
    try {
        return await jwt.verify(token, secretKey);
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
}


export async function decodeToken(token: any, secretKey: any){
	try {
		return await verify(token, secretKey, {
			ignoreExpiration: true,
		});
	} catch (error) {
		console.log(`Error in decode access token: ${error}`);
		return null;
	}
};