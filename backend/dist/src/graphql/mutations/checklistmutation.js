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
exports.CheckListMutations = void 0;
const graphql_1 = require("graphql");
const graphschema_1 = require("../graphschema");
const checklist_1 = require("../../controllers/checklist");
exports.CheckListMutations = {
    CreateCheckList: {
        type: graphschema_1.CheckListType,
        args: {
            name: { type: graphql_1.GraphQLString },
            cardId: { type: graphql_1.GraphQLID }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, checklist_1.createCheckList)(args.name, args.cardId);
            });
        }
    },
    DeleteCheckList: {
        type: graphschema_1.CheckListType,
        args: {
            id: { type: graphql_1.GraphQLID }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, checklist_1.deleteCheckList)(args.id);
            });
        }
    },
    UpdateCheckList: {
        type: graphschema_1.CheckListType,
        args: {
            id: { type: graphql_1.GraphQLID },
            checked: { type: graphql_1.GraphQLBoolean }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, checklist_1.updateCheckList)(args.id, args.checked);
            });
        }
    },
};
