import { z } from "zod"
export const SignUpValidation= z.object({
    name: z.string().min(2,{message:"Name is too short"}),
    username: z.string().min(2,{message:"Username is too short"}),
    email: z.string().email(),
    password: z.string().min(8,{message:"Password should be atleast 8 characters"}).max(50),
}) 
export const SignInValidation= z.object({
    email: z.string().email(),
    password: z.string().min(8,{message:"Password should be atleast 8 characters"}).max(50),
})

export const PostValidation= z.object({
    caption:z.string().min(5).max(2200),
    file:z.custom<File[]>(),
    location:z.string().min(2).max(100),
    tags:z.string(),
})