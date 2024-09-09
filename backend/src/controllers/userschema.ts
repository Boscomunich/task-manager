import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } from 'graphql';

const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        verified: { type: GraphQLBoolean },
        workspacesOwned: { type: new GraphQLList(WorkspaceType) },
        workspacesWorking: { type: new GraphQLList(WorkspaceType) },
        assignedLists: { type: new GraphQLList(ListType) },
        assignedCard: { type: new GraphQLList(CardType) }
    })
});

const WorkspaceType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Workspace',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        owner: { type: UserType },
        userId: {type: GraphQLString},
        workers: { type: new GraphQLList(UserType) },
        lists: { type: new GraphQLList(ListType) }
    })
});

const ListType: GraphQLObjectType = new GraphQLObjectType({
    name: 'List',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        workspace: { type: WorkspaceType },
        workspaceId: { type: GraphQLString },
        assignedTo: { type: new GraphQLList(UserType) },
        cards: { type: new GraphQLList(CardType) }
    })
});

const CardType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Card',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
        list: { type: ListType},
        listId: {type: GraphQLString},
        checkList: { type: new GraphQLList(CheckListType) },
        assignedTo: { type: new GraphQLList(UserType) },
    })
});

const CheckListType: GraphQLObjectType = new GraphQLObjectType({
    name: 'CheckList',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        checked: { type: GraphQLBoolean },
        card: { type: CardType },
        cardId: { type: GraphQLString }
    })
});
