import React from "react";
import Notes from "../components/Notes/Notes";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "../store/Store";
describe("<Notes/>", () => {
  
  beforeEach(() => {
     render(
      <Provider>
        <Notes cityId={1} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks()
  })

  test("should display notes input correctly", () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Note/})).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Empty Note/})).toBeInTheDocument();
    expect(screen.getByText(/There is no Notes to display at the moment/i)).toBeInTheDocument();
  });

  test("should add new note", () => {
      const textInput = screen.getByRole("textbox");
      const addButton = screen.getByRole('button', { name: /Add Note/});

      expect(textInput).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();

      userEvent.click(addButton);
      const requiredLabel = screen.getByText(/Note is required */i);
      expect(requiredLabel).toBeInTheDocument();

      userEvent.type(textInput, 'this is the great manchester city');
      userEvent.click(addButton);

      expect(screen.getByText(/this is the great manchester city/i)).toBeInTheDocument();
  });

  test("should update a note entered", () => {
    const editIconButton = screen.getByTitle(/Edit/);
    expect(editIconButton).toBeInTheDocument()

    userEvent.click(editIconButton);
    const updateNoteButton = screen.getByRole('button', /Edit Note/i);
    expect(updateNoteButton).toBeInTheDocument();

    const noteTextInput = screen.getByRole('textbox');
    expect(noteTextInput.textContent).toBe('this is the great manchester city');

    userEvent.type('Greater manchester city');
    userEvent.click(updateNoteButton);
  });

  test("should delete a note from the list", () => {
    const deleteIconButton = screen.getByTitle(/Delete/);
    expect(deleteIconButton).toBeInTheDocument();

    userEvent.click(deleteIconButton);

    expect(screen.getByRole('heading', { name: /Empty Note/})).toBeInTheDocument();
    expect(screen.getByText(/There is no Notes to display at the moment/i)).toBeInTheDocument();
  });

});
