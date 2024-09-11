import { GraphQLBoolean, GraphQLFieldConfigMap, GraphQLID, GraphQLString } from "graphql";
import { CheckListType } from "../graphschema";
import { createCheckList, deleteCheckList, updateCheckList } from "../../controllers/checklist";

export const CheckListMutations: GraphQLFieldConfigMap<any, any> = {
    CreateCheckList: {
        type: CheckListType,
        args: {
            name: { type: GraphQLString },
            cardId: {type: GraphQLID}
        },
        async resolve (parent, args) {
            return await createCheckList(args.name, args.cardId)
        }
    },
    DeleteCheckList: {
        type: CheckListType,
        args: {
            id: {type: GraphQLID}
        },
        async resolve (parent, args) {
            return await deleteCheckList(args.id)
        }
    },
    UpdateCheckList: {
        type: CheckListType,
        args: {
            id: {type: GraphQLID},
            checked: {type: GraphQLBoolean}
        },
        async resolve (parent, args) {
            return await updateCheckList(args.id, args.checked)
        }
    },
}