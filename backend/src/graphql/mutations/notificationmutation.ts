import { GraphQLFieldConfigMap, GraphQLID, GraphQLString } from "graphql";
import { NotificationType } from "../graphschema";
import { deleteNotification, updateNotification } from "../../utils/notification";

export const NotificationMutation: GraphQLFieldConfigMap<any, any> = {
    DeleteNotification: {
        type: NotificationType,
        args: {
            id: { type: GraphQLID },
        },
        async resolve(parent, args) {
            return await deleteNotification(args.id)
        }
    },

    UpdateNotification: {
        type: NotificationType,
        args: {
            id: { type: GraphQLID },
        },
        async resolve(parent, args) {
            return await updateNotification(args.id)
        }
    },
};