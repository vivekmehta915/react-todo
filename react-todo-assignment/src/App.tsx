import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import { TodoProvider, useTodoContext } from './components/TodoContext';
import TodoInput from './components/TodoInput';
import useDebounce from './hooks/useDebounce';

const SearchInput = () => {
  const { state, dispatch } = useTodoContext();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Use debounce

  useEffect(() => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: debouncedSearchTerm });
  }, [debouncedSearchTerm, dispatch]);

  return (
    <div className="relative flex-grow mx-4">
      <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      <input
        type="text"
        className="border p-2 pl-10 rounded-full w-full text-sm leading-5"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

const App = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-white flex justify-center items-start">
        <div className="w-full md:w-[80%] p-4 rounded-lg">
          {/* Flex container for heading, search input, and filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-5 w-full">
            <div className="flex justify-between items-center w-[100%] md:w-[70%] mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">Today</h1>
              <div className="w-[100%] md:w-[90%]"> {/* Adjust width of the SearchInput */}
                <SearchInput />
              </div>
            </div>

            <div className="w-full md:w-auto flex justify-start md:justify-center">
              <TaskFilters />
            </div>
          </div>
          <TaskList />
          <TodoInput />
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
