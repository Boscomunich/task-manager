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
exports.CardMutations = void 0;
const graphql_1 = require("graphql");
const graphschema_1 = require("../graphschema");
const card_1 = require("../../controllers/card");
exports.CardMutations = {
    CreateCard: {
        type: graphschema_1.CardType,
        args: {
            name: { type: graphql_1.GraphQLString },
            description: { type: graphql_1.GraphQLString },
            listId: { type: graphql_1.GraphQLID },
            assignedTo: { type: graphql_1.GraphQLID },
            startDate: { type: graphql_1.GraphQLString },
            endDate: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const params = {
                    name: args.name,
                    listId: args.listId,
                };
                if (args.description)
                    params.description = args.description;
                if (args.assignedTo)
                    params.assignedTo = args.assignedTo;
                if (args.startDate)
                    params.startDate = args.startDate;
                if (args.endDate)
                    params.endDate = args.endDate;
                return yield (0, card_1.createCard)(params);
            });
        }
    },
    UpdateCard: {
        type: graphschema_1.CardType,
        args: {
            id: { type: graphql_1.GraphQLID },
            name: { type: graphql_1.GraphQLString },
            description: { type: graphql_1.GraphQLString },
            listId: { type: graphql_1.GraphQLID },
            startDate: { type: graphql_1.GraphQLString },
            endDate: { type: graphql_1.GraphQLString },
            updatedAt: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const params = {
                    id: args.id
                };
                if (args.name)
                    params.name = args.name;
                if (args.description)
                    params.description = args.description;
                if (args.listId)
                    params.listId = args.listId;
                if (args.startDate)
                    params.startDate = args.startDate;
                if (args.endDate)
                    params.endDate = args.endDate;
                if (args.updatedAt)
                    params.updatedAt = args.updatedAt;
                return yield (0, card_1.updateCard)(params);
            });
        }
    },
    IncludeUserToCard: {
        type: graphschema_1.CardType,
        args: {
            id: { type: graphql_1.GraphQLID },
            userId: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, card_1.includeUserToCard)(args.id, args.userId);
            });
        }
    },
    RemoveUserFromCard: {
        type: graphschema_1.CardType,
        args: {
            id: { type: graphql_1.GraphQLID },
            userId: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, card_1.removeUserFromCard)(args.id, args.userId);
            });
        }
    },
    DeleteCard: {
        type: graphschema_1.CardType,
        args: {
            id: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, card_1.deleteCard)(args.id);
            });
        }
    },
    MoveCard: {
        type: graphschema_1.CardType,
        args: {
            id: { type: graphql_1.GraphQLID },
            listId: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, card_1.moveCard)(args.id, args.listId);
            });
        }
    }
};
