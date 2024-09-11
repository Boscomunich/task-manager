import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserMutations } from './mutations/usermutation';
import { WorkspaceMutations } from './mutations/workspacemutation';
import { ListMutations } from './mutations/listmutation';
import { CardMutations } from './mutations/cardmutation';
import { CheckListMutations } from './mutations/checklistmutation';
import { WorkspaceQuery } from './queries/workspacequery';
import { ListQuery } from './queries/listquery';
import { CardQuery } from './queries/cardquery';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...WorkspaceQuery,
        ...ListQuery,
        ...CardQuery
    }
});

const RootMutation: GraphQLObjectType = new GraphQLObjectType ({
    name: 'RootMutationType',
    fields: {
        ...UserMutations,
        ...WorkspaceMutations,
        ...ListMutations,
        ...CardMutations,
        ...CheckListMutations
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

export { schema };