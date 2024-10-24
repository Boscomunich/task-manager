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
exports.UserQuery = void 0;
const graphql_1 = require("graphql");
const graphschema_1 = require("../graphschema");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.UserQuery = {
    GetUser: {
        type: graphschema_1.UserType,
        args: {
            id: { type: graphql_1.GraphQLID }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const list = yield prisma.user.findUnique({
                    where: { id: args.id },
                    include: {
                        workspacesOwned: true,
                        workspacesWorking: true,
                        assignedCards: true,
                        notification: true
                    }
                });
                return list;
            });
        }
    },
};
