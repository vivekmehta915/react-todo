import { useEffect, useState } from 'react';

// Custom hook to debounce a value
const useDebounce = (value: any, delay: number) => {
    // State to hold the debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set up a timeout to update the debounced value after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value); // Update debounced value after the delay
        }, delay);

        // Cleanup function to clear the timeout if value or delay changes
        return () => {
            clearTimeout(handler); // Clear the timeout to prevent memory leaks
        };
    }, [value, delay]); // Effect runs whenever the value or delay changes

    // Return the debounced value
    return debouncedValue;
};

export default useDebounce; // Export the custom hook for use in other components
