// import React from 'react'
import "./AddNote.css";
import { useContext, useState } from "react";
import NoteContext from "../../context/notes/NoteContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNote = () => {
  const success = () => toast.success("Note Added Successfully!");

  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setnote] = useState({ title: "", tag: "", desc: "" })

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.tag, note.description);
    success();
  }

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }



  return (
    <>
      <div className="contact-form-container">
        <h1>Add Your Notes</h1>
        <p>
          Your all notes are stored in the cloud with high-end security and
          encryption!
        </p>
        <form>
          <div className="input-group">
            <input type="text" placeholder="Title" id="title" name="title" required onChange={onChange} />
            <input type="text" placeholder="Tag" id="tag" name="tag" required onChange={onChange} />
          </div>
          <textarea placeholder="Note" id="description" name="description" required onChange={onChange}></textarea>
          <button type="submit" onClick={handleClick} className='my-3'>Save</button>
          <ToastContainer />

        </form>
      </div>
    </>
  );
};

export default AddNote;
