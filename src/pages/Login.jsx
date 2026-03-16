import React from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthCall from '../hooks/useAuthCall';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../lib/schemas';

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

  const onSubmit = async (UserCredentials) => {
    console.log("Form Başarıyla Gönderildi:", UserCredentials);
    await login(UserCredentials)
   
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
            <span className="text-error text-xs">{form.formState.errors.username?.message}</span>
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

          <button type="submit" className="btn btn-primary mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Login