// todo list axios get from server and render todo list
import React from 'react';
import axios from 'axios';

const TodoList = () => {
    const [todos, setTodos] = React.useState([]);

    const getTodos = async () => {
        const r = await axios.get('http://localhost:3001/api/v1/todos');
        setTodos(r.data.todos);
    }

    React.useEffect(() => {
        getTodos();
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;