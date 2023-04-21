import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes);

  // Get all Notes
  const getNotes = async () => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3ZTZlMjlmNWZkOGI5ZTgwZDExY2I3In0sImlhdCI6MTY2OTM5ODUwOH0.8V9s0Z0ASZ8Hrt_8rRmM9rGAXvHDmb-J8AyTLYhJHFQ",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3ZTZlMjlmNWZkOGI5ZTgwZDExY2I3In0sImlhdCI6MTY2OTM5ODUwOH0.8V9s0Z0ASZ8Hrt_8rRmM9rGAXvHDmb-J8AyTLYhJHFQ",
      },
      body: JSON.stringify({ title, description, tag })
    });

    // Add in Client
    const note = await response.json();
    setNotes(notes.concat(note))
    console.log("Adding a new note")
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3ZTZlMjlmNWZkOGI5ZTgwZDExY2I3In0sImlhdCI6MTY2OTM5ODUwOH0.8V9s0Z0ASZ8Hrt_8rRmM9rGAXvHDmb-J8AyTLYhJHFQ",
      },
    });
    const json = response.json();
    console.log(json);

    // Delete in client
    console.log("Deleting a note with id " + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3ZTZlMjlmNWZkOGI5ZTgwZDExY2I3In0sImlhdCI6MTY2OTM5ODUwOH0.8V9s0Z0ASZ8Hrt_8rRmM9rGAXvHDmb-J8AyTLYhJHFQ",
      },
      body: JSON.stringify({ title, description, tag })
    });
    // eslint-disable-next-line
    const json = response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Code to Edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;