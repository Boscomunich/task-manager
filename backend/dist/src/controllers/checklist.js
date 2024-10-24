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
exports.createCheckList = createCheckList;
exports.deleteCheckList = deleteCheckList;
exports.updateCheckList = updateCheckList;
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const prisma = new client_1.PrismaClient();
function createCheckList(name, cardId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!name || !cardId)
            throw new Error('all fields are required');
        const id = crypto_1.default.randomBytes(16).toString('hex');
        const checkList = yield prisma.checkList.create({
            data: {
                id,
                name,
                cardId
            }
        });
        return checkList;
    });
}
function deleteCheckList(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('ID is required');
        const deletedCheckList = yield prisma.checkList.delete({
            where: { id },
        });
        return deletedCheckList;
    });
}
function updateCheckList(id, checked) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('ID is required');
        const updatedCheckList = yield prisma.checkList.update({
            where: { id },
            data: {
                checked: checked
            }
        });
        return updatedCheckList;
    });
}
