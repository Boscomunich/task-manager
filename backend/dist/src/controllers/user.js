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
exports.registerUser = registerUser;
exports.login = login;
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const authutils_1 = require("../utils/authutils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
// register user to the database
function registerUser(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, username } = args;
        console.log(email, password, username);
        //check for neccessary user details
        if (!email || !password || !username)
            throw new Error('all fields are required');
        // checks if user exist
        const userExist = yield prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (userExist)
            throw new Error('user with the email exist');
        //checks if username is available
        const usernameTaken = yield prisma.user.findFirst({
            where: {
                username: username
            }
        });
        if (usernameTaken)
            throw new Error('username already in use');
        //encrypt user password before storage
        const encryptedPassWord = yield (0, authutils_1.encryptPassWord)(password);
        const userId = crypto_1.default.randomBytes(16).toString('hex');
        // create user in database
        const user = yield prisma.user.create({
            data: {
                id: userId,
                email,
                username,
                password: encryptedPassWord
            }
        });
        //send msg back to user
        return user;
    });
}
//log user in
function login(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = args;
        //checks for email and password
        if (!password || !email)
            throw new Error('all fields are required');
        //get user from database
        const user = yield prisma.user.findUnique({
            where: { email }
        });
        //return if user doesnt exist
        if (!user)
            throw new Error('wrong password or password');
        //checks if password is correct
        const isMatch = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        //return user info back if password is correct
        if (isMatch) {
            const token = (0, authutils_1.createJWT)(user.id, user.email);
            return Object.assign(Object.assign({}, user), { token });
        }
        //return msg if password is incorrect
        throw new Error('wrong email or password');
    });
}
