// todo list axios get from server and render todo list
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from "react-router-dom";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [reload, setReload] = useState(false);

    const getTodos = async () => {
        const r = await axios.get('http://localhost:3001/api/v1/todos');
        setTodos(r.data.todos);
    }

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        if (reload === true) {
            getTodos();
            setReload(false);
        }
    }, [reload]);

    const deleteTodo = async (todoId) => {
        const r = await axios.delete(`http://localhost:3001/api/v1/todos/${todoId}`);
        console.log('response', r);
        getTodos();
        console.log('delete.todoId', todoId);
    }

    return (
        <div>
            <h1>Todo List</h1>
            <Outlet />
            <nav
                style={{
                    borderRight: "solid 1px",
                    padding: "1rem",
                }}
            >
                {todos.map(todo => (
                    <>
                        <h2>{todo.name}</h2>
                        <Link
                            to={`/list-todo/${todo._id}`}
                            key={`todo-detail-${todo._id}`}
                        >Detail</Link>{' '}
                        <Link
                            to={`/list-todo/edit/${todo._id}`}
                            key={`todo-edit-${todo._id}`}
                        >Edit</Link> {' '}
                        <button type="button" key={todo._id} onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </>
                ))}
            </nav>


        </div>
    );
}

export default TodoList;