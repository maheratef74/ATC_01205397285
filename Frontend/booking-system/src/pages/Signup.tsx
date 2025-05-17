import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Link } from "react-router"
import { useAuth } from "@/hooks/useAuth"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Gender } from "@/lib/constant"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().min(11, {
        message: "Phone number must be at least 11 characters.",
    }).refine((value) => /^\d+$/.test(value), {
        message: "Phone number must contain only numbers.",
    }),
    dateOfBirth: z.string().min(1, {
        message: "Date of birth is required.",
    }),
    address: z.string().min(1, {
        message: "Address is required.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    gender: z.enum(["Male", "Female"], {
        message: "Please select a valid gender.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default function Signup() {
    const { signup, signupIsPending } = useAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            dateOfBirth: "",
            address: "",
            password: "",
            confirmPassword: "",
            gender: "Male",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const gender = values.gender === "Male" ? Gender.Male : Gender.Female

        console.log(values, gender);

        signup({ ...values, gender: gender })

    }

    return (
        <div className="flex my-30 w-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-[800px]">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
                    <CardDescription>
                        Sign up to get started with EventHub
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium">
                                                Name <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input className="text-base font-medium" placeholder="Enter your name" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium">
                                                Email <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input className="text-base font-medium" placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium">
                                                Password <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    className="text-base font-medium"
                                                    placeholder="Create a password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium">
                                                Confirm Password <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    className="text-base font-medium"
                                                    placeholder="Confirm your password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium">
                                                Phone <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="tel" maxLength={11} className="text-base font-medium" placeholder="Enter your phone number" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dateOfBirth"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium">
                                                Date of Birth <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    className="text-base font-medium"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium">
                                                Address <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input className="text-base font-medium" placeholder="Enter your address" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium">
                                                Gender <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your gender" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <Button type="submit" className="w-full" disabled={signupIsPending}>
                                {signupIsPending ? "Creating Account..." : "Create Account"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary hover:underline">
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
} 