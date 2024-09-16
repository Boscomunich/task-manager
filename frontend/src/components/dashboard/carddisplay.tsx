import { EllipsisVertical, Fullscreen, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMutation } from "@apollo/client"
import { DELETE_CARD } from "@/graphql/mutation"
import { GET_LIST } from "@/graphql/query"

type CardType = {
    id: string
    name: string
    description: string,
    listId: string
}

export default function CardDisplay ({id, name, description, listId}: CardType) {

    const [DeleteCard] = useMutation(DELETE_CARD);

    async function deleteCard () {
        if (!name) return 
        try {
            const response = await DeleteCard({ 
                variables: { id },
                refetchQueries: [{ query: GET_LIST, variables: { id: listId } }],
            })
            console.log(response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <div 
        draggable
        className="w-full flex justify-between h-auto py-2 px-3 bg-slate-200 dark:bg-gray-800 my-2 rounded-sm text-wrap">
            <h1>
                {name}
            </h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='center'>
                    <DropdownMenuItem className="gap-2 text-[12px] cursor-pointer"
                    onClick={() => deleteCard()}>
                        <Trash2 className="text-[12px]"/>
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-[12px] cursor-pointer">
                        <Fullscreen className="text-[12px]"/>
                        View card
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}