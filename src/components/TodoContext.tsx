import React, { createContext, ReactNode, useContext, useReducer } from 'react'; // Import necessary React features

// Define the structure of a Todo item
interface Todo {
    id: number; // Unique identifier for each todo
    text: string; // Text of the todo
    completed: boolean; // Completion status of the todo
}

// Define the structure of the Todo state
type TodoState = {
    todos: Todo[]; // Array of todos
    filter: 'all' | 'completed' | 'incomplete'; // Current filter status
    searchQuery: string; // Current search query
};

// Define possible actions for the Todo reducer
type TodoAction =
    | { type: 'ADD_TODO'; payload: string } // Action to add a new todo
    | { type: 'TOGGLE_TODO'; payload: number } // Action to toggle a todo's completion status
    | { type: 'DELETE_TODO'; payload: number } // Action to delete a todo
    | { type: 'FILTER_TODOS'; payload: 'all' | 'completed' | 'incomplete' } // Action to filter todos
    | { type: 'SET_SEARCH_QUERY'; payload: string }; // Action to set the search query

// Initial state of the Todo context
const initialState: TodoState = {
    todos: [], // Start with an empty todos array
    filter: 'all', // Default filter is 'all'
    searchQuery: '', // Start with an empty search query
};

// Create TodoContext with initial state and dispatch function placeholder
const TodoContext = createContext<{
    state: TodoState; // Current state of the todo context
    dispatch: React.Dispatch<TodoAction>; // Function to dispatch actions
}>({ state: initialState, dispatch: () => null });

// Reducer function to manage state updates based on dispatched actions
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
        case 'ADD_TODO':
            // Create a new todo item with a unique id and add it to the state
            const newTodo: Todo = {
                id: Date.now(), // Use current timestamp as a unique id
                text: action.payload, // Set the text from the action payload
                completed: false, // New todos are initially incomplete
            };
            return { ...state, todos: [...state.todos, newTodo] }; // Return updated state with new todo
        case 'TOGGLE_TODO':
            // Toggle the completed status of the specified todo
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo // Update the todo if it matches the id
                ),
            };
        case 'DELETE_TODO':
            // Remove the specified todo from the state
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
        case 'FILTER_TODOS':
            // Update the filter status in the state
            return { ...state, filter: action.payload };
        case 'SET_SEARCH_QUERY':
            // Update the search query in the state
            return { ...state, searchQuery: action.payload };
        default:
            return state; // Return current state if action type does not match any cases
    }
};

// Provider component to encapsulate the Todo context
export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState); // Initialize state and dispatch with useReducer

    return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>; // Provide state and dispatch to children
};

// Custom hook to access the Todo context
export const useTodoContext = () => useContext(TodoContext); // Use the context in functional components
