const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const pool1 = require('./db');

//middleware
//PostgreSQL

app.use(cors());
app.use(express.json());
pool.query(`
  CREATE TABLE IF NOT EXISTS todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
  );
`).then(() => {
  console.log('Todo table created successfully.');
}).catch((error) => {
  console.error('Error creating todo table:', error.message);
});
// port 
var PORT = process.env.PORT || 5000;
// Routes with their functions

//create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo(description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
});

//get all todo

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id =$1", [id]);
        res.json(todo.rows[0]);

    }
    catch (err) {
        console.error(err.message);
    }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const UpdateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id =$2", [description, id]);
        res.json("Todo was Updated.");

    }
    catch (err) {
        console.error(err.message);
    }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const DeleteTodo = await pool.query("DELETE FROM todo WHERE todo_id =$1", [id]);
        res.json("Todo was Deleted.");

    }
    catch (err) {
        console.error(err.message);
    }
});


app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}`);
});