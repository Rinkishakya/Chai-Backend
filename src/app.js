import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(express.static('public'));
app.use(cookieParser());

//routes import
import userRouter from './routes/user.routes.js'


//routs declaration
app.use("/api/v1/users", userRouter) //users prefix hota he yhi se url bnta he
//   http://localhost:8000/api/v1/users/register
//   http://localhost:8000/api/v1/users/login

export default app;


