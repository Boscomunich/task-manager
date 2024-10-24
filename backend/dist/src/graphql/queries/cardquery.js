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
exports.CardQuery = void 0;
const graphql_1 = require("graphql");
const graphschema_1 = require("../graphschema");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.CardQuery = {
    GetAllCard: {
        type: graphschema_1.ListType,
        args: {
            listId: { type: graphql_1.GraphQLID }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const allCards = yield prisma.card.findMany({
                    where: { listId: args.id }
                });
                return allCards;
            });
        }
    },
    GetCard: {
        type: graphschema_1.CardType,
        args: {
            id: { type: graphql_1.GraphQLID }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const card = yield prisma.card.findUnique({
                    where: { id: args.id },
                    include: {
                        checkList: true,
                        assignedTo: true
                    }
                });
                return card;
            });
        }
    },
};