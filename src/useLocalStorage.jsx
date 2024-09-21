/**
 * Custom hook for managing state with localStorage.
 */

import { useState } from 'react';

function useLocalStorage(key, initialValue) {
    // get stored value or use initial value
    const [storedValue, setStoredValue] = useState(() =>  {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log("error reading localStorage key:", key, error);
            return initialValue;
        }
    });

    // set the value and update localStorage
    const setValue = value => {
        try {
            setStoredValue(prevValue => {
                const valueToStore = value instanceof Function ? value(prevValue) : value;
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
                return valueToStore;
            });
        } catch (error) {
            console.error("error setting localStorage key:", key, error);
        }
    };
    return [storedValue, setValue];
}

export default useLocalStorage;