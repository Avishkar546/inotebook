import React, { useContext, useEffect } from 'react'
import noteContext from "../Context/notes/noteContext"
import Notecard from "./Notecard"
import AddNote from './AddNote';

export default function Home() {
  const context = useContext(noteContext);
  const { Notes, getNote} = context;

  useEffect(()=>{
    getNote();
  },[])

  return (
    <> 
      <AddNote />
      <div className="container">
        <h1>User Notes</h1>
        <div className="row">
          {Notes.map(note => (
            <Notecard key={note._id} note={note} /> 
          ))}
        </div>
      </div>
    </>

  )
};