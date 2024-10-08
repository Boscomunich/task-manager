import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserMutations } from './mutations/usermutation';
import { WorkspaceMutations } from './mutations/workspacemutation';
import { ListMutations } from './mutations/listmutation';
import { CardMutations } from './mutations/cardmutation';
import { CheckListMutations } from './mutations/checklistmutation';
import { WorkspaceQuery } from './queries/workspacequery';
import { ListQuery } from './queries/listquery';
import { CardQuery } from './queries/cardquery';
import { UserQuery } from './queries/userquery';
import { NotificationMutation } from './mutations/notificationmutation';
import { NotificationQuery } from './queries/notificationquery';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...WorkspaceQuery,
        ...ListQuery,
        ...CardQuery,
        ...UserQuery,
        ...NotificationQuery
    }
});

const RootMutation: GraphQLObjectType = new GraphQLObjectType ({
    name: 'RootMutationType',
    fields: {
        ...UserMutations,
        ...WorkspaceMutations,
        ...ListMutations,
        ...CardMutations,
        ...CheckListMutations,
        ...NotificationMutation
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

export { schema };