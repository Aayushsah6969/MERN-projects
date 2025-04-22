import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:3000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);
  //get all notes
  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    // console.log(data);
    setnotes(data);
  };
  //Add a note
  const addNote = async ( title, tag, description) => {
    //todo: api call
    //todo: api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response);
    const note = {
      _id: "668111935243d0669d137cc3",
      user: "6680f42ae9923d0ace130a46",
      title: title,
      description: description,
      tag: tag,
      date: "2024-06-30T08:04:35.448Z",
      __v: 0,
    };
    setnotes(notes.concat(note));
  };
  //Delete Note
  const deleteNote = async (id) => {
    //todo: api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    console.log(data);
 
    console.log("deleting the note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //todo: api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
      body: JSON.stringify({id, title, description, tag }),
    });
    // const json =   response.json();
    console.log(response);

const  latestNotes = JSON.parse(JSON.stringify(notes));

    //logic to edit in client
    for (let index = 0; index < latestNotes.length; index++) {
      const element = latestNotes[index];
      if (element._id === id) {
        latestNotes[index].title = title;
        latestNotes[index].description = description;
        latestNotes[index].tag = tag;
        break;
      }
    }
    setnotes(latestNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
       
    </NoteContext.Provider>
  );
};

export default NoteState;
