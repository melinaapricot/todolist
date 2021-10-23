import React, {useState, useEffect} from "react";
import './App.css';
import Task from './Task/Task'
import TaskCreator from "./TaskCreator/TaskCreator";

function App() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/todos')
            .then(response => response.json())
            .then(setTasks)
    }, []);


    return (
        <div className="App">
            <header className="App-header">
                <h3>ALL TASKS</h3>
            </header>
            <main>
                {tasks.map(task => <Task key={task.id} isDone={task.isDone} message={task.message}/>)}
                <TaskCreator onCreate={handleTaskCreation}/>
            </main>
        </div>
    );

    function handleTaskCreation(task) {
        setTasks([task, ...tasks])

    }
}

export default App;