import { GraphQLFieldConfigMap, GraphQLID, GraphQLString } from "graphql";
import { ListType } from "./graphschema";
import { createList } from "../controllers/list";

export const ListMutations: GraphQLFieldConfigMap<any, any> = {
    CreateList: {
        type: ListType,
        args: {
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            workspaceId: { type: GraphQLID },
            assignedTo: { type: GraphQLID },
        },
        async resolve(parent, args) {
            const params : {
                name: string;
                workspaceId: string;
                description?: string;
                assignedTo?: string[];
            } = {
                name: args.name,
                workspaceId: args.workspaceId,
            };
            if (args.description) params.description = args.description
            if (args.assignedTo) params.assignedTo = args.assignedTo
            return createList(params)
        }
    },
    UpdateDescription: {
        type: ListType,
        args: {
            id: {type: GraphQLID},
            description: {type: GraphQLString}
        },
        async resolve (parent, args) {
            
        }
    }
};