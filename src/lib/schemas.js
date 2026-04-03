
import { z } from "zod";



export const registerShema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z
        .string()
        .min(1, "Required")
        .min(8, "Password must be at least 8 characters")
        .regex(/\d+/, "Must contain a digit")
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[@$?!%&*]+/, "Must contain a special character (@$?!%&*)"),
    email: z.email("Invalid email address"),
    firstName: z
        .string()
        .min(2, "First name must be at least 3 characters")
        .max(50, "First name must be less than 50 characters"),
    lastName: z
        .string()
        .min(2, "Last name must be at least 3 characters")
        .max(50, "Last name must be less than 50 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"]
})


export const loginSchema = z.object({
    username: z.string().min(1, "Invalid email address"),
    password: z
        .string()
        .min(1, "Required")
        .min(8, "Password must be at least 8 characters")
        .regex(/\d+/, "Must contain a digit")
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[@$?!%&*]+/, "Must contain a special character (@$?!%&*)"),
})

export const blogSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(150, "Title must be less than 150 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    image: z.string().url("Please enter a valid URL").min(1, "Cover image URL is required"),
    categoryId: z.string().min(1, "Please select a category"),
})
