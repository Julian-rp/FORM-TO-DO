import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) return;
    login(name.trim(), password.trim(), navigate);
  };

  return (
  <form onSubmit={submit} className="flex flex-col gap-3 max-w-sm mx-auto bg-[#14532d] p-6 rounded-lg border border-[#16a34a] shadow-md">
      <input
        className="border border-[#16a34a] px-3 py-2 rounded bg-[#14532d] text-[#dcfce7]"
  placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        className="border border-[#16a34a] px-3 py-2 rounded bg-[#14532d] text-[#dcfce7]"
  placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-[#16a34a] text-white px-4 py-2 rounded font-bold shadow-md hover:bg-[#15803d]">
        INICIO DE SESION / REGISTRARSE
      </button>
    </form>
  );
}
