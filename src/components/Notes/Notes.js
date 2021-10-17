import React, { useMemo, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import EmptyState from "../EmptyState/EmptyState";
import styles from "./Note.module.css";
import { isEmpty } from "lodash";
import { useWeatherStoreContext } from "../../store/Store";

const Notes = ({ cityId }) => {
  const { noteList, AddNote, updateNote, deleteNote } =
    useWeatherStoreContext();
  const [newNote, setNewNote] = useState("");
  const [mode, setMode] = useState({ inEditMode: false, noteId: null });
  const [required, setRequired] = useState(false);

  const currentListNote = useMemo(
    () => noteList.find((note) => note.cityId === cityId)?.note,
    [cityId, noteList]
  );

  const clearTextArea = () => {
    setNewNote("");
    setRequired(false);
  };

  const handleSave = () => {
    if (newNote.length) {
      AddNote(newNote, cityId);
      clearTextArea();
    } else {
      setRequired(true);
    }
  };

  const handleEdit = ({ id, noteText }) => {
    setMode({ inEditMode: true, noteId: id });
    setNewNote(noteText);
  };

  const handleUpdate = () => {
    updateNote(newNote, cityId, mode.noteId);
    setMode({ inEditMode: false, noteId: null });
    clearTextArea();
  };

  const handleDelete = (noteId) => deleteNote(noteId, cityId);

  return (
    <div className={styles.noteWrapper}>
      <label className="label" htmlFor="note">
        Enter note
      </label>
      <textarea
        className="textInput"
        rows={3}
        type="text"
        value={newNote}
        onChange={(event) => setNewNote(event.target.value)}
        placeholder="Enter Note"
        required
        id="note"
      />
      {required && <p className="labelDanger">Note is required *</p>}
      {mode.inEditMode ? (
        <button className="btn btn-secondary" onClick={() => handleUpdate()}>
          Edit Note
        </button>
      ) : (
        <button className="btn btn-primary" onClick={() => handleSave()}>
          Add Note
        </button>
      )}
      <hr />
      {!isEmpty(currentListNote) ? (
        <ul className={styles.listWrapper}>
          {currentListNote.map((note) => (
            <li key={note.id} className={styles.listItem}>
              <p>{note.noteText}</p>
              <div>
                <AiFillEdit
                  title="Edit"
                  className={styles.icon}
                  size={25}
                  color="orange"
                  onClick={() => handleEdit(note)}
                />
                <AiFillDelete
                  title="Delete"
                  className={styles.icon}
                  size={25}
                  color="red"
                  onClick={() => handleDelete(note.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState headerTitle="Empty Note" displayText="Notes" />
      )}
    </div>
  );
};

export default Notes;
