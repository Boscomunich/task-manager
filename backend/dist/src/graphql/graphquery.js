"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const usermutation_1 = require("./mutations/usermutation");
const workspacemutation_1 = require("./mutations/workspacemutation");
const listmutation_1 = require("./mutations/listmutation");
const cardmutation_1 = require("./mutations/cardmutation");
const checklistmutation_1 = require("./mutations/checklistmutation");
const workspacequery_1 = require("./queries/workspacequery");
const listquery_1 = require("./queries/listquery");
const cardquery_1 = require("./queries/cardquery");
const userquery_1 = require("./queries/userquery");
const notificationmutation_1 = require("./mutations/notificationmutation");
const notificationquery_1 = require("./queries/notificationquery");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, workspacequery_1.WorkspaceQuery), listquery_1.ListQuery), cardquery_1.CardQuery), userquery_1.UserQuery), notificationquery_1.NotificationQuery)
});
const RootMutation = new graphql_1.GraphQLObjectType({
    name: 'RootMutationType',
    fields: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, usermutation_1.UserMutations), workspacemutation_1.WorkspaceMutations), listmutation_1.ListMutations), cardmutation_1.CardMutations), checklistmutation_1.CheckListMutations), notificationmutation_1.NotificationMutation)
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
exports.schema = schema;
