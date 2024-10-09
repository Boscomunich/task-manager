import { GraphQLFieldConfigMap, GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../graphschema";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UserQuery: GraphQLFieldConfigMap<any, any> = {
    GetUser: {
        type: UserType,
        args: {
            id: {type: GraphQLID}
        },
        async resolve(parent, args) {
            const list = await prisma.user.findUnique({
                where: {id: args.id},
                include: {
                    workspacesOwned: true,
                    workspacesWorking: true,
                    assignedCards: true,
                    notification: true
                }
            })
            return list
        }
    },
}