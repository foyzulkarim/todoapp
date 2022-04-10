// Render Prop
import React from 'react';
// import axios
import axios from 'axios';

const Basic = () => {

    const onSubmit = async (event) => {
        event.preventDefault();
        const r = await axios.post('http://localhost:3001/api/v1/todos', {
            "name": event.target.firstName.value,
            "description": "world"
        });
        console.log('response', r);
    }

    return (
        <div>
            <h1>Any place in your app!</h1>
            <form onSubmit={onSubmit}>
                <label>
                    Name:
                    <input type="text" name="firstName" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};

export default Basic;