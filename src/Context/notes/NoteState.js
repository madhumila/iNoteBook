import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZmJiOTk5ZTY2NDRkNTYwNWE5NDA5In0sImlhdCI6MTY4ODE4OTg0OX0.CRB77R573QyntmS4QrLBZvvDsjHBN2VZOMVuoxN9Isg"
      },
    });
    const json = await response.json();
    console.log(json);
    // setNotes(json)
  };

  const addNote = async (title, description, tag) => {
    console.log("adding a new note");
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type':'application/json',
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZmJiOTk5ZTY2NDRkNTYwNWE5NDA5In0sImlhdCI6MTY4ODE4OTg0OX0.CRB77R573QyntmS4QrLBZvvDsjHBN2VZOMVuoxN9Isg",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    const note = {
      _id: "64a3e9c909cefe49131af034",
      user: "649fbb999e6644d5605a9409",
      title: title,
      description: description,
      tag: tag,
      date: "2023-07-04T09:43:37.156Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  const deleteNote = (id) => {
    
    const filteredNote = notes.filter((note) => note._id !== id);
    setNotes(filteredNote);
  };
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZmJiOTk5ZTY2NDRkNTYwNWE5NDA5In0sImlhdCI6MTY4ODE4OTg0OX0.CRB77R573QyntmS4QrLBZvvDsjHBN2VZOMVuoxN9Isg",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
