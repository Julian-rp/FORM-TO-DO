import { useState } from "react";

export default function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const saveEdit = () => {
    if (!newText.trim()) return;
    onEdit(task.id, newText.trim());
    setIsEditing(false);
  };

  return (
  <li className="flex flex-col gap-2 p-3 border border-[#2c5282] rounded-lg bg-[#23272f] text-[#e2e8f0] shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggle(task.id, e.target.checked)}
          />
          {isEditing ? (
            <input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="border border-[#2c5282] px-2 py-1 rounded bg-[#23272f] text-[#e2e8f0]"
            />
          ) : (
            <div
              className={`font-bold tracking-wide text-lg ${task.completed ? "line-through text-[#718096]" : ""}`}
            >
              {task.text}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <button
              className="px-2 py-1 bg-[#2c5282] text-white rounded font-bold text-sm shadow-md hover:bg-[#1a202c]"
              onClick={saveEdit}
            >
              Guardar ✔️
            </button>
          ) : (
            <button
              className="px-2 py-1 border border-[#2c5282] rounded font-bold text-sm bg-[#23272f] text-[#e2e8f0] shadow-md hover:bg-[#2c5282] hover:text-white"
              onClick={() => setIsEditing(true)}
            >
              Editar ✏️
            </button>
          )}
          <button
            className="px-2 py-1 border border-[#2c5282] rounded font-bold text-sm bg-[#23272f] text-[#e2e8f0] shadow-md hover:bg-red-700 hover:text-white"
            onClick={() => onDelete(task.id)}
          >
            Eliminar ❌
          </button>
        </div>
      </div>
      <div className="text-xs text-[#718096]">
        Creado por: {task.author} {" "}
        {task.editor && <span>· Última edición: {task.editor}</span>}
      </div>
    </li>
  );
}
