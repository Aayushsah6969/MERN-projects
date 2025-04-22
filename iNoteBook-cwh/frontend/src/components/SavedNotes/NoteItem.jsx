/* eslint-disable react/prop-types */
import { useContext } from 'react';
import './Card.css';
import NoteContext from "../../context/notes/NoteContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteItem = (props) => {
  const { deleteNote } = useContext(NoteContext); // Access deleteNote from context
  const { note, updateNote } = props; // Destructure note and updateNote from props

  // Function to show a toast notification on delete
  const notifyDelete = () => toast.error("Note Deleted Successfully!");

  return (
    <div className="card-container">
      <h3 className="card-title">{note.title}</h3>
      <h5 className='card-tag'>{note.tag}</h5>
      <p className="card-text">{note.description}</p>
      <button onClick={() => updateNote(note)} className='mx-2 my-1'>Edit</button>
      <button onClick={() => {
        deleteNote(note._id); // Call deleteNote to delete the note
        notifyDelete(); // Show toast notification for deletion
      }} className='mx-2 my-1'>Delete</button>
    </div>
  );
};

export default NoteItem;
