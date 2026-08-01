document.getElementById("sbt-button").addEventListener("click", async () => {
    const error    = document.getElementById("error");
    const name     = document.getElementById("name").value.trim();
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const cfn      = document.getElementById("password-cfn").value;
    const emailRx  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    error.textContent = "";

    if (!name)                    return (error.textContent = "Name is required.");
    if (!email)                   return (error.textContent = "Email is required.");
    if (!emailRx.test(email))     return (error.textContent = "Invalid email format.");
    if (password.length < 6)      return (error.textContent = "Password must be at least 6 characters.");
    if (!/[A-Z]/.test(password))  return (error.textContent = "Password must include at least one uppercase letter.");
    if (!/[0-9]/.test(password))  return (error.textContent = "Password must include at least one number.");
    if (password !== cfn)         return (error.textContent = "Passwords do not match.");

    try {
        const res  = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (data.error) { error.textContent = data.error; }
        else { window.location.href = "../login/login.html"; }
    } catch {
        error.textContent = "Could not connect to server.";
    }
});
