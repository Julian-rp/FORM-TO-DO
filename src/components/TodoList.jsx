import TodoItem from "./TodoItem";

export default function TodoList({ tasks, onToggle, onDelete, onEdit }) {
  return (
  <ul className="space-y-2 bg-[#23272f] p-4 rounded-lg border border-[#2c5282]">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
