import React from 'react';

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete }) => {
  // Function to format the createdAt date
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li key={todo.id} className="flex justify-between items-center bg-white p-4 border rounded-lg shadow-sm hover:bg-gray-50">
          <span className={`text-gray-900 ${todo.completed ? 'text-gray-500 line-through' : ''}`}>
            {todo.task}
          </span>
          <span className="text-sm text-gray-400 ml-4">{formatDate(todo.createdAt)}</span>

          <div className="flex space-x-2">

            <button
              onClick={() => onToggleComplete(todo.id)}
              className={`px-4 py-1 rounded text-white ${todo.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
          {/* Display created date */}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
