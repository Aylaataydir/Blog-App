import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { registerShema } from '../lib/schemas';

const Register = () => {

    const form = useForm({
        resolver: zodResolver(registerShema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
            confirmPassword: ""
        },
    });

    const onSubmit = (data) => {
        console.log("Form Başarıyla Gönderildi:", data);
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
                    <input
                        {...form.register("password")}
                        className={`input ${form.formState.errors.password ? "input-error" : ""}`}
                    />
                    {form.formState.errors.password && (
                        <span className="text-error text-xs">{form.formState.errors.password.message}</span>
                    )}

                    {/* confirmPassword  */}
                    <label className="label">Confirm Password</label>
                    <input
                        {...form.register("confirmPassword")}
                        className={`input ${form.formState.errors.confirmPassword ? "input-error" : ""}`}
                    />
                    {form.formState.errors.confirmPassword && (
                        <span className="text-error text-xs">{form.formState.errors.confirmPassword.message}</span>
                    )}

                    <button type="submit" className="btn btn-primary mt-4">Kaydol</button>
                </fieldset>
            </form>
        </div>

    )
}

export default Register