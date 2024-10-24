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
exports.ListMutations = void 0;
const graphql_1 = require("graphql");
const graphschema_1 = require("../graphschema");
const list_1 = require("../../controllers/list");
exports.ListMutations = {
    CreateList: {
        type: graphschema_1.ListType,
        args: {
            name: { type: graphql_1.GraphQLString },
            description: { type: graphql_1.GraphQLString },
            workspaceId: { type: graphql_1.GraphQLID },
            assignedTo: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const params = {
                    name: args.name,
                    workspaceId: args.workspaceId,
                };
                if (args.description)
                    params.description = args.description;
                if (args.assignedTo)
                    params.assignedTo = args.assignedTo;
                return (0, list_1.createList)(params);
            });
        }
    },
    UpdateList: {
        type: graphschema_1.ListType,
        args: {
            id: { type: graphql_1.GraphQLID },
            description: { type: graphql_1.GraphQLString },
            name: { type: graphql_1.GraphQLString },
            updatedAt: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const params = {
                    id: args.id
                };
                if (args.name)
                    params.name = args.name;
                if (args.updatedAt)
                    params.updatedAt = args.updatedAt;
                if (args.description)
                    params.description = args.description;
                return yield (0, list_1.updateList)(params);
            });
        }
    },
    IncludeUserToList: {
        type: graphschema_1.ListType,
        args: {
            id: { type: graphql_1.GraphQLID },
            userId: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, list_1.includeUserToList)(args.id, args.userId);
            });
        }
    },
    RemoveUserFromList: {
        type: graphschema_1.ListType,
        args: {
            id: { type: graphql_1.GraphQLID },
            userId: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, list_1.removeUserFromList)(args.id, args.userId);
            });
        }
    },
    DeleteList: {
        type: graphschema_1.ListType,
        args: {
            id: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, list_1.deleteList)(args.id);
            });
        }
    }
};
