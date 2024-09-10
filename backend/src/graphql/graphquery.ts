import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } from 'graphql';
import { UserType } from './graphschema';
import { login, registerUser } from '../controllers/user';
import { UserMutations } from './usermutation';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            resolve() {
                return 'Hello, world!';
            }
        }
    }
});

const RootMutation: GraphQLObjectType = new GraphQLObjectType ({
    name: 'RootMutationType',
    fields: {
        ...UserMutations
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

export { schema };