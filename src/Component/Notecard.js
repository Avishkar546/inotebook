// NoteCard.js
import React, { useContext, useState } from 'react';
import "../App"
import noteContext from '../Context/notes/noteContext';
import Update_modal from './Update_modal';

const NoteCard = ({ note }) => {
    const { deleteNote, updateNote } = useContext(noteContext);

    // const {Notes} = context;

    const handleDelete = (noteId) => {
        console.log(noteId);
        deleteNote(noteId);  // From API call we can get the note id of that particular note.
    }

    const [showModal, setshowModal] = useState(true);

    const changeModal = () => {
        setshowModal(!showModal);
    }

    const handleUpdate = () => {
        // alert(`Edit is clicked ${showModal}`); for debug i used this
        console.log(showModal);
        if (showModal === true) {
            // <Update_modal showModal={showModal} changeModal={changeModal} />
            <Update_modal />
        }
        // {showModal && (<Update_modal showModal={showModal} changeModal={changeModal}/>)}
        // updateNote(note._id,"Daily Task","DSA Daily dose, iNotebook project work","Placement");
    }
    return (
        <>
            <div className="col-md-4 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.Title}</h5>
                        <p className="card-text">{note.Description}</p>
                        <p className="card-text"><strong>Tag:</strong> {note.Tag}</p>
                        <p className="card-text"><strong>Timestamp:</strong> {note.Timestamp}</p>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary btn-sm" onClick={handleUpdate}>Update</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(note._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Update_modal /> */}
        </>
    );
};

export default NoteCard;
