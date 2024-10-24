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
exports.CreateWorkSpace = CreateWorkSpace;
exports.addWorkSpaceCollaborator = addWorkSpaceCollaborator;
exports.acceptInvite = acceptInvite;
exports.removeWorkSpaceCollaborator = removeWorkSpaceCollaborator;
exports.deleteWorkspace = deleteWorkspace;
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const notification_1 = require("../utils/notification");
const prisma = new client_1.PrismaClient();
function CreateWorkSpace(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, userId } = args;
        if (!name || !description || !userId)
            throw new Error('all fields are required');
        const id = crypto_1.default.randomBytes(16).toString('hex');
        const workSpace = yield prisma.workspace.create({
            data: {
                id,
                name,
                description,
                userId
            },
            include: {
                owner: true,
            },
        });
        return workSpace;
    });
}
function addWorkSpaceCollaborator(id, email, ownerId, userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || !email || !userEmail)
            throw new Error('all fields are required');
        userEmail = userEmail.trim();
        const workSpace = yield prisma.workspace.findUnique({
            where: { id: id },
        });
        if ((workSpace === null || workSpace === void 0 ? void 0 : workSpace.userId) != ownerId)
            throw new Error('non owner cannot invite members');
        const user = yield prisma.user.findFirst({
            where: {
                email: userEmail
            }
        });
        if (!user)
            throw new Error('user with this email doesnt exist');
        const userExistsInWorkspace = yield prisma.workspace.findFirst({
            where: {
                id,
                workers: {
                    some: {
                        id: user.id
                    }
                }
            }
        });
        if (userExistsInWorkspace)
            throw new Error('user already added');
        const message = `a user with this emai ${email} has invited  you to join their board; please reject if you don’t know this user`;
        const notification = yield (0, notification_1.sendNotification)(message, 'invitation', user.id, id);
        return notification;
    });
}
function acceptInvite(projectId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findFirst({
            where: {
                id: userId
            }
        });
        if (!user)
            throw new Error('user not found');
        const updatedWorkspace = yield prisma.workspace.update({
            where: { id: projectId },
            data: {
                workers: {
                    connect: { id: userId }
                },
            },
        });
        const message = `user ${user.email} has accepted your invite to join your project ${updatedWorkspace.name}`;
        yield (0, notification_1.sendNotification)(message, 'Alert', updatedWorkspace.userId);
        return updatedWorkspace;
    });
}
function removeWorkSpaceCollaborator(ownerId, id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || !userId || !ownerId)
            throw new Error('all fields are required');
        const workspace = yield prisma.workspace.findUnique({
            where: { id },
            select: { userId: true }
        });
        if ((workspace === null || workspace === void 0 ? void 0 : workspace.userId) !== ownerId)
            throw new Error('You are not authorized to perform this action');
        const updatedWorkspace = yield prisma.workspace.update({
            where: { id },
            data: {
                workers: {
                    disconnect: { id: userId }
                },
            },
        });
        const message = `your have been remove from the project ${updatedWorkspace.name} by the owner`;
        yield (0, notification_1.sendNotification)(message, 'Alert', userId);
        return updatedWorkspace;
    });
}
function deleteWorkspace(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('ID is required');
        const deletedWorkspace = yield prisma.card.delete({
            where: { id },
        });
        return deletedWorkspace;
    });
}
