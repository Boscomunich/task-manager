import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from '@apollo/client';
import { REGISTER } from "@/graphql/mutation"
import { useState } from "react"
import { PulseLoader } from "react-spinners"
import { Link } from "react-router-dom"


export default function Signup () {
    const [errMsg, setErrMsg] = useState('')
    //register hook from apollo client
    const [Register, { loading }] = useMutation(REGISTER);


    // form validation with zod
    const formSchema = z.object({
        password: z.string().min(1, {
            message: "pls enter your password",
        }),
        username: z.string().min(3, {
            message: "username must be at least 3 characters",
        }),
        email: z.string().email({
            message: "pls enter a valid email"
        })
    })

    //form resolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        username:"",
        password: "",
        email: ""
        },
    })

    //summits user dat for registeration
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await Register ({ variables: { username: values.username, email: values.email, password: values.password } });
            console.log(response)
        } catch (error: any) {
            setErrMsg(error.message)
        }
    }

    return (
        <div className="flex justify-center items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-20 border shadow-xl py-10 px-10 w-[400px]">
                    <h1 className="text-center text-2xl font-semibold">
                        SignIn
                    </h1>
                    <p className="text-sm text-red-400">
                        {
                            errMsg
                        }
                    </p>
                    <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="email" {...field} type=""/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="password" {...field} type="password"/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button 
                    type="submit"
                    variant='outline'
                    disabled={loading}>
                        {
                            loading ? 
                            <PulseLoader size={5} color='#3219F5'/> 
                            :
                            'Submit'
                        }
                    </Button>
                    <div className="flex justify-center gap-4 items-center">
                        <p className="text-sm">
                            Already have an account?
                        </p>
                        <Link to='/login' className="text-blue-500">
                            Signin
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}