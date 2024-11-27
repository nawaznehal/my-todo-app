'use client'; 

import React, { useState } from 'react';

interface AddTodoFormProps {
  onAdd: (task: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [task, setTask] = useState('');

  const handleClick = () => {
    if (task) {
      onAdd(task);
      setTask(''); // Clear the input field after submitting
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
        className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleClick}
        className="w-full max-w-md p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTodoForm;
