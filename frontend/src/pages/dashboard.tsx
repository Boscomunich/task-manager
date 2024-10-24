import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { GET_USER } from '@/graphql/query';
import { useMutation, useQuery } from '@apollo/client';
import {PulseLoader} from "react-spinners";
import { Button } from '@/components/ui/button';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ACCEPT_INVITE, CREATE_WORKSPACE, DELETE_NOTIFICATION, UPDATE_NOTIFICATION } from '@/graphql/mutation';
import Card from '@/components/dashboard/card';
import { 
        DropdownMenu, 
        DropdownMenuContent, 
        DropdownMenuItem,
        DropdownMenuTrigger 
    } from '@/components/ui/dropdown-menu';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Bell, Trash2 } from 'lucide-react';
import { useToasts } from 'react-toast-notifications';

type User = {
    id: string
    username: string
    email: string
    verified: boolean
}

type Notification = {
    type: string,
    message: string,
    id: string,
    projectId: string,
    createdAt: string
    read: boolean
}

const NotificationItem = ({ type, message, id, projectId, read }: Notification) => {
    const [isOpen, setIsOpen] = useState(false);

    const user = useAuthUser<User>();

    const { addToast } = useToasts();

    const notify = (message: string, appearance: any) => {
        addToast(message, { appearance, autoDismiss: true });
    };

    const [AcceptInvite, { loading }] = useMutation(ACCEPT_INVITE);
    const [ DeleteNotification, { loading: loading2 } ] = useMutation(DELETE_NOTIFICATION);
    const [ UpdateNotification ] = useMutation(UPDATE_NOTIFICATION);


    // accept invite and delete notification
    async function acceptRequest () {
        try {
            const response = await AcceptInvite(
                { variables: { projectId, userId: user?.id } }
            )
            if (response.data) {
                await DeleteNotification ({
                    variables: { id },
                    refetchQueries: [{ query: GET_USER, variables: {id: user?.id}}]
                })
            }
            console.log(response)
            notify('invite accepted', 'success')
        } catch (error: any) {
            console.log(error)
            notify(error.message, 'error')
        }
    }

    //reject invitation and delete request
    async function rejectRequest () {
        try {
            const response = await DeleteNotification ({
                variables: { id },
                refetchQueries: [{ query: GET_USER, variables: {id: user?.id}}]
            })
            console.log(response)
            notify('invite rejected', 'success')
        } catch (error: any) {
            console.log(error)
            notify(error.message, 'error')
        }
    }

    //deletes notification
    async function deleteNotification () {
        try {
            const response = await DeleteNotification(
                { variables: { id },
                refetchQueries: [{ query: GET_USER, variables: { id: user?.id } }]
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    } 

    //deletes notification
    async function updateNotification () {
        try {
            const response = await UpdateNotification(
                { variables: { id } })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    } 

    return (
        <div className={cn ("border-rare border shadow-md rounded-md w-full cursor-pointer p-2")}>
            <div className='flex items-center justify-between h-5'
            >
                <div
                className={cn ("text-lg font-medium w-[80%]", read && 'text-slate-500')}
                onClick={() => {
                    setIsOpen(!isOpen)
                    if (!read) {
                        updateNotification()
                    }
                }}>
                    {type}
                </div>
                <Button 
                className='text-[10px] p-1 mt-1 bg-transparent hover:bg-transparent text-gray-500'
                onClick={() => deleteNotification()}
                disabled={loading2}>
                    <Trash2 size={20}/>
                </Button>
            </div>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden text-[12px] p-1"
            >
                <p className="mt-2">{message}</p>
            </motion.div>
            {
                projectId && (
                    <div className='flex text-[12px] justify-center gap-2'>
                        <Button 
                        className='py-1 dark:bg-gray-900 w-[50%] text-green-500'
                        onClick={() => acceptRequest()}
                        disabled={loading}>
                            accept
                        </Button>
                        <Button 
                        className='py-1 w-[50%] text-red-500 dark:bg-gray-600'
                        onClick={() => rejectRequest()}
                        disabled={loading2}>
                            reject
                        </Button>
                    </div>
                )
            }
        </div>
    );
};

export default function DashBoard() {

    const [CreateWorkspace, { loading }] = useMutation(CREATE_WORKSPACE);
    const [newMsg, setNewMsg] = useState(null)
    const [active, setActive] = useState(false)

    const user = useAuthUser<User>();

    const { data } = useQuery(GET_USER, {
        variables: { id: user?.id },
    });


    useEffect (() => {
        const unreadCount = data?.GetUser?.notification?.filter((item: any) => !item.read)?.length;
        console.log(unreadCount)
        setNewMsg(unreadCount)
        console.log(data)
    }, [ data ])

    const signOut = useSignOut()
    const navigate = useNavigate()

    //form validation
    const formSchema = z.object({
        name: z.string().min(1, {
            message: "pls enter a name",
        }),
        description: z.string().min(1, {
            message: "pls enter a description of your board",
        }),
    })

    // form resolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        description: ""
        },
    })

    //handle form submit event
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await CreateWorkspace(
                { variables: { name: values.name, description: values.description, userId: user?.id },
                refetchQueries: [{ query: GET_USER, variables: { id: user?.id } }]
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    //handles signout
    async function handleSignout () {
        await signOut()
        navigate('/login')
    }

    return (
        <div>
            <div className="flex justify-between items-center h-[50px] gap-4 w-screen pl-4 py-3 border-b border-black fixed top-0 z-20">
                <div className="w-[50%] flex justify-start gap-3 items-center">
                    <h1 className="text-2xl sm:xl font-bold">Insync</h1>
                    <Dialog>
                        <DialogTrigger className="bg-blue-500 text-sm text-white py-1 px-2 rounded-md">
                            Create New Board
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle className='text-center'>Create a new Board</DialogTitle>
                            <DialogDescription className='flex justify-center'>
                                <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 border shadow-xl py-10 px-10 w-[400px]">
                                    <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormControl>
                                            <Input placeholder="name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormControl>
                                            <Input placeholder="description" {...field} className=""/>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Button 
                                    type="submit" 
                                    variant='outline'
                                    disabled={loading}>
                                        {
                                            loading ? <PulseLoader size={5} color='#3219F5'/> : 'Create'
                                        }
                                    </Button>
                                </form>
                                </Form>
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className='w-[50%] flex justify-end mx-3'>
                    <div 
                    onClick={() => setActive(!active)}
                    className='relative px-4 py-2 text-neutral-600 cursor-pointer'
                    >
                        <Bell />
                        <div className='absolute z-20 top-0 font-bold right-4 text-green-500'>
                            {newMsg}
                        </div>
                    </div>
                    {
                        active && (
                            <motion.div 
                            initial={{height: 0, opacity: 0}}
                            animate={active ? {height: 'auto', opacity: 1}: {height: 0, opacity: 0}}
                            transition={{duration: 0.2}}
                            className='absolute top-[70%] right-10 w-[300px] p-2 dark:bg-gray-900 bg-slate-200 rounded-lg flex flex-col gap-3 overflow-hidden'>
                            {
                                data?.GetUser?.notification?.length > 0 ? (
                                    data.GetUser.notification.map((item: Notification) => (
                                        <NotificationItem key={item.id} {...item} />
                                    ))
                                ) : (
                                    <div>Empty</div>
                                )
                            }
                            </motion.div>
                        )
                    }
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                            <div className='h-10 w-10 text-center pt-2 text-white font-semibold rounded-full bg-blue-500'>
                                {user?.username.slice(0, 2)}
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='start'>
                            <DropdownMenuItem className="gap-2 text-[12px] cursor-pointer"
                            onClick={() => handleSignout()}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>     
                </div>
            </div>
            <div className='mt-[50px] lg:px-10 md:px-5 sm:px-3'>
                <div>
                    <h1 className='text-2xl font-semibold pt-10'>
                        My project
                    </h1>
                    <div className='flex justify-start flex-wrap gap-3'>
                    {
                        data?.GetUser?.workspacesOwned?.map((item: any) => (
                                <Card {...item} key={item.id} />
                        ))
                    }
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold pt-10'>
                        Other project
                    </h1>
                    {
                        data?.GetUser?.workspacesWorking?.map((item: any) => (
                            <div 
                            className='flex justify-start flex-wrap'
                            key={item.id} 
                            >
                                <Card {...item}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
