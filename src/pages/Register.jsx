import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { registerShema } from '../lib/schemas';
import { Link, useNavigate } from 'react-router-dom';
import useAuthCall from '../hooks/useAuthCall';
import registerImage from "../../assets/login.jpg"

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
            confirmPassword: "",
        },
    });

    const { isSubmitting } = form.formState

    const onSubmit = async (UserCredentials) => {
        await register(UserCredentials)
        console.log(UserCredentials)

    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-bg-body px-2 py-10">
            <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl ">
                <div className="hidden flex-3 md:block bg-bg-primary ">
                    <img src={registerImage} alt="Register Visual" className="object-cover h-full w-lg" />
                </div>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-2 flex-col gap-2 justify-center px-8 py-10 w-full  bg-bg-primary "
                    style={{ fontFamily: 'var(--font-poppins)' }}
                >
                    <h2 className="text-2xl font-bold text-center mb-2 text-bg-secondary tracking-wide">Register</h2>

                     {/* Username */}

                    <label className="text-xs font-semibold mb-1 text-gray-700">Username</label>
                    <input
                        {...form.register("username")}
                        spellCheck={false}
                        className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none focus:border-bg-secondary transition ${form.formState.errors.username ? "border-red-400" : "border-bg-btn-2"}`}
                        autoComplete="username"
                    />
                    {form.formState.errors.username && (
                        <span className="text-xs text-red-500 -mt-1.5 mb-1">{form.formState.errors.username?.message}</span>
                    )}


                     {/* First Name & Last Name  */}
                    
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="text-xs font-semibold mb-1 text-gray-700">First Name</label>
                            <input
                                {...form.register("firstName")}
                                spellCheck={false}
                                className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none focus:border-bg-secondary transition ${form.formState.errors.firstName ? "border-red-400" : "border-bg-btn-2"}`}
                                autoComplete="given-name"
                            />
                            {form.formState.errors.firstName && (
                                <span className="text-xs text-red-500 -mt-1.5 mb-1">{form.formState.errors.firstName?.message}</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-semibold mb-1 text-gray-700">Last Name</label>
                            <input
                                {...form.register("lastName")}
                                spellCheck={false}
                                className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none focus:border-bg-secondary transition ${form.formState.errors.lastName ? "border-red-400" : "border-bg-btn-2"}`}
                                autoComplete="family-name"
                            />
                            {form.formState.errors.lastName && (
                                <span className="text-xs text-red-500 -mt-1.5 mb-1">{form.formState.errors.lastName?.message}</span>
                            )}
                        </div>
                    </div>

                     {/* Email */}

                    <label className="text-xs font-semibold mb-1 text-gray-700">E-Mail</label>
                    <input
                        {...form.register("email")}
                        spellCheck={false}
                        className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none focus:border-bg-secondary transition ${form.formState.errors.email ? "border-red-400" : "border-bg-btn-2"}`}
                        autoComplete="email"
                    />
                    {form.formState.errors.email && (
                        <span className="text-xs text-red-500 -mt-1.5 mb-1">{form.formState.errors.email?.message}</span>
                    )}

                    {/* Password */}

                    <label className="text-xs font-semibold mb-1 text-gray-700">Password</label>
                    <input
                        type="password"
                        {...form.register("password")}
                        className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none focus:border-bg-secondary transition ${form.formState.errors.password ? "border-red-400" : "border-bg-btn-2"}`}
                        autoComplete="new-password"
                    />
                    {form.formState.errors.password && (
                        <span className="text-xs text-red-500 -mt-1.5 mb-1">{form.formState.errors.password?.message}</span>
                    )}

                   
                    <label className="text-xs font-semibold mb-1 text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        {...form.register("confirmPassword")}
                        className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none focus:border-bg-secondary transition ${form.formState.errors.confirmPassword ? "border-red-400" : "border-bg-btn-2"}`}
                        autoComplete="new-password"
                    />
                    {form.formState.errors.confirmPassword && (
                        <span className="text-xs text-red-500 -mt-1.5 mb-1">{form.formState.errors.confirmPassword?.message}</span>
                    )}

                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="mt-3 w-full bg-bg-btn hover:bg-bg-secondary text-white font-semibold py-2 rounded-lg shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>

                    <div className="text-center mt-2 text-xs text-gray-600">
                        Already have an account?
                        <Link to="/login" className="text-bg-secondary font-bold underline ml-1">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register