"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./src/middleware/auth"));
const express_2 = require("graphql-http/lib/use/express");
const graphquery_1 = require("./src/graphql/graphquery");
const app = (0, express_1.default)();
const client = process.env.CLIENT;
app.use((0, cors_1.default)({
    origin: client,
    credentials: true
}));
app.use(express_1.default.json({}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/graphql', (req, res, next) => {
    if (req.method === 'POST' && req.body.query) {
        const query = req.body.query;
        if (query.includes('Login') || query.includes('Register')) {
            return next();
        }
    }
    (0, auth_1.default)(req, res, next);
});
app.use('/graphql', (0, express_2.createHandler)({
    schema: graphquery_1.schema,
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(process.env.PORT, () => {
        console.log('listening to port', process.env.PORT);
    });
});
start();
