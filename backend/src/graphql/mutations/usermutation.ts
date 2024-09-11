import { GraphQLFieldConfigMap, GraphQLString } from 'graphql';
import { UserType } from '../graphschema';
import { login, registerUser } from '../../controllers/user';

export const UserMutations: GraphQLFieldConfigMap<any, any> = {
    Login: {
        type: UserType,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        resolve(parent, args) {
            const params = {
                email: args.email as string,
                password: args.password as string
            };
            return login(params);
        }
    },
    Register: {
        type: UserType,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString },
            username: { type: GraphQLString }
        },
        async resolve(parent, args) {
            const params = {
                email: args.email as string,
                password: args.password as string,
                username: args.username as string
            };
            return await registerUser(params);
        }
    }
};
