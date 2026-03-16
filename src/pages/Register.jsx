import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { registerShema } from '../lib/schemas';
import { useNavigate } from 'react-router-dom';
import useAuthCall from '../hooks/useAuthCall';

const Register = () => {

    const navigate = useNavigate()
    const { register } = useAuthCall()

    const form = useForm({
        resolver: zodResolver(registerShema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
            confirmPassword: ""
        },
    });

    const onSubmit = async(UserCredentials) => {
        console.log("Form Başarıyla Gönderildi:", UserCredentials);
        await register(UserCredentials)
        navigate("/")
    };

    return (
        <div className='mt-10 mx-auto w-full'>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
                    <legend className="fieldset-legend">Kayıt Ol</legend>

                    {/* Username */}
                    <label className="label">Username</label>
                    <input
                        {...form.register("username")}
                        className={`input ${form.formState.errors.username ? "input-error" : ""}`}
                    />
                    {form.formState.errors.username && (
                        <span className="text-error text-xs">{form.formState.errors.username.message}</span>
                    )}

                    {/* firstname */}
                    <label className="label">First Name</label>
                    <input
                        {...form.register("firstName")}
                        className={`input ${form.formState.errors.firstName ? "input-error" : ""}`}
                    />
                    {form.formState.errors.firstName && (
                        <span className="text-error text-xs">{form.formState.errors.firstName.message}</span>
                    )}

                    {/* lastname */}
                    <label className="label">Last Name</label>
                    <input
                        {...form.register("lastName")}
                        className={`input ${form.formState.errors.lastName ? "input-error" : ""}`}
                    />
                    {form.formState.errors.lastName && (
                        <span className="text-error text-xs">{form.formState.errors.lastName.message}</span>
                    )}

                    {/* Email */}
                    <label className="label">E-Mail</label>
                    <input 
                        {...form.register("email")}
                        className={`input ${form.formState.errors.email ? "input-error" : ""}`}
                    />
                    {form.formState.errors.email && (
                        <span className="text-error text-xs">{form.formState.errors.email.message}</span>
                    )}

                    {/* password  */}
                    <label className="label">Password</label>
                    <input type='password'
                        {...form.register("password")}
                        className={`input ${form.formState.errors.password ? "input-error" : ""}`}
                    />
                    {form.formState.errors.password && (
                        <span className="text-error text-xs">{form.formState.errors.password.message}</span>
                    )}

                    {/* confirmPassword  */}
                    <label className="label">Confirm Password</label>
                    <input type='password'
                        {...form.register("confirmPassword")}
                        className={`input ${form.formState.errors.confirmPassword ? "input-error" : ""}`}
                    />
                    {form.formState.errors.confirmPassword && (
                        <span className="text-error text-xs">{form.formState.errors.confirmPassword.message}</span>
                    )}

                    <button type="submit" className="btn btn-primary mt-4">Register</button>
                </fieldset>
            </form>
        </div>

    )
}

export default Register