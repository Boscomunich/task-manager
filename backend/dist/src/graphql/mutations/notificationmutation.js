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
exports.NotificationMutation = void 0;
const graphql_1 = require("graphql");
const graphschema_1 = require("../graphschema");
const notification_1 = require("../../utils/notification");
exports.NotificationMutation = {
    DeleteNotification: {
        type: graphschema_1.NotificationType,
        args: {
            id: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, notification_1.deleteNotification)(args.id);
            });
        }
    },
    UpdateNotification: {
        type: graphschema_1.NotificationType,
        args: {
            id: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, notification_1.updateNotification)(args.id);
            });
        }
    },
};
