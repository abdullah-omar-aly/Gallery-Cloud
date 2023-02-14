import express from 'express';
import path from 'path';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
// const whitelist = ["http://localhost:5173"]
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }, credentials: true
// }
// app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require("./routes").apiRoutes)


export { app }