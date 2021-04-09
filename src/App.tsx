import React, { useState } from 'react';
import { useTodo } from './hooks/useTodo';
import './App.css';

function App() {
  const [todoInputText, setTodoInputText] = useState<string>("");
  const [todoList, addTodo, removeTodo, toggleDone] = useTodo<{ todo: string, status: boolean}>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInputText(e.target.value)
  }

  const handleOnAdd = () => {
    addTodo(todoInputText);
    setTodoInputText("")
  }

  const handleOnRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    removeTodo((e.target as HTMLButtonElement).id)
  }

  const handleOnCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleDone((e.target as HTMLButtonElement).id)
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
