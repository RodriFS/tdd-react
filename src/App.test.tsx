import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe("App feature", () => {
  test('it renders a header', () => {
    const { getByTestId } = render(<App />);
    const headerElement = getByTestId("todo-heading");
    expect(headerElement).toBeInTheDocument();
  });

  test('it renders an `Add Todo` button', () => {
    const { getByTestId } = render(<App />);
    const buttonElement = getByTestId("add-todo");
    expect(buttonElement).toBeInTheDocument();
  });

  test('it renders an `Todo` input', () => {
    const { getByTestId } = render(<App />);
    const inputElement = getByTestId("input-todo");
    expect(inputElement).toBeInTheDocument();
  });

  test('it adds the text of the todo input in the list of todos', () => {
    const { rerender, getAllByRole, getByTestId } = render(<App />);
    const inputElement = getByTestId("input-todo");
    const buttonElement = getByTestId("add-todo");

    fireEvent.change(inputElement, { target: { value: 'custom input' } });
    fireEvent.click(buttonElement);
    rerender(<App />);

    const listElements = getAllByRole("listitem");
    expect(listElements.length).toBe(1);

    const [firstElement] = listElements;
    expect(firstElement.children[0].innerHTML).toBe("custom input")
    expect(firstElement.children[1]).not.toBeChecked()
    expect(firstElement.children[2]).toBeDefined()
  })

  test("you can mark a todo as done", () => {
    const { rerender, getAllByRole, getByTestId } = render(<App />);
    const inputElement = getByTestId("input-todo");
    const buttonElement = getByTestId("add-todo");

    fireEvent.change(inputElement, { target: { value: 'custom input' } });
    fireEvent.click(buttonElement);

    const listElements = getAllByRole("listitem");

    const [firstElement] = listElements;

    fireEvent.click(firstElement.children[1]);
    rerender(<App />);

    expect(firstElement.children[1]).toBeChecked()
  })

  test("you can't add an empty todo", () => {
    const { rerender, getByRole, getByTestId } = render(<App />);
    const inputElement = getByTestId("input-todo");
    const buttonElement = getByTestId("add-todo");

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(buttonElement);
    rerender(<App />);

    expect(getByRole("list")).toBeEmptyDOMElement()
  })

  test("it clears the input when adding a todo", () => {
    const { rerender, getAllByRole, getByTestId } = render(<App />);
    const inputElement = getByTestId("input-todo");
    const buttonElement = getByTestId("add-todo");

    fireEvent.change(inputElement, { target: { value: 'custom input' } });
    fireEvent.click(buttonElement);
    rerender(<App />);

    const listElements = getAllByRole("listitem");
    expect(listElements.length).toBe(1);
    expect(inputElement).toHaveValue("")
  })

  test("you can't have two items with the same text", () => {
    const { rerender, getAllByRole, getByTestId } = render(<App />);
    const inputElement = getByTestId("input-todo");
    const buttonElement = getByTestId("add-todo");

    fireEvent.change(inputElement, { target: { value: 'custom input' } });
    fireEvent.click(buttonElement);
    fireEvent.change(inputElement, { target: { value: 'custom input' } });
    fireEvent.click(buttonElement);
    rerender(<App />);

    const listElements = getAllByRole("listitem");
    expect(listElements.length).toBe(1);

    const [firstElement, secondElement] = listElements;
    expect(firstElement.children[0].innerHTML).toBe("custom input")
    expect(secondElement).not.toBeDefined()
  })

  test("you can delete a `Todo`", () => {
    const { rerender, getAllByRole, getByTestId, getByRole } = render(<App />);
    const inputElement = getByTestId("input-todo");
    const buttonElement = getByTestId("add-todo");

    fireEvent.change(inputElement, { target: { value: 'custom input' } });
    fireEvent.click(buttonElement);
    rerender(<App />);

    const listElements = getAllByRole("listitem");
    const [firstElement] = listElements;
    fireEvent.click(firstElement.children[2]);
    rerender(<App />);

    expect(getByRole("list")).toBeEmptyDOMElement()
  })
})
