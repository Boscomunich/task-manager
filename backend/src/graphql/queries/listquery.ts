import { GraphQLFieldConfigMap, GraphQLID, GraphQLString } from "graphql";
import { ListType } from "../graphschema";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ListQuery: GraphQLFieldConfigMap<any, any> = {
    GetList: {
        type: ListType,
        args: {
            id: {type: GraphQLID}
        },
        async resolve(parent, args) {
            const list = await prisma.list.findUnique({
                where: {id: args.id},
                include: {
                    cards: true,
                    workspace: true
                }
            })
            return list
        }
    },
}