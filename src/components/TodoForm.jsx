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
  <form onSubmit={submit} className="flex gap-2 bg-[#14532d] p-4 rounded-lg border border-[#16a34a]">
      <input
        className="flex-1 border border-[#16a34a] px-3 py-2 rounded bg-[#14532d] text-[#dcfce7]"
  placeholder="New task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button
        className="px-4 py-2 bg-[#16a34a] text-white rounded font-bold shadow-md hover:bg-[#15803d]"
        type="submit"
        disabled={disabled}
      >
  AGREGAR
      </button>
    </form>
  );
}
