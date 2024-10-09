import { EllipsisVertical, FilePlus, Plus, Trash2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { GET_LIST, GET_WORKSPACE } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CARD, DELETE_LIST, MOVE_CARD } from "@/graphql/mutation";
import CardDisplay from "./carddisplay";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { motion } from 'framer-motion'

type ListType = {
    id: string
    name: string
    description: string
    workspaceData: any
}

export default function ListDisplay ({id, name, workspaceData}: ListType) {

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
        className="w-[300px] isolate whitespace-nowrap rounded-md max-h-[95%] border p-2 mb-2"
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
                addingCard ?
                    <motion.div layout>
                    <textarea
                        onChange={(e) => setCardName(e.target.value)}
                        autoFocus
                        placeholder="Add new task..."
                        className="w-full rounded border border-blue-500 bg-gray-900 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
                    />
                    <div className="mt-1.5 flex items-center justify-end gap-1.5">
                        <button
                        onClick={() => setAddingCard(false)}
                        className="px-3 py-1.5 text-xs text-neutral-500 transition-colors"
                        >
                        Close
                        </button>
                        <button
                        onClick={() => createCard()}
                        className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
                        >
                        <span>Add</span>
                        <Plus className="h-4 w-4"/>
                        </button>
                    </div>
                    </motion.div> : 
                    <motion.button
                    layout
                    onClick={() => setAddingCard(true)}
                    className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-500 transition-colors"
                    >
                    <span>Add card</span>
                    <Plus className="h-4 w-4"/>
                    </motion.button>
                }
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
        </div>
    )
}