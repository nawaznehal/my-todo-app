interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete }) => {
  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li key={todo.id} className="flex justify-between items-center">
          <span
            onClick={() => onToggleComplete(todo.id)}
            className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
          >
            {todo.task}
          </span>
          <button
            onClick={() => onDelete(todo.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
