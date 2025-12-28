import { useState } from "react";
import { loginUser } from "../api/api";
import { AxiosError } from "axios";
import type { User } from "../api/api";

interface LoginProps {
  onLogin: (user: User) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function Login({ onLogin, setIsLoggedIn }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="flex flex-col w-9/10 gap-6 p-6 border border-neutral-300 rounded-2xl">
      <h2 className="font-semibold text-3xl text-center">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-neutral-300 rounded-md p-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-neutral-300 rounded-md p-2"
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md cursor-pointer"
        >
          Login
        </button>

        {error && <p className="text-center text-red-500">{error}</p>}
      </form>

      <div className="flex flex-col items-center gap-2">
        <p>Don’t have an account?</p>

        <div className="flex gap-1.5">
          Go to{" "}
          <button
            onClick={() => setIsLoggedIn(true)}
            className="text-blue-500 cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </section>
  );
}
