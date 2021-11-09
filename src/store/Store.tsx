import React, { useContext, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { City, Note } from "../types";

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

interface WeatherAppContextShape {
  cityList: Array<City>;
  addCity: Function;
  removeCity: Function;
  AddNote: Function;
  updateNote: Function;
  deleteNote: Function;
  noteList: Array<Note>;
  setNoteList: Function;
}

const initialState: WeatherAppContextShape = {
  cityList: [],
  addCity: () => {},
  removeCity: () => {},
  AddNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  noteList: [],
  setNoteList: () => {},
};

const WeatherApp = createContext<WeatherAppContextShape>(initialState);

export const useWeatherStoreContext = () =>
  useContext<WeatherAppContextShape>(WeatherApp);

export const Provider: React.FC = ({ children }) => {
  const [cityList, setCityList] = useLocalStorage("cityList", defaultList);
  const [noteList, setNoteList] = useLocalStorage("notes", []);

  /**
   * Add city to the list
   * @param {string} cityName Name of the city to add to the list of favorite cities
   */
  const addCity = (cityName: string) => {
    if (
      !cityList.find(
        (city: City) => cityName.toLowerCase() === city.name.toLowerCase()
      )
    ) {
      const nextId =
        cityList.length > 0
          ? Math.max(...cityList.map((city: City) => city.id)) + 1
          : 0;
      setCityList([...cityList, { id: nextId, name: cityName }]);
    } else {
      return { message: "City already exists" };
    }
  };

  /**
   * Delete city from the list together with the associated notes
   * @param {number} id City Id to be removed
   * @returns void
   */
  const removeCity = (id: number) => {
    setCityList(cityList.filter((city: City) => city.id !== id));
    setNoteList([...noteList.filter((note: Note) => note.cityId !== id)]);
  };

  /**
   * Add note using city id and the associated note
   * @param {string} newNote Note to be added to the noteList
   * @param {number} cityId City id associated with the note
   */

  const AddNote = (newNote: string, cityId: number) => {
    if (newNote.length) {
      const existingCityNote = noteList.find(
        (note: Note) => note.cityId === cityId
      );
      if (existingCityNote) {
        const nextId =
          existingCityNote.note.length > 0
            ? Math.max(...existingCityNote.note.map((note: any) => note.id)) + 1
            : 0;

        const noteToAdd = [
          ...existingCityNote.note,
          { id: nextId, noteText: newNote },
        ];
        const index = noteList.findIndex((note: Note) => note.cityId === cityId);
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
  const updateNote = (updatedNote: string, cityId: number, noteId: number) => {
    const index = noteList.findIndex((note: Note) => note.cityId === cityId);
    let noteToUpdate = noteList[index].note.find(
      (item: any) => item.id === noteId
    );
    noteToUpdate.noteText = updatedNote;
  };

  /**
   * Removes the note given its node it
   * @param {number} noteId The id of the node to be deleted
   * @param {number} cityId City id associated with the note
   */
  const deleteNote = (noteId: number, cityId: number) => {
    const index = noteList.findIndex((note: Note) => note.cityId === cityId);
    const updatedNoteList = noteList[index].note.filter(
      ({ id }) => id !== noteId
    ) as Array<Note>
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
