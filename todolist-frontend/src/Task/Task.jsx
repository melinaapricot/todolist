import React from "react";
import './Task.css';

export default function Task(props) {
    return(
        <div className="task">
            <input checked={props.task.isDone} type="checkbox"/>
            <span className="task__message">{props.task.message}</span>
            <button onClick={handleTaskDeletion}>x</button>
        </div>

    )

    function handleTaskDeletion() {
        fetch('http://localhost:8080/api/todos/' + props.task.id,
            { method: 'DELETE' })
            .then(() => props.onDelete(props.task.id));
    }

}
