import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import postsRoute from "./routes/posts.routes";
import questsRoute from "./routes/quests.routes";
import threadsRoute from "./routes/threads.routes";
import usersRoute from "./routes/users.routes";
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
app.use("/threads", threadsRoute);
app.use("/posts", postsRoute);
app.use("/quests", questsRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
