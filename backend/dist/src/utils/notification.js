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
exports.sendNotification = sendNotification;
exports.deleteNotification = deleteNotification;
exports.updateNotification = updateNotification;
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const prisma = new client_1.PrismaClient();
function sendNotification(message, type, userId, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!message || !type || !userId)
            throw new Error('something went wrong');
        const id = crypto_1.default.randomBytes(16).toString('hex');
        const notification = yield prisma.notification.create({
            data: {
                id,
                message,
                type,
                projectId,
                userId
            }
        });
        return notification;
    });
}
function deleteNotification(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('ID is required');
        const notification = yield prisma.notification.delete({
            where: { id },
        });
        return notification;
    });
}
function updateNotification(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('ID is required');
        const notification = yield prisma.notification.update({
            where: { id },
            data: {
                read: true
            }
        });
        return notification;
    });
}
