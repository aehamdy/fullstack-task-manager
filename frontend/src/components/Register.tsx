import { useState } from "react";
import { registerUser } from "../api/api";
import type { User } from "../api/api";

interface RegisterProps {
  onRegister: (user: User) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function Register({ onRegister, setIsLoggedIn }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerUser({ name, email, password });
      localStorage.setItem("token", res.data.token);
      onRegister(res.data.user);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="flex flex-col w-9/10 gap-6 p-6 border border-neutral-300 rounded-2xl">
      <h2 className="font-semibold text-3xl text-center">Register</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-neutral-300 rounded-md p-2"
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-neutral-300 rounded-md p-2"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-neutral-300 rounded-md p-2"
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md cursor-pointer"
        >
          Register
        </button>
      </form>

      <div className="flex flex-col items-center gap-2">
        <p>Have an account?</p>

        <div className="flex gap-1 5">
          Go to
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}
