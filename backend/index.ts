import express from 'express';
import cors from 'cors'
import errorHandler from './src/middleware/errors';
import Auth from './src/middleware/auth';
import { graphqlHTTP } from './node_modules/express-graphql/index';

const app = express()
const client = process.env.CLIENT
const port = process.env.PORT


app.use(cors({
    origin: client,
    credentials: true}));
app.use(express.json({}));
app.use(express.urlencoded({extended: true}))

app.use('/graphql', (req, res, next) => {
    if (req.method === 'POST' && req.body.query) {
        const query = req.body.query;
        if (query.includes('login') || query.includes('register')) {
        return next();
        }
    }
    Auth(req, res, next);
});

app.use('/graphql');


app.use(errorHandler)

const start = async () => {
    app.listen(port, () => {
        console.log('listening to port', port)
    }) 
}
start()