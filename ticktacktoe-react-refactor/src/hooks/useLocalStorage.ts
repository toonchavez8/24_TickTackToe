import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";

// Custom hook for managing state in local storage
export function useLocalStorage<T>(
	key: string, // Key for storing the value in local storage
	initialValue: T // Initial value for the state
): [T, Dispatch<SetStateAction<T>>] {
	// Define the state and its setter using useState
	const [internalValue, setInternalValue] = useState<T>(() => {
		try {
			// Retrieve the stored value from local storage
			const item = window.localStorage.getItem(key);
			// Parse the stored value from JSON or use the initial value if no stored value exists
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			// If an error occurs during retrieval, use the initial value
			return initialValue;
		}
	});

	// Define the value setter using useCallback
	const setValue = useCallback<Dispatch<SetStateAction<T>>>(
		(value) => {
			try {
				// Determine the value to be stored based on whether a function is passed as the new value
				const valueToStore =
					value instanceof Function ? value(internalValue) : value;
				// Update the internal state with the new value
				setInternalValue(valueToStore ?? initialValue);
				// Store the value in local storage as a JSON string
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			} catch (error) {
				console.log(error);
			}
		},
		[key, setInternalValue, initialValue, internalValue]
	);

	// Listen for storage events to update the state if the value changes in another tab/window
	useEffect(() => {
		function handleStorageChange() {
			try {
				// Retrieve the updated value from local storage
				const item = window.localStorage.getItem(key);
				// Parse the updated value from JSON or use the initial value if no updated value exists
				setInternalValue(item ? JSON.parse(item) : initialValue);
			} catch (error) {
				console.log(error);
			}
		}

		// Add event listener for storage changes
		window.addEventListener("storage", handleStorageChange);

		// Remove event listener when the component unmounts
		return () => window.removeEventListener("storage", handleStorageChange);
	}, [key, initialValue]);

	// Return the current state value and the value setter
	return [internalValue, setValue];
}
