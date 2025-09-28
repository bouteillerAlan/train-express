import express from "express";
import user from "./routes/user.js";
import task from "./routes/task.js";
import project from "./routes/project.js";

const app = express();

app.use("/users", user);
app.use("/tasks", task);
app.use("/projects", project);

export default app;
