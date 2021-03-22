import './App.css';
import cancel from './cancel.png';
import checked from './checked.png';
import trash from './trash.png'
import React, { useState, useEffect } from 'react'

function App() {
  const url = 'https://jsonplaceholder.typicode.com/todos/';

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  // Fetch em React -> https://www.freecodecamp.org/news/fetch-data-react/
  useEffect(() => {
    fetch(url).then(response => {
      if(response.ok){
        return(response.json());
      }
      throw response;
    }).then(todos => {
      setTodos(todos);
    }).catch(error => {
      console.log('Error fetching data ...', error)
      setError(error);
    }).finally(()=>{
      setIsLoading(false);
    })
  }, []);

  const checkToDo = (todo_id, complete_status) => {
    let new_todos = [...todos];
    new_todos.forEach(new_todo => {
      if (new_todo.id === todo_id){
        new_todo.completed = !complete_status;
      }
    })
    setTodos(new_todos);
  }

  const deleteToDo = (todo_id) =>{
    const removed_todos =todos.filter(todo => todo.id !== todo_id);
    setTodos(removed_todos);
  }

  if(isLoading) return "Is Loading...."
  else if(error) return "Error"
  
  return (
    <>
    {todos.map(todo => {
      // Aqui seria melhor fazer uma complente que lidaria com esse if
      if(todo.completed){
        return(
        <div key={todo.id} className="todo">
          <h1>{todo.title}</h1>
          <div className="actions_buttons">
            <button onClick={()=>checkToDo(todo.id, true)}><img src={checked} alt="Task completed"/></button>
            <button onClick={()=>deleteToDo(todo.id)}><img src={trash} alt="Delete to do"/></button>
          </div>
        </div>)
      }
      return(
        <div key={todo.id} className="todo">
          <h1>{todo.title}</h1>
          <div className="actions_buttons">
            <button onClick={()=>checkToDo(todo.id, false)}><img src={cancel} alt="Not complete task"/></button>
            <button onClick={()=>deleteToDo(todo.id)}><img src={trash} alt="Delete to do"/></button>
          </div>
        </div>
      )
    })}
    </>
  );
}

export default App;
