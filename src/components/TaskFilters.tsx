import { useState } from 'react';
import { useTodoContext } from '../components/TodoContext'; // Importing the TodoContext for state management

// TaskFilters component for filtering tasks based on their status
const TaskFilters = () => {
    const { dispatch } = useTodoContext();// Accessing the dispatch function from the TodoContext

    // State to track the currently active filter, default is 'all'
    const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

    // Function to set the filter and dispatch the action to the context
    const setFilter = (filter: 'all' | 'completed' | 'incomplete') => {
        setActiveFilter(filter); // Update the active filter state
        dispatch({ type: 'FILTER_TODOS', payload: filter });// Dispatch the filter action to context
    };

    // Function to determine the button classes based on the active filter
    const buttonClasses = (filter: 'all' | 'completed' | 'incomplete') =>
        `flex-1 text-center p-2 rounded text-white ${activeFilter === filter ? 'bg-active-color' : 'bg-gray-400'}`;

    return (
        <div className="task-filters w-full space-x-2 mb-4">
            <button onClick={() => setFilter('all')} className={`${buttonClasses('all')} px-2 py-1`}>
                All
            </button>
            <button onClick={() => setFilter('completed')} className={`${buttonClasses('completed')} px- py-1`}>
                Completed
            </button>
            <button onClick={() => setFilter('incomplete')} className={`${buttonClasses('incomplete')} px-2 py-1`}>
                Incomplete
            </button>
        </div>


    );
};

export default TaskFilters;
