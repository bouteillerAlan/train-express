import express from "express";
import user from "./route/user.js";
import task from "./route/task.js";
import project from "./route/project.js";
import auth from "./route/auth.js";
import * as bodyParser from "express";
import {handleMongoErrors} from "./middleware/mongo.js";
import {handleGenericErrors} from "./middleware/generic.js";

const app = express();

app.use(bodyParser.json())
  .use("/auth", auth)
  .use("/users", user)
  .use("/tasks", task)
  .use("/projects", project)
  .use(handleMongoErrors) // !!! must be last - in this order mongo > generic
  .use(handleGenericErrors);

export default app;
