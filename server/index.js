const express = require("express");
const cors = require("cors");
const connectWithDb = require("./mongo");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const Todo = mongoose.model("Todo", {
    name: String,
    description: String,
});

const save = async (todo) => {
    const newTodo = new Todo(todo);
    await newTodo.save();
};

// post request 
app.post("/api/v1/todos", async (req, res) => {
    const {
        name,
        description,
    } = req.body;

    const todo = {
        name,
        description
    };

    const savedTodo = await save(todo);

    res.status(201).json({
        message: `${todo.name} has been saved`,
        savedTodo,
    });
});

// get todos 
app.get("/api/v1/todos", async (req, res) => {
    const todos = await Todo.find();
    res.status(200).json({
        todos,
    });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3001, () => {
    connectWithDb().then(() => {
        console.log("Connected to mongoDB");
    }).catch((err) => {
        console.log(err);
    });
    console.log("Example app listening on port 3001!");
});