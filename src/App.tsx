import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import { TodoProvider, useTodoContext } from './components/TodoContext';
import TodoInput from './components/TodoInput';
import useDebounce from './hooks/useDebounce';

// SearchInput component for handling the search functionality
const SearchInput = () => {
  const { dispatch } = useTodoContext(); // Accessing the dispatch function from context
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  // Debounce the search query to minimize the number of updates
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Effect to dispatch the search query when it changes
  useEffect(() => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: debouncedSearchQuery });
  }, [debouncedSearchQuery, dispatch]);

  return (
    <div className="relative flex-grow mx-4">
      {/* Search icon */}
      <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      {/* Input field for search */}
      <input
        type="text"
        className="border p-2 pl-10 rounded-full w-full text-sm leading-5"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

const App = () => {
  return (
    <TodoProvider>
      {/* Main container for the app */}
      <div className="min-h-screen bg-white flex justify-center items-start">
        <div className="w-full md:w-[80%] p-4 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between  mb-5 w-full">
            <div className="flex justify-between items-center w-[100%] md:w-[70%] mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">Today</h1>
              <div className="w-full md:w-[90%]">
                <SearchInput /> {/* Renders a search input field for filtering todo items based on the search query */}
              </div>
            </div>

            <div className="w-full md:w-auto ">
              <TaskFilters /> {/* Renders task filters to filter the displayed todo items by status */}
            </div>
          </div>
          <TaskList /> {/* Renders a list of tasks based on the current filter and search query */}
          <TodoInput />{/* Renders an input field for adding new todos */}
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
