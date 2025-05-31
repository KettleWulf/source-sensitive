import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

interface ThemeContextProviderProps {
	children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => (localStorage.getItem("isDarkMode") === "true"));

	useEffect(() => {
		document.documentElement.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");
		localStorage.setItem("isDarkMode", isDarkMode.toString());
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};