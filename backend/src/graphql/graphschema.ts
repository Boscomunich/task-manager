import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } from 'graphql';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        token: { type: GraphQLString },
        verified: { type: GraphQLBoolean },
        workspacesOwned: { type: new GraphQLList(WorkspaceType) },
        workspacesWorking: { type: new GraphQLList(WorkspaceType) },
        assignedLists: { type: new GraphQLList(ListType) },
        assignedCard: { type: new GraphQLList(CardType) }
    })
});

export const WorkspaceType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Workspace',
    fields: () => ({
        id: { type: GraphQLID },
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
        description: {type: GraphQLString},
        name: { type: GraphQLString },
        owner: { type: UserType },
        userId: {type: GraphQLString},
        workers: { type: new GraphQLList(UserType) },
        lists: { type: new GraphQLList(ListType) }
    })
});

export const ListType: GraphQLObjectType = new GraphQLObjectType({
    name: 'List',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
        workspace: { type: WorkspaceType },
        workspaceId: { type: GraphQLString },
        assignedTo: { type: new GraphQLList(UserType) },
        cards: { type: new GraphQLList(CardType) }
    })
});

export const CardType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Card',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
        list: { type: ListType},
        listId: {type: GraphQLString},
        checkList: { type: new GraphQLList(CheckListType) },
        assignedTo: { type: new GraphQLList(UserType) },
    })
});

export const CheckListType: GraphQLObjectType = new GraphQLObjectType({
    name: 'CheckList',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        checked: { type: GraphQLBoolean },
        card: { type: CardType },
        cardId: { type: GraphQLString }
    })
});
