import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { GET_ALL_WORKSPACE } from '@/graphql/query';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
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
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CREATE_WORKSPACE } from '@/graphql/mutation';
import Card from '@/components/dashboard/card';
import { 
        DropdownMenu, 
        DropdownMenuContent, 
        DropdownMenuItem,
        DropdownMenuTrigger 
    } from '@/components/ui/dropdown-menu';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

type User = {
    id: string
    username: string
    email: string
    verified: boolean
}

export default function DashBoard() {

    const [CreateWorkspace, { loading }] = useMutation(CREATE_WORKSPACE);

    const user = useAuthUser<User>();
    const { data } = useQuery(GET_ALL_WORKSPACE, {
        variables: { id: user?.id },
    });

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
            const response = await CreateWorkspace({ variables: { name: values.name, description: values.description, userId: user?.id } })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

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
                        <DialogTrigger className="bg-blue-500 text-white py-2 px-3 rounded-md">
                            Create
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
                                        Create
                                    </Button>
                                </form>
                                </Form>
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className='w-[50%] flex justify-end mx-3'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                            <div className='h-10 w-10 text-center pt-2 text-white font-semibold rounded-full bg-red-400'>
                                {user?.username.slice(0, 2)}
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='start'>
                            <DropdownMenuItem className="gap-2 text-[12px] cursor-pointer"
                            >
                                some
                            </DropdownMenuItem>
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
                        Recent project
                    </h1>
                    {
                        data && (
                            data.GetAllWorkspace?.map((item: any) => (
                                <Card key={item.id} {...item}/>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
}
