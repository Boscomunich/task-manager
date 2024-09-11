import { GraphQLFieldConfigMap, GraphQLID, GraphQLString } from "graphql";
import { ListType } from "../graphschema";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ListQuery: GraphQLFieldConfigMap<any, any> = {
    GetAllList: {
        type: ListType,
        args: {
            workspaceId: {type: GraphQLID}
        },
        async resolve(parent, args) {
            const allList = await prisma.list.findMany({
                where: {workspaceId: args.id}
            })
            return allList
        }
    },
    GetList: {
        type: ListType,
        args: {
            id: {type: GraphQLID}
        },
        async resolve(parent, args) {
            const list = await prisma.list.findUnique({
                where: {id: args.id},
                include: {cards: true}
            })
            return list
        }
    },
}