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

export default function Signin () {
    // login hook from apollo client
    const [Login, { loading }] = useMutation(LOGIN);
    //signin hook from react auth kit
    const signIn = useSignIn();

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
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div className="flex justify-center items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-20 border shadow-xl py-10 px-10 w-[400px]">
                    <h1 className="text-center text-2xl font-semibold">
                        SignIn
                    </h1>
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
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}