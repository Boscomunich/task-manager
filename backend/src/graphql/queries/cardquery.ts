import { GraphQLFieldConfigMap, GraphQLID, GraphQLString } from "graphql";
import { CardType, ListType } from "../graphschema";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CardQuery: GraphQLFieldConfigMap<any, any> = {
    GetAllCard: {
        type: ListType,
        args: {
            listId: {type: GraphQLID}
        },
        async resolve(parent, args) {
            const allCards = await prisma.card.findMany({
                where: {listId: args.id}
            })
            return allCards
        }
    },
    GetCard: {
        type: CardType,
        args: {
            id: {type: GraphQLID}
        },
        async resolve(parent, args) {
            const card = await prisma.card.findUnique({
                where: {id: args.id},
                include: {
                    checkList: true,
                    assignedTo: true
                }
            })
            return card
        }
    },
}