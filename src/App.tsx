
import React, { useState, useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean
};


function App(): JSX.Element {

  const [ newTask, setNewTask ] = useState<string>('');
  const [ tasks, setTasks ] = useState<ITask[]>([]);
  const formInput  = useRef<HTMLInputElement>(null);

  const handleSubmit = ( e: FormElement ) => {

    e.preventDefault();

    addTask( newTask );

    setNewTask( "" );

    formInput.current?.focus();

  }

  const addTask = ( name: string ) => {

    const newTasks = [ ...tasks, {name, done: false}];
    setTasks(newTasks)
  }

  const togleDone = ( i: number ) => {

    const newTask: ITask[] = [ ...tasks ];
    newTask[i].done = !newTask[i].done;
    setTasks(newTask);
  }

  const deleteTask = ( i: number ) => {

    const allTasks: ITask[] = [ ...tasks ];
    allTasks.splice( i, 1 );
    setTasks(allTasks);

  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit = {handleSubmit}>
                <input type="text" onChange={ e => setNewTask( e.target.value )} value = { newTask } className = "form-control" autoFocus ref = {formInput}/>
                <button className = "btn btn-success mt-2">Save</button>
              </form>
            </div>
          </div>

            {
              tasks.map(( oneTask: ITask, i: number ) => (
                <div className="card card-body mt-2" key = {i}>
                  <h2 style = {{ textDecoration: oneTask.done ? 'line-through' : '' }}>
                    { oneTask.name }
                  </h2>
                  <div>
                    <button className = 'btn btn-primary' onClick = { () => togleDone(i) }>
                      { oneTask.done ? "✓" : '✗'}
                    </button>
                    <button className = 'btn btn-warning ms-2' onClick = { () => deleteTask(i) }>
                    🗑
                    </button>
                  </div>
                </div>
            ))}
        </div>
      </div>
    </div>

  );
}

export default App;
