const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

if (window.localStorage.getItem("theme") === null) {
  window.localStorage.setItem("theme", systemTheme);
}
