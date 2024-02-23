import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 8080;

let users: { username: string; password: string }[] = [];

const isValidUser = (username: string) => {
  if (users.find((user) => user.username === username)) {
    return true;
  }
  return false;
};

const authenticate = (username: string, password: string) => {
  if (
    users.find(
      (user) => user.username === username && user.password === password
    )
  ) {
    return true;
  }
  return false;
};

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/signup", (req, res) => {
  users.push(req.body);
  res.status(201).json({ message: "user registered", data: req.body.username });
});

app.post("/login", (req, res) => {
  if (isValidUser(req.body.username)) {
    if (authenticate(req.body.username, req.body.password)) {
      res.status(200).json({ message: "login successful", data: req.body });
    } else {
      res.status(401).json({ message: "username and password did not match" });
    }
  } else {
    res.status(401).json({ message: "user does not exist", data: req.body });
  }
});
