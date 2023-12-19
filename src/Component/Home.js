import React, { useContext, useEffect } from 'react'
import noteContext from "../Context/notes/noteContext"
import Notecard from "./Notecard"
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'

export default function Home() {
  let navigation = useNavigate();
  const context = useContext(noteContext);
  const { Notes, getNote, updateNote } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote();
    }
    else {
      navigation("/login");
    }
  })

  const handleUpdate = (editNote) => { // Get values after user update the notes on clicking save changes
    // console.log(`${editNote.etitle} : ${editNote.edescription} : ${editNote.etag}`);
    updateNote(editNote.id, editNote.etitle, editNote.edescription, editNote.etag);
  }

  return (
    <>
      <AddNote />
      <div className="container">
        <h1>User Notes</h1>
        {Notes.length === 0 && "No notes to display"}
        <div className="row">
          {Notes.map(note => (
            <Notecard key={note._id} note={note} handleUpdate={handleUpdate} />
          ))}
        </div>
      </div>
    </>
  )
};