import React from "react";
import './Task.css';

export default function Task(props) {
    return(
        <div className="task">
            <input checked={props.task.isDone} onChange={handleCheck} type="checkbox"/>
            <span className="task__message">{props.task.message}</span>
            <button onClick={handleTaskDeletion}>x</button>
        </div>

    )

    function handleTaskDeletion() {
        fetch('http://localhost:8080/api/todos/' + props.task.id,
            { method: 'DELETE' })
            .then(() => props.onDelete(props.task.id));
    }

    function handleCheck() {
        const requestBody = {
            ...props.task,
            isDone: !props.task.isDone,
        }

        fetch('http://localhost:8080/api/todos/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json())
            .then(data => {
                props.onCheck(data);

            })
    }

}
