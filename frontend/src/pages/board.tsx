import { GET_WORKSPACE } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CREATE_LIST } from "@/graphql/mutation";
import ListDisplay from "@/components/dashboard/listdisplay";

export default function Board () {
    const [addingList, setAddingList] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const params = useParams()

    const [CreateList, { loading }] = useMutation(CREATE_LIST);

    const { data, error } = useQuery(GET_WORKSPACE, {
        variables: { id: params.id },
    });

    useEffect(() => {
        console.log(params.id)
        if (data) {
            console.log(data);
        }
        if (error) {
            console.log(error)
        }
    }, [data, error]);

    async function createList () {
        if (!name) return
        try {
            const response = await CreateList({ variables: { name, description, workspaceId: params.id } })
            console.log(response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <div className="h-screen">
            <div className="flex justify-between items-center h-[50px] gap-4 w-full pl-4 py-3 border-b border-black">
                <div className="w-[50%] flex justify-start gap-3 items-center">
                    <h1 className="text-2xl sm:xl font-bold">
                        {data?.GetWorkspace.name}
                    </h1>
                </div>
            </div>
            <ScrollArea className="w-full fixed whitespace-nowrap rounded-md h-[80vh] border p-2">
                <div className="flex justify-start gap-3">
                    {
                        data?.GetWorkspace.lists.map((list: any) => (
                            <ListDisplay key={list.id} {...list}/>
                        ))
                    }
                    {
                        !addingList ? 
                        <Button className='w-[200px] bg-blue-500 rounded-sm' 
                        onClick={() => setAddingList(true)}>
                            <div className="flex items-center justify-start gap-2">
                                <Plus className="text-white" />
                                <p>Add another list</p>
                            </div>
                        </Button> :
                        <div className="space-y-4 border shadow-xl py-2 px-2 w-[200px] bg-blue-400">
                            <Input 
                            placeholder="name"
                            className="h-7 rounded-sm"
                            onChange={(e) => setName(e.target.value)}/>
                            <Input 
                            placeholder="description" 
                            className="h-7 rounded-sm"
                            onChange={(e) => setDescription(e.target.value)}/>
                            <div className="flex justify-between items-center">
                                <Button 
                                variant='outline'
                                size='sm'
                                className="w-[80px] text-center"
                                disabled={loading}
                                onClick={() => createList()}>
                                    add
                                </Button>
                                <Button 
                                variant='destructive'
                                size='sm'
                                className="w-[80px] text-center"
                                onClick={() => setAddingList(false)}>
                                    close
                                </Button>
                            </div>
                        </div>
                    }
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}