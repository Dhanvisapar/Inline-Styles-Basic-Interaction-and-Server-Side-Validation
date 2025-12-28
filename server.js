const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let storedUsers = []; // temporary server-side storage

app.get("/", (req, res) => {
  res.render("index", { error: "", success: "", users: storedUsers });
});

app.post("/submit", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.render("index", {
      error: "All fields are required!",
      success: "",
      users: storedUsers
    });
  }

  if (age < 18) {
    return res.render("index", {
      error: "Age must be 18 or above",
      success: "",
      users: storedUsers
    });
  }

  storedUsers.push({ name, email, age });

  res.render("index", {
    error: "",
    success: "Form submitted successfully!",
    users: storedUsers
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
