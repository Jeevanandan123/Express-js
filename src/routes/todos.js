import express from "express";
import { getAllTodos, createTodo, deleteTodo } from "../controllers/todoController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/",protect, getAllTodos);
router.post("/", protect,createTodo);
router.delete("/:id",protect, deleteTodo);

export default router;