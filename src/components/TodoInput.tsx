import { useState } from 'react';
import { useTodoContext } from '../components/TodoContext'; //Importing the TodoContext for state management

const TodoInput = () => {
    const [task, setTask] = useState(''); // State to hold the current task input
    const { dispatch } = useTodoContext();// Access dispatch function from the Todo context

    // Function to add a new task
    const addTask = () => {
        // If the task input is empty, do nothing
        if (task.trim() === '') return;

        // Dispatch action to add the new task
        dispatch({ type: 'ADD_TODO', payload: task });
        setTask('');// Clear the input field after adding the task
    };

    return (
        <div className="mt-0 mb-4">
            <input
                type="text"
                className="border p-2 w-full  border-2 border-gray-300 rounded"
                value={task}
                onChange={(e) => setTask(e.target.value)} // Update task state on input change
                placeholder="Type something"
            />
            {/* Call addTask function on button click */}
            <button className="bg-black text-white p-2 rounded mt-2 w-full" onClick={addTask}>
                Add Task
            </button>
        </div>
    );
};

export default TodoInput;
