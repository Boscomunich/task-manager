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
import { LOGIN } from "@/graphql/mutation"
import { useMutation } from "@apollo/client"
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { PulseLoader } from "react-spinners"

export default function Signin () {
    const [errMsg, setErrMsg] = useState('')
    // login hook from apollo client
    const [Login, { loading }] = useMutation(LOGIN);
    //signin hook from react auth kit
    const signIn = useSignIn();
    const navigate = useNavigate()


    //form validation
    const formSchema = z.object({
        password: z.string().min(1, {
            message: "pls enter your password",
        }),
        email: z.string().email({
            message: "pls enter a valid email"
        })
    })

    // form resolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        password: "",
        email: ""
        },
    })

    //handle form submit event
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await Login({ variables: { email: values.email, password: values.password } })
            if (response.data) {
                console.log(response.data.Login)
                signIn({
                    auth: {
                        token: response.data.Login.token,
                        type: 'Bearer'
                    },
                    userState: {
                        username: response.data.Login.username,
                        id: response.data.Login.id,
                        email: response.data.Login.email,
                        verified: response.data.Login.verified,
                    }
                })
                navigate('/dashboard')
            }
        } catch (error: any) {
            setErrMsg(error.message)
        }
        
    }

    return (
        <div className="flex justify-center flex-col items-center">
            <Link to='/' className="flex w-full justify-center mt-5">
                <h1 className="text-4xl sm:xl font-bold">Insync</h1>
            </Link>
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="email" {...field} />
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
                            <Input placeholder="password" {...field} className=""/>
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
                            don’t have an account?
                        </p>
                        <Link to='/register' className="text-blue-500">
                            Signup
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}