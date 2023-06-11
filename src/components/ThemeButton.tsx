import { createSignal, onMount } from "solid-js";

let themeInitValue = "light"; 

if (typeof window !== "undefined") {
  themeInitValue = localStorage.getItem("theme") ?? "light";
}

export const [theme, setTheme] = createSignal(themeInitValue);

export function ThemeToggle() {
  const toggleTheme = () => {
    setTheme(theme() === "light" ? "dark" : "light");
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme());
    }
  };

  return (
    <label for="switch">
      <input
        class="theme-switch"
        id="switch"
        type="checkbox"
        onClick={toggleTheme}
        checked={theme() === "light"}
        name="switch"
        role="switch"
      />
    </label>
  );
}
