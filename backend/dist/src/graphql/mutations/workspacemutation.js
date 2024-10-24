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
exports.WorkspaceMutations = void 0;
const graphql_1 = require("graphql");
const graphschema_1 = require("../graphschema");
const workspace_1 = require("../../controllers/workspace");
exports.WorkspaceMutations = {
    CreateWorkspace: {
        type: graphschema_1.WorkspaceType,
        args: {
            name: { type: graphql_1.GraphQLString },
            description: { type: graphql_1.GraphQLString },
            userId: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const params = {
                    name: args.name,
                    description: args.description,
                    userId: args.userId
                };
                return yield (0, workspace_1.CreateWorkSpace)(params);
            });
        }
    },
    AddCollaborators: {
        type: graphschema_1.WorkspaceType,
        args: {
            id: { type: graphql_1.GraphQLID },
            email: { type: graphql_1.GraphQLString },
            ownerId: { type: graphql_1.GraphQLID },
            userEmail: { type: graphql_1.GraphQLString }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, workspace_1.addWorkSpaceCollaborator)(args.id, args.email, args.ownerId, args.userEmail);
            });
        }
    },
    RemoveCollaborators: {
        type: graphschema_1.WorkspaceType,
        args: {
            ownerId: { type: graphql_1.GraphQLID },
            id: { type: graphql_1.GraphQLID },
            userId: { type: graphql_1.GraphQLID }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, workspace_1.removeWorkSpaceCollaborator)(args.ownerId, args.id, args.userId);
            });
        }
    },
    AcceptInvite: {
        type: graphschema_1.WorkspaceType,
        args: {
            projectId: { type: graphql_1.GraphQLString },
            userId: { type: graphql_1.GraphQLString }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, workspace_1.acceptInvite)(args.projectId, args.userId);
            });
        }
    },
    DeleteWorkspace: {
        type: graphschema_1.WorkspaceType,
        args: {
            id: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, workspace_1.deleteWorkspace)(args.id);
            });
        }
    }
};
