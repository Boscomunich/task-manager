import { GraphQLFieldConfigMap, GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { WorkspaceType } from "../graphschema";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const WorkspaceQuery: GraphQLFieldConfigMap<any, any> = {
    GetAllWorkspace: {
        type: GraphQLList (WorkspaceType),
        args: {
            userId: {type: GraphQLID}
        },
        async resolve(parent, args) {
            const allWorkspace = await prisma.workspace.findMany({
                where: {userId: args.id}
            })
            return allWorkspace
        }
    },
    GetWorkspace: {
        type: WorkspaceType,
        args: {
            id: {type: GraphQLID}
        },
        async resolve(parent, args) {
            const Workspace = await prisma.workspace.findUnique({
                where: {id: args.id},
                include: { 
                    lists: true,
                    workers: true
                },
            })
            return Workspace
        }
    },
}