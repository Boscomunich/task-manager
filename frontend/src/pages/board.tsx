import { GET_WORKSPACE } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import { Plus, UsersRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ADD_COLABORATORS, CREATE_LIST } from "@/graphql/mutation";
import ListDisplay from "@/components/dashboard/listdisplay";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@radix-ui/react-dropdown-menu";

export default function Board () {
    const [addingList, setAddingList] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')

    const params = useParams()

    const [CreateList, { loading }] = useMutation(CREATE_LIST);
    const [AddCollaborators, { loading: loading2 }] = useMutation(ADD_COLABORATORS);

    const { data } = useQuery(GET_WORKSPACE, {
        variables: { id: params.id },
    });

    //handles creation of new list items
    async function createList () {
        if (!name) return
        try {
            const response = await CreateList({ 
                variables: { name, description, workspaceId: params.id },
                refetchQueries: [{ query: GET_WORKSPACE, variables: { id: params.id } }]
            })
            console.log(response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    //handles addiing memebers to board
    async function addMember () {
        if (!email) return
        try {
            const response = await AddCollaborators({ variables: { id: params.id, userEmail: email } })
            console.log(response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <div className="h-screen">
            <div className="flex justify-start items-center h-[50px] gap-4 w-full pl-4 py-3 border-b border-black">
                <div className="w-auto flex justify-start gap-3 items-center">
                    <h1 className="text-2xl sm:xl font-bold">
                        {data?.GetWorkspace.name}
                    </h1>
                </div>
                <div className="w-auto flex justify-start gap-3 items-center">

                    {/**displays a form to add members to baord */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="w-[150px] gap-2">
                                    <UsersRound  />
                                    <p>Add Members</p>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Add members</h4>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center">
                                    <Label >Email</Label>
                                    <Input
                                        id="width"
                                        className="col-span-2 h-8"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    </div>
                                    <Button size='sm' className="w-[50px] gap-2 text-white bg-blue-500 hover:bg-blue-500"
                                    disabled={loading2}
                                    onClick={() => addMember()}>
                                    Add
                                </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>  
                </div>
            </div>
            <ScrollArea className="w-full fixed whitespace-nowrap rounded-md h-[80vh] border p-2">
                <div className="flex justify-start gap-3">
                    {data && (
                        data?.GetWorkspace?.lists?.map((list: any) => (
                            <ListDisplay key={list.id} {...list} workspaceData={data.GetWorkspace}/>
                        ))
                    )
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