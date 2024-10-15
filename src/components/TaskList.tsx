import { AiOutlineClose } from 'react-icons/ai'; // Importing the close icon
import { useTodoContext } from './TodoContext'; // Importing the TodoContext for state management

// TaskList component for displaying the list of tasks
const TaskList = () => {
    const { state, dispatch } = useTodoContext(); // Accessing state and dispatch from the context

    // Filter todos based on the selected filter and search query
    const filteredTodos = state.todos.filter(todo => {
        if (state.filter === 'completed') return todo.completed; // Filter for completed tasks
        if (state.filter === 'incomplete') return !todo.completed; // Filter for incomplete tasks
        return true;
    }).filter(todo => todo.text.toLowerCase().includes(state.searchQuery.toLowerCase())) // Filter by search query
        .reverse(); //Reversing the orders of the added task

    return (
        <div>
            {filteredTodos.map(todo => (
                <div
                    key={todo.id}
                    className={`flex justify-between items-center p-2 mb-2 border-2 border-gray-300 rounded ${todo.completed ? 'border-task-border-when-checked bg-task-bg-when-checked' : ''
                        }`}
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
                            onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })} // Toggling task for marking as completed
                        >
                            {todo.text} {/* Display the task text */}
                        </span>
                    </div>
                    <AiOutlineClose
                        className={`text-gray-500 cursor-pointer visible`}
                        onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })} // Delete task on close icon click
                    />
                </div>
            ))}
        </div>
    );
};

export default TaskList;
