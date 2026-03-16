
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
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"]
})


export const loginShema = z.object({
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
