import pool from "../config/db.js";

// GET /api/todos — get all todos with user info
// export const getAllTodos = async (req, res) => {
//   try {
//     const [rows] = await pool.query(`
//       SELECT todos.id, todos.title, todos.done,
//              users.name AS user_name, users.email
//       FROM todos
//       INNER JOIN users ON todos.user_id = users.id
//     `);
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

export const getAllTodos = async (req, res) => {
  const user_id = req.user.id; // ← only get THIS user's todos

  try {
    const [rows] = await pool.query(
      "SELECT * FROM todos WHERE user_id = ?", [user_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// POST /api/todos — create a todo
// export const createTodo = async (req, res) => {
//   const { title } = req.body;
//    const user_id = req.user.id; // ← from JWT token, not body!

//   if (!title) {
//     return res.status(400).json({ msg: "Title is required" });
//   }

//   try {
//     const [result] = await pool.query(
//       "INSERT INTO todos (user_id, title) VALUES (?, ?)",
//       [user_id, title]
//     );
//     res.status(201).json({ id: result.insertId, user_id, title, done: false });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// POST /api/todos — create a todo
export const createTodo = async (req, res) => {
  const { title } = req.body;
  const user_id = req.user.id;

  if (!title) {
    return res.status(400).json({ msg: "Title is required" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO todos (user_id, title) VALUES (?, ?)",
      [user_id, title]
    );

    console.log("Inserted into DB:", result); // ← add this

    res.status(201).json({ id: result.insertId, user_id, title, done: false });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// export const createTodo = async (req, res) => {
//   const { title } = req.body;        // ← only title from body
//   const user_id = req.user.id;       // ← user_id from token

//   if (!title) {
//     return res.status(400).json({ msg: "Title is required" });
//   }

//   try {
//     const [result] = await pool.query(
//       "INSERT INTO todos (user_id, title) VALUES (?, ?)",
//       [user_id, title]
//     );
//     res.status(201).json({ id: result.insertId, user_id, title, done: false });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// DELETE /api/todos/:id — delete a todo
export const deleteTodo = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) return res.status(400).json({ msg: "Invalid ID" });

  try {
    const [result] = await pool.query("DELETE FROM todos WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.json({ msg: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};