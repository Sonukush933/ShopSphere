import { useForm } from 'react-hook-form';
import type { LoginFormInputs } from '../../types/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../validation/auth.schema';
import { useLoginMutation } from '../../services/authApi';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();

async function onSubmit(data: LoginFormInputs) {
  try {
    await login(data).unwrap();
     navigate("/");
  } catch (error) {
    console.error(error);
  }
}
const navigate = useNavigate();

  return (
    <section className="mx-auto mt-20 max-w-md rounded-lg border p-8 shadow">
      <h1 className="mb-6 text-center text-3xl font-bold">Welcome Back</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>

          <input
            type="email"
            className="mt-1 w-full rounded border p-2"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            className="mt-1 w-full rounded border p-2"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-black p-3 text-white"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
