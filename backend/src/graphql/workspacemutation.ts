import { GraphQLFieldConfigMap, GraphQLID, GraphQLString } from "graphql";
import { WorkspaceType } from "./graphschema";
import { addWorkSpaceCollaborator, CreateWorkSpace, removeWorkSpaceCollaborator } from "../controllers/workspace";

export const WorkSpaceMutations: GraphQLFieldConfigMap<any, any> = {
    CreateWorkSpace: {
        type: WorkspaceType,
        args: {
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            userId: { type: GraphQLID },
        },
        async resolve(parent, args) {
            const params = {
                name: args.name,
                description: args.description,
                userId: args.userId
            }
            return await CreateWorkSpace(params)
        }
    },
    AddCollaborators: {
        type: WorkspaceType,
        args: {
            id: { type: GraphQLString},
            userId: { type: GraphQLString}
        },
        async resolve (parent, args) {
            return await addWorkSpaceCollaborator(args.id, args.userId)
        }
    },
    RemoveCollaborators: {
        type: WorkspaceType,
        args: {
            owner: { type: GraphQLString},
            id: { type: GraphQLString},
            userId: { type: GraphQLString}
        },
        async resolve (parent, args) {
            return await removeWorkSpaceCollaborator(args.owner, args.id, args.userId)
        }
    },
};