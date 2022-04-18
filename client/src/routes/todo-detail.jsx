import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TodoDetail = () => {
    let { todoId } = useParams();
    const [todo, setTodo] = useState({});

    useEffect(() => {
        const getTodo = async () => {
            const r = await axios.get(`http://localhost:3001/api/v1/todos/${todoId}`);
            console.log('response', r);
            setTodo(r.data.todo);
        }
        getTodo();
    }, [todoId]);

    return (
        <div>
            <h1>Todo Detail</h1>
            <main style={{ padding: "1rem" }}>
            <h2>Title {todo.name}</h2>
            <p>
                {todo.description}
            </p>
        </main>
        </div>
    );
};

export default TodoDetail;