'use client';

type TodoItemProps = {
  todo: { id: number; task: string; completed: boolean };
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoItem = ({ todo, onToggleComplete, onDelete }: TodoItemProps) => {
  return (
    <li
      className={`flex justify-between items-center p-4 rounded shadow-md ${
        todo.completed ? 'bg-green-200' : 'bg-white'
      }`}
    >
      <span
        onClick={() => onToggleComplete(todo.id)}
        className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
      >
        {todo.task}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
