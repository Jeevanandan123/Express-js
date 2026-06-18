import express from "express";

const app = express();
const PORT = 3000;


const users = [
    { id: 1, user_name: "Jeevan", age: 24 },
    { id: 2, user_name: "Anandan", age: 25 },
    { id: 3, user_name: "Kumar", age: 26 },
    { id: 4, user_name: "Ravi", age: 27 },
    { id: 5, user_name: "Suresh", age: 28 },
]

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/api/users", (req, res) => {
    console.log(req.body)
    res.send(users)

})

app.use(express.json());

app.post("/api/users", (req, res) => {
    console.log(req.body)
    // res.send(req.body)
    const {body} = req;
    const newUser = {id: users[users.length -1].id+1, ...body}
   users.push(newUser);

   return res.status(201).send(newUser)


})
// app.get("/api/users/:id", (req, res) => {


//     const id = parseInt(req.params.id)

//     if (isNaN(id)) {
//         res.status(400).send({
//             msg: "Bad request , Invalid ID"
//         })
//     }
// const user = users.find((user)=>users.id===id)
// // console.log(user)
// })


app.listen(PORT, () => {

    console.log(`App is running on port ${PORT}`);
});



// import express from "express";
// import "dotenv/config";
// import supabase from "./config/supabase.js";

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// // GET all users
// app.get("/api/users", async (req, res) => {
//   const { data, error } = await supabase.from("users").select("*");

//   if (error) return res.status(500).json({ msg: error.message });

//   res.json(data);
// });

// // GET single user by ID
// app.get("/api/users/:id", async (req, res) => {
//   const id = parseInt(req.params.id);

//   if (isNaN(id)) return res.status(400).json({ msg: "Invalid ID" });

//   const { data, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("id", id)   // WHERE id = ?
//     .single();      // expect one row

//   if (error) return res.status(404).json({ msg: "User not found" });

//   res.json(data);
// });

// // POST - create new user
// app.post("/api/users", async (req, res) => {
//   const { user_name, age } = req.body;

//   if (!user_name || !age) {
//     return res.status(400).json({ msg: "user_name and age are required" });
//   }

//   const { data, error } = await supabase
//     .from("users")
//     .insert({ user_name, age })
//     .select()       // returns the inserted row
//     .single();

//   if (error) return res.status(500).json({ msg: error.message });

//   res.status(201).json(data);
// });

// // PUT - update user
// app.put("/api/users/:id", async (req, res) => {
//   const id = parseInt(req.params.id);

//   if (isNaN(id)) return res.status(400).json({ msg: "Invalid ID" });

//   const { data, error } = await supabase
//     .from("users")
//     .update(req.body)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) return res.status(500).json({ msg: error.message });

//   res.json(data);
// });

// // DELETE user
// app.delete("/api/users/:id", async (req, res) => {
//   const id = parseInt(req.params.id);

//   if (isNaN(id)) return res.status(400).json({ msg: "Invalid ID" });

//   const { error } = await supabase.from("users").delete().eq("id", id);

//   if (error) return res.status(500).json({ msg: error.message });

//   res.json({ msg: "User deleted successfully" });
// });

// app.listen(PORT, () => {
//   console.log(`App is running on port ${PORT}`);
// });