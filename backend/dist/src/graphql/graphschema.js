"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.CheckListType = exports.CardType = exports.ListType = exports.WorkspaceType = exports.UserType = void 0;
const graphql_1 = require("graphql");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        username: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        token: { type: graphql_1.GraphQLString },
        verified: { type: graphql_1.GraphQLBoolean },
        workspacesOwned: { type: new graphql_1.GraphQLList(exports.WorkspaceType) },
        workspacesWorking: { type: new graphql_1.GraphQLList(exports.WorkspaceType) },
        assignedLists: { type: new graphql_1.GraphQLList(exports.ListType) },
        assignedCards: { type: new graphql_1.GraphQLList(exports.CardType) },
        notification: { type: new graphql_1.GraphQLList(exports.NotificationType) }
    })
});
exports.WorkspaceType = new graphql_1.GraphQLObjectType({
    name: 'Workspace',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        owner: { type: exports.UserType },
        userId: { type: graphql_1.GraphQLString },
        workers: { type: new graphql_1.GraphQLList(exports.UserType) },
        lists: { type: new graphql_1.GraphQLList(exports.ListType) },
    })
});
exports.ListType = new graphql_1.GraphQLObjectType({
    name: 'List',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
        workspace: { type: exports.WorkspaceType },
        workspaceId: { type: graphql_1.GraphQLString },
        assignedTo: { type: new graphql_1.GraphQLList(exports.UserType) },
        cards: { type: new graphql_1.GraphQLList(exports.CardType) }
    })
});
exports.CardType = new graphql_1.GraphQLObjectType({
    name: 'Card',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        startDate: { type: graphql_1.GraphQLString },
        endDate: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
        list: { type: exports.ListType },
        listId: { type: graphql_1.GraphQLString },
        checkList: { type: new graphql_1.GraphQLList(exports.CheckListType) },
        assignedTo: { type: new graphql_1.GraphQLList(exports.UserType) },
    })
});
exports.CheckListType = new graphql_1.GraphQLObjectType({
    name: 'CheckList',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        checked: { type: graphql_1.GraphQLBoolean },
        card: { type: exports.CardType },
        cardId: { type: graphql_1.GraphQLString }
    })
});
exports.NotificationType = new graphql_1.GraphQLObjectType({
    name: 'Notification',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        message: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
        projectId: { type: graphql_1.GraphQLString },
        read: { type: graphql_1.GraphQLBoolean },
        createdAt: { type: graphql_1.GraphQLString },
        userId: { type: graphql_1.GraphQLString }
    })
});
