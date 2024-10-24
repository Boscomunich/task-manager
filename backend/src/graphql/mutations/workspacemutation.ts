import { GraphQLFieldConfigMap, GraphQLID, GraphQLString } from "graphql";
import { WorkspaceType, NotificationType } from "../graphschema";
import { acceptInvite, addWorkSpaceCollaborator, CreateWorkSpace, deleteWorkspace, removeWorkSpaceCollaborator } from "../../controllers/workspace";

export const WorkspaceMutations: GraphQLFieldConfigMap<any, any> = {
    CreateWorkspace: {
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
            id: { type: GraphQLID},
            email: { type: GraphQLString},
            ownerId: { type: GraphQLID},
            userEmail: { type: GraphQLString}
        },
        async resolve (parent, args) {
            return await addWorkSpaceCollaborator(args.id, args.email, args.ownerId, args.userEmail)
        }
    },
    RemoveCollaborators: {
        type: WorkspaceType,
        args: {
            ownerId: { type: GraphQLID},
            id: { type: GraphQLID},
            userId: { type: GraphQLID}
        },
        async resolve (parent, args) {
            return await removeWorkSpaceCollaborator(args.ownerId, args.id, args.userId)
        }
    },

    AcceptInvite: {
        type: WorkspaceType,
        args: {
            projectId: {type: GraphQLString},
            userId: {type: GraphQLString}
        },
        async resolve (parent, args) {
            return await acceptInvite(args.projectId, args.userId)
        }
    },

    DeleteWorkspace: {
        type: WorkspaceType,
        args: {
            id: {type: GraphQLID},
        },
        async resolve (parent, args) {
            return await deleteWorkspace(args.id)
        }
    }
};