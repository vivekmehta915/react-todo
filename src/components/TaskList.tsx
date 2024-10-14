import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useTodoContext } from './TodoContext';

const TaskList = () => {
    const { state, dispatch } = useTodoContext();
    const [hoveredTodo, setHoveredTodo] = useState<number | null>(null);

    const filteredTodos = state.todos.filter(todo => {
        if (state.filter === 'completed') return todo.completed;
        if (state.filter === 'incomplete') return !todo.completed;
        return true;
    }).filter(todo => todo.text.toLowerCase().includes(state.searchQuery.toLowerCase())) // Filter by search query
        .reverse();

    return (
        <div>
            {filteredTodos.map(todo => (
                <div
                    key={todo.id}
                    className={`flex justify-between items-center p-2 mb-2 border-2 border-gray-300 rounded ${todo.completed ? 'border-task-border-when-checked bg-task-bg-when-checked' : ''
                        }`}
                    onMouseEnter={() => setHoveredTodo(todo.id)}
                    onMouseLeave={() => setHoveredTodo(null)}
                >
                    <div className="flex items-center flex-1">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                                className="appearance-none h-4 w-4 border-2 rounded-full border-gray-400 checked:border-task-border-when-checked focus:outline-none"
                            />
                            {todo.completed && (
                                <svg
                                    className="absolute inset-0 w-full h-full text-task-border-when-checked"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    viewBox="0 5 25 19"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        <span
                            className={`mx-2 cursor-pointer`}
                            onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                        >
                            {todo.text}
                        </span>
                    </div>
                    <AiOutlineClose
                        className={`text-gray-500 cursor-pointer visible`}
                        onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                    />
                </div>
            ))}
        </div>
    );
};

export default TaskList;
