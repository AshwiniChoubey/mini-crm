// =========================================================
// DARK MODE
// =========================================================

/* const themeToggle =
    document.getElementById("themeToggle");


// Load saved theme

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent =
        "☀️ Light Mode";
}


// Toggle theme

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        const isDarkMode =
            document.body.classList.contains("dark-mode");


        if (isDarkMode) {

            localStorage.setItem(
                "theme",
                "dark"
            );

            themeToggle.textContent =
                "☀️ Light Mode";

        } else {

            localStorage.setItem(
                "theme",
                "light"
            );

            themeToggle.textContent =
                "🌙 Dark Mode";
        }

    });

} */




export function initTheme() {

    const themeToggle = document.getElementById("themeToggle");

    // If button doesn't exist, do nothing
    if (!themeToggle) return;

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Light Mode";
    }

    // Toggle theme
    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const isDarkMode =
            document.body.classList.contains("dark-mode");

        if (isDarkMode) {

            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️ Light Mode";

        } else {

            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙 Dark Mode";
        }

    });

}