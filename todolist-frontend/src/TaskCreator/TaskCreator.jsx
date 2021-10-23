import React, {useState} from 'react';
import './TaskCreator.css'

export default function TaskCreator(props) {
    const [description, setDescription] = useState("");
    const [isDone, setDone] = useState(false);

    return (
        <div className="task-creator">
            <input
                type="checkbox"
                checked={isDone}
                onChange={e => setDone(e.target.checked)}
            />
            <input
                value={description}
                onChange={e => setDescription(e.target.value)}
                type="text"
                placeholder="task description"
                className="task-creator__text"/>

            <button onClick={handleTaskCreation}>Save task</button>
        </div>
    )

    function handleTaskCreation() {
        const requestBody = {
            message: description,
            isDone: isDone,
        }

        fetch("http://localhost:8080/api/todos/create", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                props.onCreate(data);
                setDescription("");
            })

    }
}
