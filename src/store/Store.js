import React, { useContext, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

/**
 * This default list of top 15 cities by population has been adapted from
 * https://worldpopulationreview.com/world-cities
 */
const defaultList = [
  { id: 0, name: "Tokyo" },
  { id: 1, name: "Delhi" },
  { id: 2, name: "Shanghai" },
  { id: 3, name: "Sao Paulo" },
  { id: 4, name: "Mexico City" },
  { id: 5, name: "Dhaka" },
  { id: 6, name: "Cairo" },
  { id: 7, name: "Beijing" },
  { id: 8, name: "Mumbai" },
  { id: 9, name: "Osaka" },
  { id: 10, name: "New York" },
  { id: 11, name: "Karachi" },
  { id: 12, name: "Chongqing" },
  { id: 13, name: "Istanbul" },
  { id: 14, name: "Buenos Aires" },
];

const WeatherApp = createContext(null);

export const useWeatherStoreContext = () => useContext(WeatherApp);

export const Provider = (props) => {
  const { children } = props;
  const [cityList, setCityList] = useLocalStorage("cityList", defaultList);
  const [noteList, setNoteList] = useLocalStorage("notes", []);

  /**
   * Add city to the list
   * @param {string} cityName Name of the city to add to the list of favorite cities
   */
  const addCity = (cityName) => {
    if (
      !cityList.find(
        (city) => cityName.toLowerCase() === city.name.toLowerCase()
      )
    ) {
      const nextId =
        cityList.length > 0
          ? Math.max(...cityList.map((city) => city.id)) + 1
          : 0;
      setCityList([...cityList, { id: nextId, name: cityName }]);
    }
  };

  /**
   * Delete city from the list together with the associated notes
   * @param {number} id City Id to be removed
   * @returns void
   */
  const removeCity = (id) => {
    setCityList(cityList.filter((city) => city.id !== id));
    setNoteList([...noteList.filter((note) => note.cityId !== id)]);
  };

  /**
   * Add note using city id and the associated note
   * @param {string} newNote Note to be added to the noteList
   * @param {number} cityId City id associated with the note
   */

  const AddNote = (newNote, cityId) => {
    if (newNote.length) {
      const existingCityNote = noteList.find((note) => note.cityId === cityId);
      if (existingCityNote) {
        const nextId =
          existingCityNote.note.length > 0
            ? Math.max(...existingCityNote.note.map((note) => note.id)) + 1
            : 0;

        const noteToAdd = [
          ...existingCityNote.note,
          { id: nextId, noteText: newNote },
        ];
        const index = noteList.findIndex((note) => note.cityId === cityId);
        noteList[index].note = noteToAdd;
        setNoteList([...noteList]);
      } else {
        const newNoteItem = {
          cityId: cityId,
          note: [{ id: 1, noteText: newNote }],
        };
        setNoteList([...noteList, newNoteItem]);
      }
    }
  };

  /**
   * Update the note give the node id, associate city id and the note to update to
   * @param {string} updatedNote The updated note text to be modified
   * @param {number} cityId City id associated with the node
   * @param {string} noteId Note id to be updated, uses this node id to update the note
   */
  const updateNote = (updatedNote, cityId, noteId) => {
    const index = noteList.findIndex((note) => note.cityId === cityId);
    let noteToUpdate = noteList[index].note.find((item) => item.id === noteId);
    noteToUpdate.noteText = updatedNote;
  };

  /**
   * Removes the note given its node it
   * @param {number} noteId The id of the node to be deleted
   * @param {number} cityId City id associated with the note
   */
  const deleteNote = (noteId, cityId) => {
    const index = noteList.findIndex((note) => note.cityId === cityId);
    const updatedNoteList = noteList[index].note.filter(
      ({ id }) => id !== noteId
    );
    noteList[index].note = updatedNoteList;
    setNoteList([...noteList]);
  };

  return (
    <WeatherApp.Provider
      value={{
        cityList,
        addCity,
        removeCity,
        AddNote,
        updateNote,
        deleteNote,
        noteList,
        setNoteList,
      }}
    >
      {children}
    </WeatherApp.Provider>
  );
};
