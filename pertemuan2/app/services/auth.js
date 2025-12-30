import { saveData, getData } from "./core.js";

if (!localStorage.getItem("users")) {
  saveData("users", []);
}

const users = getData("users");
if (users.length === 0) {
  users.push(
    {
      id: 1,
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    },
    {
      id: 2,
      email: "staff@gmail.com",
      password: "staff123",
      role: "staff",
    }
  );
  saveData("users", users);
}
console.log(users[1].email);

const loginButton = document.getElementById("btn-log");
loginButton.addEventListener("click", () => {
  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value.trim();
  const emailError = document.getElementById("errorEmail");
  const pwError = document.getElementById("errorPassword");
  const isUsersFound = users.find((data) => {
    return (
      data.email.toLowerCase() === email.toLowerCase() &&
      data.password === password
    );
  });

  if (password === "" && email === "") {
    emailError.textContent = "Silahkan masukkan email";
    pwError.textContent = "Silahkan masukan password";
    pwError.classList.remove("d-none");
    emailError.classList.remove("d-none");
    return;
  }
  if (password === "") {
    pwError.textContent = "Silahkan masukan password";
    pwError.classList.remove("d-none");
    emailError.classList.add("d-none");
    return;
  }
  if (email === "") {
    emailError.textContent = "Silahkan masukkan email";
    emailError.classList.remove("d-none");
    pwError.classList.add("d-none");
    return;
  }
  if (!isUsersFound) {
    pwError.textContent = "Email atau Password salah!";
    pwError.classList.remove("d-none");
    emailError.classList.add("d-none");
    return;
  }
  if (isUsersFound.role === "admin") {
    window.location.href = "page/admin.html";
    return;
  }

  if (isUsersFound.role === "staff") {
    window.location.href = "page/staff.html";
    return;
  }
});
