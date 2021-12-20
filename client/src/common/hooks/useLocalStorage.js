import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            const value = item ? JSON.parse(item) : initialValue;
            localStorage.setItem(key, JSON.stringify(value));
            return value;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
    };
    return [storedValue, setValue];
};
