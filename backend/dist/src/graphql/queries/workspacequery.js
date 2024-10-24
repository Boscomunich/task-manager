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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceQuery = void 0;
const graphql_1 = require("graphql");
const graphschema_1 = require("../graphschema");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.WorkspaceQuery = {
    GetAllWorkspace: {
        type: (0, graphql_1.GraphQLList)(graphschema_1.WorkspaceType),
        args: {
            userId: { type: graphql_1.GraphQLID }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const allWorkspace = yield prisma.workspace.findMany({
                    where: { userId: args.id }
                });
                return allWorkspace;
            });
        }
    },
    GetWorkspace: {
        type: graphschema_1.WorkspaceType,
        args: {
            id: { type: graphql_1.GraphQLID }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const Workspace = yield prisma.workspace.findUnique({
                    where: { id: args.id },
                    include: {
                        lists: true,
                        workers: true
                    },
                });
                return Workspace;
            });
        }
    },
};
