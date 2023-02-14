import express from 'express'
import { verifyAccessToken } from './middleware/verifyAccessToken'

const apiRoutes = express.Router()

//users
apiRoutes.get('/auth/google/url', require('./controllers/auth/getGoogleOauthUrl').handler)
    .get('/auth/google/callback', require("./controllers/auth/googleOAuthCallback").handler)
    .get('/auth/refresh', require('./controllers/auth/refreshAccessToken').handler)
    .get('/auth/logout', require('./controllers/auth/logout').handler)
    .get('/user/profile', verifyAccessToken, (req, res) => res.send('profile'))
// .post('/auth/signup', require('./controllers/auth/signup').handler)
// .post('/user/login', require("./controllers/user/login").handler)




export { apiRoutes }
