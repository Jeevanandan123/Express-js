import express from "express";
import todoRoutes from "./routes/todos.js";
import authRoutes from "./routes/auth.js"; 
const app = express();

app.use(express.json()); // always first

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

export default app;