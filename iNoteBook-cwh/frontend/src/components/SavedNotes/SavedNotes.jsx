// import React from 'react'
import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import './Card.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const SavedNotes = () => {
  const navigate = useNavigate();

  const notify = () => toast.info("Note Updated Successfully!");

  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate("/Login");

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };
  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag); // Update the note
    notify(); // Show the toast notification
    setTimeout(() => {
      refClose.current.click(); // Close the modal after a slight delay
    }, 100); // Adjust delay if necessary
  };
  

  const [note, setnote] = useState({ id: "", etitle: "", etag: "", edesc: "" });

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        {/* Button to trigger modal */}
        <button type="button" className="btn demo-btn btn-primary" onClick={handleShow} ref={ref}>
          Launch demo modal
        </button>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Update Your Note Here</h5>
                </div>
                <div className="modal-body">
                  {/* Modal body content */}
                  <form>
                    <div className="input-group">
                      <input type="text" value={note.etitle} placeholder="Update Title" id="etitle" name="etitle" required onChange={onChange} />
                      <input type="text" value={note.etag} placeholder="Update Tag" id="etag" name="etag" required onChange={onChange} />
                    </div>
                    <textarea placeholder="Update Note" value={note.edescription} id="edescription" name="edescription" required onChange={onChange}></textarea>
                  </form>
                </div>
                <div className="modal-footer">
                  <button ref={refClose} type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                  <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <h2>Your Notes</h2>
      <div className="container">
        {notes.length === 0 && 'No Notes to display'}
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  );
};

export default SavedNotes;
