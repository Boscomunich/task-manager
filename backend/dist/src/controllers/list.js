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
exports.createList = createList;
exports.includeUserToList = includeUserToList;
exports.removeUserFromList = removeUserFromList;
exports.deleteList = deleteList;
exports.updateList = updateList;
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const prisma = new client_1.PrismaClient();
function createList(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, workspaceId, assignedTo } = args;
        if (!name || !workspaceId)
            throw new Error('Name is required');
        const id = crypto_1.default.randomBytes(16).toString('hex');
        const data = {
            id,
            name,
            workspaceId,
        };
        // Conditionally add optional fields
        if (description) {
            data.description = description;
        }
        if (assignedTo && assignedTo.length > 0) {
            data.assignedTo = {
                connect: assignedTo.map(userId => ({ id: userId })),
            };
        }
        const list = yield prisma.list.create({
            data,
        });
        return list;
    });
}
function includeUserToList(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || !userId)
            throw new Error('Both id and userId are required');
        const updatedList = yield prisma.list.update({
            where: { id },
            data: {
                assignedTo: {
                    connect: { id: userId }
                },
            },
        });
        return updatedList;
    });
}
function removeUserFromList(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || !userId)
            throw new Error('Both id and userId are required');
        const updatedList = yield prisma.list.update({
            where: { id },
            data: {
                assignedTo: {
                    disconnect: { id: userId }
                },
            },
        });
        return updatedList;
    });
}
function deleteList(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('ID is required');
        const deletedList = yield prisma.list.delete({
            where: { id },
        });
        return deletedList;
    });
}
function updateList(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, name, description, updatedAt } = args;
        // Check if at least one field is provided
        if (!name && !description && !updatedAt)
            throw new Error('no updates to be made');
        const data = {};
        // Conditionally add fields to the data object
        if (name)
            data.name = name;
        if (description)
            data.description = description;
        if (updatedAt)
            data.updatedAt = updatedAt;
        const updatedCard = yield prisma.card.update({
            where: { id },
            data,
        });
        return updatedCard;
    });
}
