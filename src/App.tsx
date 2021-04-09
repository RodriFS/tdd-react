import React, { useState } from 'react';
import './App.css';

function App() {
  const [todoInputText, setTodoInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<{ todo: string, status: boolean}[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInputText(e.target.value)
  }

  const handleOnAdd = () => {
    if (!todoInputText) {
      return;
    }
    const alreadyExists = todoList.some(item => item.todo === todoInputText);
    if (alreadyExists) {
      return;
    }
    setTodoList((prevState) => [...prevState, { todo: todoInputText, status: false }])
    setTodoInputText("");
  }

  const handleOnRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTodoList((prevState) => prevState.filter(item => item.todo !== (e.target as HTMLButtonElement).id))
  }

  const handleOnCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoList((prevState) => prevState.map((item) => {
      if (item.todo === e.target.id) {
        return {
          ...item,
          status: !item.status
        }
      }
      return item
    }))
  }

  return (
    <div className="App">
      <header data-testid="todo-heading">Todo App</header>
      <input data-testid="input-todo" value={todoInputText} onChange={handleOnChange}/>
      <button data-testid="add-todo" onClick={handleOnAdd}>Add Todo</button>
      <ul>
      {todoList.map(item => <li key={item.todo}>
        <span>{item.todo}</span>
        <input type="checkbox" checked={item.status} id={item.todo} onChange={handleOnCheck}/>
        <button id={item.todo} onClick={handleOnRemove}>X</button>
        </li>)}
      </ul>
    </div>
  );
}

export default App;
