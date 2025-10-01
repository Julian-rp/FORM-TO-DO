import { useState } from "react";

export default function TodoForm({ onAdd, disabled }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
  <form onSubmit={submit} className="flex gap-2 bg-[#23272f] p-4 rounded-lg border border-[#2c5282]">
      <input
        className="flex-1 border border-[#2c5282] px-3 py-2 rounded bg-[#23272f] text-[#e2e8f0]"
  placeholder="New task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button
        className="px-4 py-2 bg-[#2c5282] text-white rounded font-bold shadow-md hover:bg-[#1a202c]"
        type="submit"
        disabled={disabled}
      >
  AGREGAR
      </button>
    </form>
  );
}
