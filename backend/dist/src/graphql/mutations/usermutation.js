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
exports.UserMutations = void 0;
const graphql_1 = require("graphql");
const graphschema_1 = require("../graphschema");
const user_1 = require("../../controllers/user");
exports.UserMutations = {
    Login: {
        type: graphschema_1.UserType,
        args: {
            email: { type: graphql_1.GraphQLString },
            password: { type: graphql_1.GraphQLString }
        },
        resolve(parent, args) {
            const params = {
                email: args.email,
                password: args.password
            };
            return (0, user_1.login)(params);
        }
    },
    Register: {
        type: graphschema_1.UserType,
        args: {
            email: { type: graphql_1.GraphQLString },
            password: { type: graphql_1.GraphQLString },
            username: { type: graphql_1.GraphQLString }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const params = {
                    email: args.email,
                    password: args.password,
                    username: args.username
                };
                return yield (0, user_1.registerUser)(params);
            });
        }
    }
};
