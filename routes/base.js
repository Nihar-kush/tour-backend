import express from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send("TOUR API !!");
});

export default router;
