import { GET_WORKSPACE } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import { Plus, UsersRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ADD_COLABORATORS, CREATE_LIST, REMOVE_COLABORATORS } from "@/graphql/mutation";
import ListDisplay from "@/components/dashboard/listdisplay";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@radix-ui/react-dropdown-menu";
import { motion } from 'framer-motion'
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useToasts } from 'react-toast-notifications';

type User = {
    id: string
    username: string
    email: string
    verified: boolean
}

export default function Board () {
    const [addingList, setAddingList] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const { addToast } = useToasts();

    const user = useAuthUser<User>();

    const params = useParams()

    const notify = (message: string, appearance: any) => {
        addToast(message, { appearance, autoDismiss: true });
    };

    const [ CreateList ] = useMutation(CREATE_LIST);
    const [ AddCollaborators, { loading: loading2 }] = useMutation(ADD_COLABORATORS);
    const [ RemoveCollaborators ] = useMutation(REMOVE_COLABORATORS);

    const { data } = useQuery(GET_WORKSPACE, {
        variables: { id: params.id },
    });

    //handles creation of new list items
    async function createList () {
        if (!name) return
        try {
            const response = await CreateList({ 
                variables: { name, workspaceId: params.id },
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
            const response = await AddCollaborators({ variables: { id: params.id, email: user?.email, ownerId: user?.id, userEmail: email } })
            console.log(response)
            if (response.data) notify('user added', 'success')
        } catch (error: any) {
            console.log(error.message)
            notify(error.message, 'error')
        }
    }

    //handles removing user from project
    async function removeMember (id: string) {
        try {
            const response = await RemoveCollaborators({ 
                variables: { id: params.id, ownerId: user?.id, userId: id },
                refetchQueries: [{ query: GET_WORKSPACE, variables: { id: params.id } }]
            })
            console.log(response)
            if (response.data) notify('user removed', 'success')
        } catch (error: any) {
            console.log(error.message)
            notify(error.message, 'error')
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
                                <div>
                                    {
                                        data?.GetWorkspace?.workers?.map((worker: any, index: number) => (
                                            <div key={index} className="flex justify-between gap-1 items-center">
                                                <p>
                                                    {worker.email}
                                                </p>
                                                <Button className="py-1 px-2 bg-transparent text-gray-500 dark:hover:text-white hover:bg-transparent"
                                                onClick={() => removeMember(worker.id)}>
                                                    Remove
                                                </Button>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Add members</h4>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-5 items-center">
                                    <Label >Email</Label>
                                    <Input
                                        id="width"
                                        className="col-span-4 h-8"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    </div>
                                    <Button size='sm' className="w-[100px] gap-2 text-white bg-blue-500 hover:bg-blue-500"
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
                <div className="flex justify-start gap-3 h-auto">
                    {data && (
                        data?.GetWorkspace?.lists?.map((list: any) => (
                            <ListDisplay key={list.id} {...list} workspaceData={data.GetWorkspace}/>
                        ))
                    )
                    }
                    {
                    addingList ?
                        <motion.div
                        layout
                        className="w-[200px] mr-7">
                        <textarea
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                            placeholder="Add new List..."
                            className="w-full rounded border border-blue-500 bg-gray-900 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
                        />
                        <div className="mt-1.5 flex items-center justify-end gap-1.5">
                            <button
                            onClick={() => setAddingList(false)}
                            className="px-3 py-1.5 text-xs text-neutral-500 transition-colors"
                            >
                            Close
                            </button>
                            <button
                            onClick={() => createList()}
                            className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
                            >
                            <span>Add</span>
                            <Plus className="h-4 w-4"/>
                            </button>
                        </div>
                        </motion.div> : 
                        <motion.button
                        layout
                        onClick={() => setAddingList(true)}
                        className="flex w-[200px] items-start gap-1.5 px-3 py-1.5 text-xs text-neutral-500 transition-colors"
                        >
                            <span>Add List</span>
                            <Plus className="h-4 w-4"/>
                        </motion.button>
                    }
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}