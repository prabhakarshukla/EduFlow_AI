"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
	theme: Theme;
	isDark: boolean;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
};

const STORAGE_KEY = "eduflow-theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>("light");

	useEffect(() => {
		const saved = window.localStorage.getItem(STORAGE_KEY);
		if (saved === "light" || saved === "dark") {
			setThemeState(saved);
			return;
		}

		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		setThemeState(prefersDark ? "dark" : "light");
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", theme === "dark");
		root.setAttribute("data-theme", theme);
		document.body.setAttribute("data-theme", theme);
		window.localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	const value = useMemo<ThemeContextValue>(
		() => ({
			theme,
			isDark: theme === "dark",
			setTheme: (nextTheme: Theme) => setThemeState(nextTheme),
			toggleTheme: () => setThemeState((current) => (current === "dark" ? "light" : "dark")),
		}),
		[theme],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useThemeContext must be used within ThemeProvider");
	}
	return context;
}
