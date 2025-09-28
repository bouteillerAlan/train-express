import express from "express";
import user from "./route/user.js";
import task from "./route/task.js";
import project from "./route/project.js";
import auth from "./route/auth.js";
import * as bodyParser from "express";
import {handleMongoErrors} from "./middleware/mongo.js";
import {handleGenericErrors} from "./middleware/generic.js";

const app = express();

app.use(bodyParser.json());

app.use("/auth", auth);
app.use("/users", user);
app.use("/tasks", task);
app.use("/projects", project);

// !!! must be last - in this order mongo > generic
app.use(handleMongoErrors);
app.use(handleGenericErrors);

export default app;
