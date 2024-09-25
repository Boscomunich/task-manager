import { EllipsisVertical, Plus, Trash2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { GET_LIST, GET_WORKSPACE } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CARD, DELETE_LIST, MOVE_CARD } from "@/graphql/mutation";
import CardDisplay from "./carddisplay";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

type ListType = {
    id: string
    name: string
    description: string
    workspaceData: any
}

export default function ListDisplay ({id, name, description, workspaceData}: ListType) {

    const [addingCard, setAddingCard] = useState(false)
    const [cardName, setCardName] = useState('')
    const [cardDescription, setCardDescription] = useState('')
    const [MoveCard, { loading: loading2 }] = useMutation(MOVE_CARD);

    const [CreateCard, { loading }] = useMutation(CREATE_CARD);

    const { data, error } = useQuery(GET_LIST, {
        variables: { id },
        fetchPolicy: 'cache-and-network',
    });

    const [DeleteList ] = useMutation(DELETE_LIST);

    //handles deletion of list items
    async function deleteList () {
        try {
            const response = await DeleteList({ 
                variables: { id },
                refetchQueries: [{ query: GET_WORKSPACE, variables: { id: workspaceData.id } }]
            })
            console.log(response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    //handles creation of new cards
    async function createCard() {
        if (!cardName) return; // Ensure cardName is defined

        try {
            const response = await CreateCard({
                variables: { name: cardName, description: cardDescription, listId: id },
                refetchQueries: [{ query: GET_LIST, variables: { id } }],
            })
            console.log(response);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    //handles the drag and drop functionality of moving cards between lists
    async function moveCard(event: any) {
        event.preventDefault()
        const cardId = event.dataTransfer.getData('cardId')
        const prevListId = event.dataTransfer.getData('listId')
        try {
            console.log('called')
            const response = await MoveCard({ 
                variables: { 
                    id: cardId, 
                    listId: id, 
                },
                refetchQueries: [
                    { query: GET_LIST, variables: { id } },
                    { query: GET_LIST, variables: { id: prevListId } }
                ]
            });
            console.log(cardId, id)
            console.log(response);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    //handles the onDragStart
    async function handleDragStart (e: any, cardId: string) {
        e.dataTransfer.setData('cardId', cardId)
        e.dataTransfer.setData('listId', id )
    }

    function handleDragOver (event:any) {
        event.preventDefault()
    }

    return (
        <div 
        className="w-[300px] whitespace-nowrap rounded-md h-auto max-h-[95%] border p-2 mb-2"
        onDrop={(event) => moveCard(event)}
        onDragOver={(event) => handleDragOver(event)}>
        <ScrollArea className="w-full h-full">
            <div className="flex justify-between">
                <div>{name}</div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                        <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='center'>
                        <DropdownMenuItem className="gap-2 text-[12px] cursor-pointer"
                        onClick={() => deleteList()}>
                            <Trash2 className="text-[12px]"/>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div>
                {
                    data?.GetList.cards.map((card: any) => (
                        <CardDisplay key={card.id}  {...card} listId={id} workspaceData={workspaceData} handleDragStart={handleDragStart}/>
                    ))
                }
            </div>
            <div>
            {
                !addingCard ? 
                <Button className='w-[200px] bg-blue-500 rounded-sm' 
                onClick={() => setAddingCard(true)}>
                    <div className="flex items-center justify-start gap-2">
                        <Plus className="text-white" />
                        <p>Add another card</p>
                    </div>
                </Button> :
                <div className="space-y-4 border shadow-xl py-2 px-2 w-[200px] bg-blue-400">
                    <Input 
                    placeholder="name"
                    className="h-7 rounded-sm"
                    onChange={(e) => setCardName(e.target.value)}/>
                    <Input 
                    placeholder="description" 
                    className="h-7 rounded-sm"
                    onChange={(e) => setCardDescription(e.target.value)}/>
                    <div className="flex justify-between items-center">
                        <Button 
                        variant='outline'
                        size='sm'
                        className="w-[80px] text-center"
                        disabled={loading}
                        onClick={() => createCard()}>
                            add
                        </Button>
                        <Button 
                        variant='destructive'
                        size='sm'
                        className="w-[80px] text-center"
                        onClick={() => setAddingCard(false)}>
                            close
                        </Button>
                    </div>
                </div>
            }
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
        </div>
    )
}