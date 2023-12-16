// NoteCard.js
import React, { useContext } from 'react';
import "../App"
import noteContext from '../Context/notes/noteContext';
import UpdateModal from './UpdateModal';

const NoteCard = ({ note,handleUpdate }) => {
    const { deleteNote } = useContext(noteContext);

    const handleDelete = (noteId) => {
        console.log(noteId);
        deleteNote(noteId);  // From API call we can get the note id of that particular note.
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
                            <UpdateModal id={note._id} title={note.Title} description={note.Description} tag={note.Tag} handleUpdate={handleUpdate}/>  {/*<!--Memorable step --> */}
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(note._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default NoteCard;
