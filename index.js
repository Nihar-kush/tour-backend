import express from "express";
import dotenv from "dotenv";
import baseRoute from "./routes/base.js";
import cors from "cors";
import dataRoute from "./routes/data.js";

// CONFIGURATIONS
const app = express();
dotenv.config();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/", baseRoute);
app.use("/api/data", dataRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// SERVER
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
