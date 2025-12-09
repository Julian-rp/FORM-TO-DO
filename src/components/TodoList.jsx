import TodoItem from "./TodoItem";

export default function TodoList({ tasks, onToggle, onDelete, onEdit }) {
  return (
  <ul className="space-y-2 bg-[#14532d] p-4 rounded-lg border border-[#16a34a]">
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
