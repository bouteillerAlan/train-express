import "dotenv/config";
import app from "./app.js";
import mongoose from "mongoose";

const port = Number(process.env.API_PORT) || 4000;
// todo: later we can use other env to get the value but rn I keep this part 'simple'
const db = {
  uri: process.env.MONGO_URI,
  port: Number(process.env.MONGO_PORT),
  user: process.env.MONGO_DEV_USERNAME,
  pass: process.env.MONGO_DEV_PASSWORD,
  coll: process.env.MONGO_INITDB_DATABASE
}

function connectMongo(onSuccessCallback) {
  mongoose.connect(`mongodb://${db.user}:${db.pass}@${db.uri}:${db.port}/${db.coll}`)
    .then(() => {
      console.log("Connected to MongoDB");
      onSuccessCallback();
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
}

function listenApi() {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  })
}

connectMongo(listenApi);
