import { GraphQLFieldConfigMap, GraphQLID, GraphQLString } from "graphql";
import { ListType } from "../graphschema";
import { createList, deleteList, includeUserToList, removeUserFromList, updateList } from "../../controllers/list";

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
    UpdateList: {
        type: ListType,
        args: {
            id: {type: GraphQLID},
            description: {type: GraphQLString},
            name: {type: GraphQLString},
            updatedAt: {type: GraphQLString},
        },
        async resolve (parent, args) {
            const params : {
                id: string
                name?: string;
                updatedAt?: string;
                description?: string;
            } = {
                id: args.id
            };
            if (args.name) params.name = args.name
            if (args.updatedAt) params.updatedAt = args.updatedAt
            if (args.description) params.description = args.description
            return await updateList(params)
        }
    },
    IncludeUserToList: {
        type: ListType,
        args: {
            id: {type: GraphQLID},
            userId: {type: GraphQLID},
        },
        async resolve (parent, args) {
            return await includeUserToList(args.id, args.userId)
        }
    },
    RemoveUserFromList: {
        type: ListType,
        args: {
            id: {type: GraphQLID},
            userId: {type: GraphQLID},
        },
        async resolve (parent, args) {
            return await removeUserFromList(args.id, args.userId)
        }
    },
    DeleteList: {
        type: ListType,
        args: {
            id: {type: GraphQLID},
        },
        async resolve (parent, args) {
            return await deleteList(args.id)
        }
    }
};