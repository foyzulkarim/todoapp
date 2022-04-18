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

// put request
app.put("/api/v1/todos/:id", async (req, res) => {
    const {
        id
    } = req.params;

    const {
        name,
        description,
    } = req.body;

    const todo = {
        name,
        description
    };

    const updatedTodo = await Todo.findByIdAndUpdate(id, todo, {
        new: true,
    });

    res.status(200).json({
        message: `${todo.name} has been updated`,
        updatedTodo,
    });
});

// get todos 
app.get("/api/v1/todos", async (req, res) => {
    const todos = await Todo.find();
    res.status(200).json({
        todos,
    });
});

// get todo detail by todoId
app.get("/api/v1/todos/:todoId", async (req, res) => {
    const {
        todoId
    } = req.params;

    const todo = await Todo.findById(todoId);
    res.status(200).json({
        todo,
    });
});

// delete todo 
app.delete("/api/v1/todos/:todoId", async (req, res) => {
    const {
        todoId
    } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    res.status(200).json({
        message: `Todo has been deleted`,
        deletedTodo,
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