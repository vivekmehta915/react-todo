import { useState } from 'react';
import { useTodoContext } from '../components/TodoContext';

const TaskFilters = () => {
    const { dispatch } = useTodoContext();
    const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'incomplete'>('all'); // Default to 'all'

    const setFilter = (filter: 'all' | 'completed' | 'incomplete') => {
        setActiveFilter(filter);
        dispatch({ type: 'FILTER_TODOS', payload: filter });
    };

    const buttonClasses = (filter: 'all' | 'completed' | 'incomplete') =>
        `flex-1 text-center p-2 rounded text-white ${activeFilter === filter ? 'bg-active-color' : 'bg-gray-400'}`;

    return (
        <div className="task-filters w-full flex flex-wrap justify-start md:justify-center space-x-4 mb-4">
            <button onClick={() => setFilter('all')} style={{ padding: '2px 8px' }} className={buttonClasses('all')}>
                All
            </button>
            <button onClick={() => setFilter('completed')} style={{ padding: '2px 8px' }} className={buttonClasses('completed')}>
                Completed
            </button>
            <button onClick={() => setFilter('incomplete')} style={{ padding: '2px 8px' }} className={buttonClasses('incomplete')}>
                Incomplete
            </button>
        </div>


    );
};

export default TaskFilters;
