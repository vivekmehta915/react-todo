import React, { createContext, ReactNode, useContext, useReducer } from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

type TodoState = {
    todos: Todo[];
    filter: 'all' | 'completed' | 'incomplete';
    searchQuery: string;
};

type TodoAction =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'DELETE_TODO'; payload: number }
    | { type: 'FILTER_TODOS'; payload: 'all' | 'completed' | 'incomplete' }
    | { type: 'SET_SEARCH_QUERY'; payload: string };

const initialState: TodoState = {
    todos: [],
    filter: 'all',
    searchQuery: '',
};

const TodoContext = createContext<{
    state: TodoState;
    dispatch: React.Dispatch<TodoAction>;
}>({ state: initialState, dispatch: () => null });

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
        case 'ADD_TODO':
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            };
            return { ...state, todos: [...state.todos, newTodo] };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
                ),
            };
        case 'DELETE_TODO':
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
        case 'FILTER_TODOS':
            return { ...state, filter: action.payload };
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };
        default:
            return state;
    }
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);
