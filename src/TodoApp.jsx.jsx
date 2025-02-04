/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [name, setName] = useState('');
    const [img, setImg] = useState(null);
    const [description, setDescription] = useState('');

    // Fetch todos from the backend
    useEffect(() => {
        fetch('/todos')
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error('Error fetching todos:', error));
    }, []);

    // Function to add a new todo
    const addTodo = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('img', img);
        formData.append('description', description);

        fetch('/todos', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setTodos([...todos, data]);
            setName('');
            setImg(null);
            setDescription('');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    return (
        <div>
            <h1>To-Do App</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImg(e.target.files[0])}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button onClick={addTodo}>Add Todo</button>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <h2>{todo.name}</h2>
                        <img src={`storage/${todo.img}`} alt={todo.name} style={{ width: '100px' }} />
                        <p>{todo.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;