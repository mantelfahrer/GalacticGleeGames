import express from "express";
import cors from "cors";
import usersRoute from './routes/users.routes';
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT || 8080;
let corsOptions = {
  origin: "http://localhost:3000",
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/users", usersRoute);

/*
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
*/

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
