document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = form.email.value.trim();
        const password = form.password.value;
        const rememberMe = form.querySelector(
            ".form-check-input"
        ).checked;


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

        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Remember Me:", rememberMe);

        // If validation passes
        alert("Login successful!");

        // Submit to server
        // form.submit();
        window.location.href = "userProfile.html";
    });
});