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
exports.encryptPassWord = encryptPassWord;
exports.createJWT = createJWT;
exports.createShortJWT = createShortJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//encrypt password using bcrypt
function encryptPassWord(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedPassWord = yield bcryptjs_1.default.hash(password, 10);
        return encryptedPassWord;
    });
}
//create long term jwt token
function createJWT(id, email) {
    return jsonwebtoken_1.default.sign({ userId: id, name: email }, process.env.JWT_SECRET, { expiresIn: '365d' });
}
//create short term jwt token
function createShortJWT(id, email) {
    return jsonwebtoken_1.default.sign({ userId: id, name: email }, process.env.JWT_SECRET, { expiresIn: '1d' });
}
module.exports = { encryptPassWord, createJWT, createShortJWT };
