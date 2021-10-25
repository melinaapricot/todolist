import React from "react";
import './Task.css';

export default function Task(props) {
    return(
        <div className="task">
            <input checked={props.task.isDone} onChange={handleCheck} type="checkbox"/>
            <span onClick={handleMessageEdit} className="task__message">{props.task.message}</span>
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

        updateTask(requestBody);
    }

    function handleMessageEdit() {
        const popupText = window.prompt("Enter your task description here:", "");
        if (!popupText) return;

        const requestBody = {
            ...props.task,
            message: popupText,
        }
        updateTask(requestBody);
    }

    function updateTask(newTask) {
        fetch('http://localhost:8080/api/todos/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask),
        })
            .then(response => response.json())
            .then(props.onChange)
    }
}
