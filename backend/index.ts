import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'
import Auth from './src/middleware/auth';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './src/graphql/graphquery';

const app = express()
const client = process.env.CLIENT

app.use(cors({
    origin: client,
    credentials: true}));
app.use(express.json({}));
app.use(express.urlencoded({extended: true}))

app.use('/graphql', (req, res, next) => {
    if (req.method === 'POST' && req.body.query) {
        const query = req.body.query;
        if (query.includes('Login') || query.includes('Register')) {
        return next();
        }
    }
    Auth(req, res, next);
});

app.use('/graphql', createHandler({
    schema,
}));

const start = async () => {
    app.listen(process.env.PORT, () => {
        console.log('listening to port', process.env.PORT)
    }) 
}
start()