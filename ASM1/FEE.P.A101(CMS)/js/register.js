document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", (event) => {
        const userName = form.userName.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value.trim();
        const rePassword = form.rePassword.value.trim();

        // Username validation
        if (userName.length < 3 || userName.length > 50) {
            alert("Username must be between 3 and 50 characters.");
            event.preventDefault();
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            event.preventDefault();
            return;
        }

        // Password validation
        if (password.length < 8 || password.length > 30) {
            alert("Password must be between 8 and 30 characters.");
            event.preventDefault();
            return;
        }

        // Confirm password validation
        if (password !== rePassword) {
            alert("Passwords do not match.");
            event.preventDefault();
            return;
        }

        alert("Registration successful!");
    });
});