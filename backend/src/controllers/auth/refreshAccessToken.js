import { UserModel } from '../../models/userModel';
import  jwt from 'jsonwebtoken'

export async function handler(req, res){
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await UserModel.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.googleId !== decoded.googleId) return res.sendStatus(403);
            console.log("decoded" , decoded)
            const accessToken = jwt.sign({
                    userInfo : {
                        name: foundUser.name ,
                        email: foundUser.email ,
                        picture: foundUser.picture ,
                        googleId: foundUser.googleId
                    }     
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_AGE }
            );
            res.json({ accessToken })
        }
    );
}

