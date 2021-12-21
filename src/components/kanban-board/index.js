import React, { useState } from "react";
import "./index.css";

const KanbanBoard = () => {

  // Each task is uniquely identified by its name. 
  // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
  
  const [inputTask, setInputTask] = useState("")

  const [tasks, setTasks] = useState([
    { name: '1', stage: 0 },
    { name: '2', stage: 0 }
  ])

  const stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];

  let stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }
  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  // --- Handle Create Task --- //
  const handleCreateTask = (e) => {
    e.preventDefault();
    if(inputTask !== "") {
      setTasks([...tasks, { name: inputTask, stage: 0}])
    }
  }

  // --- Handle Delete Task --- //
  const handleDeleteTask = (e, index) => {
    tasks.splice(index, 1);
    setTasks([...tasks])
  }

  // --- Handle Arrow Forward --- //
  const handleArrowForward = (e, index) => {
    tasks[index].stage += 1
    setTasks([...tasks])
  }

  // --- Handle Arrow Backward --- //
  const handleArrowBackward = (e, index) => {
    tasks[index].stage -= 1
    setTasks([...tasks])
  }

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input" value={inputTask} onChange={(e) => setInputTask(e.target.value)} />
        <button type="submit" className="ml-30" data-testid="create-task-button" onClick={handleCreateTask}>Create task</button>
      </section>

      <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
              return (
                  <div className="card outlined ml-20 mt-0" key={`${i}`}>
                      <div className="card-text">
                          <h4>{stagesNames[i]}</h4>
                          <ul className="styled mt-50" data-testid={`stage-${i}`}>
                              {tasks.map((task, index) => {
                                return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                  <div className="li-content layout-row justify-content-between align-items-center">
                                    <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                    <div className="icons">
                                      <button 
                                        className="icon-only x-small mx-2" 
                                        data-testid={`${task.name.split(' ').join('-')}-back`} 
                                        onClick={(e) => handleArrowBackward(e, index)}
                                        disabled={task.stage === 0 ? true : false}>
                                        <i className="material-icons">arrow_back</i>
                                      </button>
                                      <button 
                                        className="icon-only x-small mx-2" 
                                        data-testid={`${task.name.split(' ').join('-')}-forward`} 
                                        onClick={(e) => handleArrowForward(e, index)}
                                        disabled={task.stage === 3 ? true : false}>
                                        <i className="material-icons">arrow_forward</i>
                                      </button>
                                      <button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`} onClick={(e) => handleDeleteTask(e, index)}>
                                        <i className="material-icons">delete</i>
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              })}
                          </ul>
                      </div>
                  </div>
              )
          })}
      </div>
    </div>
  );
}

export default KanbanBoard;