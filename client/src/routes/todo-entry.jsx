// Render Prop
import React, { useState } from 'react';
// import axios
import axios from 'axios';

const Basic = () => {

    const [name, setName] = useState('');
    const [msg, setMsg] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        const r = await axios.post('http://localhost:3001/api/v1/todos', {
            "name": event.target.name.value,
            "description": "world"
        });
        console.log('response', r);
        setMsg(r.data.message);
        setName('');
    }

    const clearForm = () => {
        setName('');
        setMsg('');
    }

    const nameChanged = (event) => {
        setName(event.target.value);
    }

    return (
        <div>
            <h1>Any place in your app!</h1>
            <form onSubmit={onSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" style={{ marginLeft: '5px' }} value={name} onChange={nameChanged} />
                </label>
                <input type="submit" value="Submit" style={{ marginLeft: '5px' }} />
                <button type='button' style={{ marginLeft: '5px' }} onClick={clearForm}>Clear</button>
            </form>
            <span>{msg}</span>
        </div>
    )
};

export default Basic;