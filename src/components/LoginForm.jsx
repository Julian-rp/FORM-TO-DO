import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) return;
    login(name.trim(), password.trim());
  };

  return (
  <form onSubmit={submit} className="flex flex-col gap-3 max-w-sm mx-auto bg-[#23272f] p-6 rounded-lg border border-[#2c5282] shadow-md">
      <input
        className="border border-[#2c5282] px-3 py-2 rounded bg-[#23272f] text-[#e2e8f0]"
  placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        className="border border-[#2c5282] px-3 py-2 rounded bg-[#23272f] text-[#e2e8f0]"
  placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-[#2c5282] text-white px-4 py-2 rounded font-bold shadow-md hover:bg-[#1a202c]">
        INICIO DE SESION / REGISTRARSE
      </button>
    </form>
  );
}
