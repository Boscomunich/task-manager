import { GraphQLFieldConfigMap, GraphQLID, GraphQLString } from "graphql";
import { CardType } from "../graphschema";
import { createCard, deleteCard, includeUserToCard, moveCard, removeUserFromCard, updateCard } from "../../controllers/card";

export const CardMutations: GraphQLFieldConfigMap<any, any> = {
    CreateCard: {
        type: CardType,
        args: {
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            listId: { type: GraphQLID },
            assignedTo: { type: GraphQLID },
            startDate: { type: GraphQLString },
            endDate: { type: GraphQLString },
        },
        async resolve(parent, args) {
            const params : {
                name: string;
                listId: string;
                startDate?: string;
                endDate?: string;
                description?: string;
                assignedTo?: string[];
            } = {
                name: args.name,
                listId: args.listId,
            };
            if (args.description) params.description = args.description
            if (args.assignedTo) params.assignedTo = args.assignedTo
            if (args.startDate) params.startDate = args.startDate
            if (args.endDate) params.endDate = args.endDate
            return await createCard(params)
        }
    },
    UpdateCard: {
        type: CardType,
        args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            listId: { type: GraphQLID },
            startDate: { type: GraphQLString },
            endDate: { type: GraphQLString },
            updatedAt: { type: GraphQLString },
        },
        async resolve (parent, args) {
            const params: {
                id: string
                name?: string;
                listId?: string;
                description?: string;
                startDate?: string;
                endDate?: string;
                updatedAt?: string;
            } = {
                id: args.id
            };

            if (args.name) params.name = args.name;
            if (args.description) params.description = args.description;
            if (args.listId) params.listId = args.listId;
            if (args.startDate) params.startDate = args.startDate;
            if (args.endDate) params.endDate = args.endDate;
            if (args.updatedAt) params.updatedAt = args.updatedAt;
            return await updateCard(params)
        }
    },
    IncludeUserToCard: {
        type: CardType,
        args: {
            id: {type: GraphQLID},
            userId: {type: GraphQLID},
        },
        async resolve (parent, args) {
            return await includeUserToCard(args.id, args.userId)
        }
    },
    RemoveUserFromCard: {
        type: CardType,
        args: {
            id: {type: GraphQLID},
            userId: {type: GraphQLID},
        },
        async resolve (parent, args) {
            return await removeUserFromCard(args.id, args.userId)
        }
    },
    DeleteCard: {
        type: CardType,
        args: {
            id: {type: GraphQLID},
        },
        async resolve (parent, args) {
            return await deleteCard(args.id)
        }
    },
    MoveCard: {
        type: CardType,
        args: {
            id: {type: GraphQLID},
            listId: {type: GraphQLID},
        },
        async resolve (parent, args) {
            return await moveCard(args.id, args.listId)
        }
    }
};