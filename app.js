import express from "express";
import user from "./route/user.js";
import task from "./route/task.js";
import project from "./route/project.js";
import auth from "./route/auth.js";
import * as bodyParser from "express";
import {handleMongoErrors} from "./middleware/mongo.js";

const app = express();

app.use(bodyParser.json());

app.use("/auth", auth);
app.use("/users", user);
app.use("/tasks", task);
app.use("/projects", project);

// !!! must be last
app.use(handleMongoErrors);

export default app;
