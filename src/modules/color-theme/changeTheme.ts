import { COLOR_THEMES } from "../../constants";

export default () => {
    const savedTheme = localStorage.getItem("colorTheme");
    const isDark = savedTheme === COLOR_THEMES.dark;

    const html = document.querySelector("html");

    if (!html) {
        throw new Error("Html element was not found");
    }

    html.setAttribute("data-bs-theme", isDark ? COLOR_THEMES.dark : COLOR_THEMES.light);

    return isDark;
}