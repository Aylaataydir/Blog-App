import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useAuthCall from '../hooks/useAuthCall';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../lib/schemas';
import loginImage from "../../assets/login.jpg"

const Login = () => {


  const navigate = useNavigate()
  const { login } = useAuthCall()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState

  const onSubmit = async (UserCredentials) => {
    await login(UserCredentials)

  };


  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg-body px-2 py-10">
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden max-w-3xl w-full">
        <div className="flex-1 hidden md:block bg-bg-primary">
          <img src={loginImage} alt="Login Visual" className="object-cover h-full " />
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-4 justify-center px-8 py-10 w-full max-w-md bg-bg-primary"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <h2 className="text-2xl font-bold text-center mb-2 text-bg-secondary tracking-wide">Login</h2>

          {/* Username */}
          <label className="text-xs font-semibold mb-1 text-gray-700">Username</label>
          <input
            {...form.register("username")}
            className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none focus:border-bg-secondary transition ${form.formState.errors.username ? "border-red-400" : "border-bg-btn-2"}`}
            autoComplete="username"
          />
          {form.formState.errors.username && (
            <span className="text-xs text-red-500 -mt-1.5 mb-1">{form.formState.errors.username?.message}</span>
          )}

          {/* Password */}
          <label className="text-xs font-semibold mb-1 text-gray-700 mt-2">Password</label>
          <input
            type="password"
            {...form.register("password")}
            className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none focus:border-bg-secondary transition ${form.formState.errors.password ? "border-red-400" : "border-bg-btn-2"}`}
            autoComplete="current-password"
          />
          {form.formState.errors.password && (
            <span className="text-xs text-red-500 -mt-1.5 mb-1">{form.formState.errors.password.message}</span>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className="mt-3 w-full bg-bg-btn hover:bg-bg-secondary text-white font-semibold py-2 rounded-lg shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-2 text-xs text-gray-600">
            Don&apos;t have an account?
            <Link to="/register" className="text-bg-secondary font-bold underline ml-1">Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login




