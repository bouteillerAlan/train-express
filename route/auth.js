import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.send('token');
})

export default router;
