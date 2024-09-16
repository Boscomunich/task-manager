import { EllipsisVertical, Plus } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { GET_LIST } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CARD } from "@/graphql/mutation";
import CardDisplay from "./carddisplay";

type ListType = {
    id: string
    name: string
    description: string
}

export default function ListDisplay ({id, name, description}: ListType) {

    const [addingCard, setAddingCard] = useState(false)
    const [cardName, setCardName] = useState('')
    const [cardDescription, setCardDescription] = useState('')

    const [CreateCard, { loading }] = useMutation(CREATE_CARD);

    const { data, error } = useQuery(GET_LIST, {
        variables: { id },
    });

    useEffect(() => {
        if (data) {
            console.log(data);
        }
        if (error) {
            console.log(error)
        }
    }, [data, error]);

    async function createCard () {
        if (!name) return 
        try {
            const response = await CreateCard({ variables: { name: cardName, description: cardDescription, listId: id } })
            console.log(response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <ScrollArea className="w-[300px] whitespace-nowrap rounded-md h-auto max-h-[95%] border p-2">
            <div className="flex justify-between">
                <div>{name}</div>
                <EllipsisVertical />
            </div>
            <div>
                {
                    data?.GetList.cards.map((card: any) => (
                        <CardDisplay key={card.id} {...card}/>
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
    )
}