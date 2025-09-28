db = db.getSiblingDB("circle");

const devUsername = process.env.MONGO_DEV_USERNAME;
const devPassword = process.env.MONGO_DEV_PASSWORD;

if (devUsername.trim() || devPassword.trim()) {
  db.createUser({
    user: devUsername,
    pwd: devPassword,
    roles: [
      {
        role: "readWrite",
        db: "circle"
      }
    ]
  });
}
