var jwt = require('jsonwebtoken');

const generateToken = async (payload, secretSignature, tokenLife) => {
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
const verifyToken = async(token, secretKey) => {
    try {
        return await jwt.verify(token, secretKey);
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
}



module.exports = {
    generateToken,
    verifyToken
};
