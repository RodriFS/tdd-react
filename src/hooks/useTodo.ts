import { useCallback, useState } from "react";

export type UseTodoResult<T> = [
  T[],
  (todo: string) => void,
  (id: string) => void,
  (id: string) => void
];
export function useTodo<T>(): UseTodoResult<T> {
  const [todoList, setTodoList] = useState<(T | any)[]>([]);

  const addTodo = useCallback((todoInputText: string) => {
    if (!todoInputText) {
      return;
    }

    setTodoList((prevState) => {
      const alreadyExists = prevState.some(item => item.todo === todoInputText);
      if (alreadyExists) {
        return prevState;
      }
      return [...prevState, { todo: todoInputText, status: false }]})
  }, [setTodoList])

  const removeTodo = useCallback((id: string) => {
    setTodoList((prevState) => prevState.filter(item => item.todo !== id))
  }, [setTodoList])

  const toggleDone = useCallback((id: string) => {
    setTodoList((prevState) => prevState.map((item) => {
      if (item.todo === id) {
        return {
          ...item,
          status: !item.status
        }
      }
      return item
    }))
  }, [setTodoList])


  return [todoList, addTodo, removeTodo, toggleDone];
}
