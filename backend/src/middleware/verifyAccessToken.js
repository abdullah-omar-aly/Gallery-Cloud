import { UserModel } from '../models/userModel';
const jwt = require('jsonwebtoken');

export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); //You are not authenticated!
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            // const foundUser = await UserModel.findOne({ googleId:decoded.userInfo.googleId }).exec();
            // if (!foundUser) res.sendStatus(403) //user not found
            console.log('valid user')
            req.user = decoded
            next();
        }
    );
}

