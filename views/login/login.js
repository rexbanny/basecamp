document.getElementById("sbt-button").addEventListener("click", async () => {
    const error    = document.getElementById("error");
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const emailRx  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    error.textContent = "";

    if (!email)               return (error.textContent = "Email is required.");
    if (!emailRx.test(email)) return (error.textContent = "Invalid email format.");
    if (password.length < 6)  return (error.textContent = "Password must be at least 6 characters.");

    try {
        const res  = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.error) {
            error.textContent = data.error;
        } else {
            if (data.role === 'superadmin' || data.role === 'admin') {
                window.location.href = "../main_menu/projects.html";
            } else {
                window.location.href = "../main_menu/projects.html";
            }
        }
    } catch {
        error.textContent = "Could not connect to server.";
    }
});
