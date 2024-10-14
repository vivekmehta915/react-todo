import { useState } from 'react';
import { useTodoContext } from '../components/TodoContext';

const TodoInput = () => {
    const [task, setTask] = useState('');
    const { dispatch } = useTodoContext();

    const addTask = () => {
        if (task.trim() === '') return;
        dispatch({ type: 'ADD_TODO', payload: task });
        setTask('');
    };

    return (
        <div className="mt-0 mb-4">
            <input
                type="text"
                className="border p-2 w-full  border-2 border-gray-300 rounded"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Type something"
            />
            <button className="bg-black text-white p-2 rounded mt-2 w-full" onClick={addTask}>
                Add Task
            </button>
        </div>
    );
};

export default TodoInput;
