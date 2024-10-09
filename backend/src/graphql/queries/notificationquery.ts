import { GraphQLFieldConfigMap, GraphQLID } from "graphql";
import { NotificationType } from "../graphschema";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const NotificationQuery: GraphQLFieldConfigMap<any, any> = {
    GetNotification: {
        type: NotificationType,
        args: {
            userId: {type: GraphQLID}
        },
        async resolve(parent, args) {
            const notification = await prisma.notification.findMany({
                where: { userId: args.userId },
            })
            return notification
        }
    },
}