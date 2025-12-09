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
  <li className="flex flex-col gap-2 p-3 border border-[#16a34a] rounded-lg bg-[#14532d] text-[#dcfce7] shadow-md">
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
              className="border border-[#16a34a] px-2 py-1 rounded bg-[#14532d] text-[#dcfce7]"
            />
          ) : (
            <div
              className={`font-bold tracking-wide text-lg ${task.completed ? "line-through text-[#86efac]" : ""}`}
            >
              {task.text}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <button
              className="px-2 py-1 bg-[#16a34a] text-white rounded font-bold text-sm shadow-md hover:bg-[#15803d]"
              onClick={saveEdit}
            >
              Guardar ✔️
            </button>
          ) : (
            <button
              className="px-2 py-1 border border-[#16a34a] rounded font-bold text-sm bg-[#14532d] text-[#dcfce7] shadow-md hover:bg-[#16a34a] hover:text-white"
              onClick={() => setIsEditing(true)}
            >
              Editar ✏️
            </button>
          )}
          <button
            className="px-2 py-1 border border-[#16a34a] rounded font-bold text-sm bg-[#14532d] text-[#dcfce7] shadow-md hover:bg-[#15803d] hover:text-white"
            onClick={() => onDelete(task.id)}
          >
            Eliminar ❌
          </button>
        </div>
      </div>
      <div className="text-xs text-[#86efac]">
        Creado por: {task.author} {" "}
        {task.editor && <span>· Última edición: {task.editor}</span>}
      </div>
    </li>
  );
}
