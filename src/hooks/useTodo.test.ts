import { useTodo } from "./useTodo";
import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

describe("useTodo function", () => {
  test("it returns the correct types", () => {
    const { result } = renderHook(() => useTodo<{ todo: string, status: boolean}>());
    expect(Array.isArray(result.current[0])).toBe(true);
    expect(typeof result.current[1]).toBe("function");
    expect(typeof result.current[2]).toBe("function");
    expect(typeof result.current[3]).toBe("function");
  })

  test('it returns reference stable callback', () => {
    const { result } = renderHook(() => useTodo())
    const addCallback = result.current[1];
    const removeCallback = result.current[2];
    const toggleDoneCallback = result.current[3];

    act(() => {
      addCallback("new todo")
      toggleDoneCallback("new todo")
      removeCallback("new todo")
    })

    expect(result.current[1]).toBe(addCallback)
    expect(result.current[2]).toBe(removeCallback)
    expect(result.current[3]).toBe(toggleDoneCallback)
  })

  test("it adds a todo", () => {
    const { result } = renderHook(() => useTodo());

    expect(result.current[0].length).toBe(0);
    act(() => {
      result.current[1]("new todo");
    })

    expect(result.current[0].length).toBe(1);
  })

  test("it marks a todo as done", () => {
    const { result } = renderHook(() => useTodo<{ todo: string, status: boolean}>());
    act(() => {
      result.current[1]("new todo");
    })

    expect(result.current[0][0].status).toBe(false);

    act(() => {
      result.current[3]("new todo");
    })

    expect(result.current[0][0].status).toBe(true);
  })

  test("toggles here and back again", () => {
    const { result } = renderHook(() => useTodo<{ todo: string, status: boolean}>());
    act(() => {
      result.current[1]("new todo");
    })

    expect(result.current[0][0].status).toBe(false);

    act(() => {
      result.current[3]("new todo");
      result.current[3]("new todo");
    })

    expect(result.current[0][0].status).toBe(false);
  })

  test("you can't add an empty todo", () => {
    const { result } = renderHook(() => useTodo());

    expect(result.current[0].length).toBe(0);
    act(() => {
      result.current[1]("");
    })

    expect(result.current[0].length).toBe(0);
  })

  test("you can't have two items with the same text", () => {
    const { result } = renderHook(() => useTodo());

    expect(result.current[0].length).toBe(0);
    act(() => {
      result.current[1]("new todo");
      result.current[1]("new todo");
    })

    expect(result.current[0].length).toBe(1);
  })

  test("you can delete a `Todo`", () => {
    const { result } = renderHook(() => useTodo());

    expect(result.current[0].length).toBe(0);
    act(() => {
      result.current[1]("new todo");
      result.current[2]("new todo");
    })

    expect(result.current[0].length).toBe(0);
  })
})
