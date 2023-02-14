import querystring from "querystring";
import  jwt  from "jsonwebtoken";
import axios from 'axios'
import { UserModel } from "../../models/userModel";

export async function handler(req, res) {
    try {
        //we'll start by getting the code that Google has provided when it redirected user back go this route
        const { code } = req.query

        // getUser google function that we created earlier
        const { id_token, access_token } = await getTokens({
            code,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectUri: `${process.env.SERVER_ROOT_URI}/api/auth/google/callback`,
        });

        // Fetch the user's profile with the access token and bearer
        const googleUser = await axios
            .get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${id_token}`,
                    },
                }
            )
            .then((res) => res.data)
            .catch((error) => {
                console.error(`Failed to fetch user`);
                throw new Error(error.message);
            });

        const { email, picture, id: googleId, name , verified_email} = googleUser

        console.log(googleUser)

        
        //  this (update method with upsert option if true, and no documents found, insert a new document) 
        const user =  await UserModel.findOneAndUpdate({email} , {email , googleId , picture , name , isEmailVerified: verified_email} , {upsert: true , new: true})

        //generate accessToken and refresh token
        const accessToken = jwt.sign( { 
            userInfo : {
                name ,
                email ,
                picture ,
                googleId
            }
        },  process.env.ACCESS_TOKEN_SECRET , {expiresIn: process.env.ACCESS_TOKEN_AGE});
        console.log("access token: " ,accessToken)
        
        const refreshToken = jwt.sign( { 
                googleId
        },  process.env.REFRESH_TOKEN_SECRET , {expiresIn: process.env.REFRESH_TOKEN_AGE});

        console.log("refresh token: " ,refreshToken)

        // save refresh token with the user in the database
        await UserModel.findOneAndUpdate({email} , {refreshToken})

                /*
        http only cookie is not available to javascript , 
        it's much more secure than store teh refresh token in the localStorage or in a cookie available to javascript
        */
        res.cookie( "jwt", refreshToken , {
            maxAge: 24 * 60 * 60 *1000 ,
            httpOnly: true,
            secure: false,
        });

        //redirect user to the frontend app
        res.redirect(`${process.env.CLIENT_ROOT_URI}/login?token=${accessToken}`)

        // res.send("let's start")
    }catch(error) {
        console.log(error)
    }
    }



// Getting the user from Google with the code
function getTokens({ code, clientId, clientSecret, redirectUri }) {
        /*
         * Uses the code to get tokens
         * that can be used to fetch the user's profile
         */
        const url = "https://oauth2.googleapis.com/token";
        const values = {
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
        };

        return axios
            .post(url, querystring.stringify(values), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((res) => res.data)
            .catch((error) => {
                console.error(`Failed to fetch auth tokens`);
                throw new Error(error.message);
            });
    }