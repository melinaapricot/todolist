import React from "react";
import './Task.css';

export default function Task(props) {
    return(
        <div className="task">
            <input checked={props.isDone} type="checkbox"/>
            <span className="task__message">{props.message}</span>
            <button>x</button>
        </div>

    )
}
