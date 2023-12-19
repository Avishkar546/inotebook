import noteContext from './noteContext'
import { useState } from 'react'
import { useAlert } from '../Alert/AlertState';

const NoteState = (props) => {
  let host = "http://localhost:3000/api/notes";
  const initialNotes = []
  const [Notes, setNotes] = useState(initialNotes);

  const {showAlert} = useAlert();
   
  const getNote = async () => {
    // Backend API logic
    // eslint-disable-next-line
    try {
      const response = await fetch(`${host}/getnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      // console.log(response);
      if (!response.ok) {
        console.log(response)
      }
      const json = await response.json();
      const res =  JSON.parse(JSON.stringify(json))
      setNotes(res);
    } catch (error) { 
      console.log(error) 
    }
  }

  // ADD a new note to user notes.
  const addNote = async (Title, Description, Tag) => {
    // Backend API logic
    try {
      const response = await fetch(`${host}/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ Title, Description, Tag })
      })
      if (!response.ok) {
        throw new Error('failed to add new note');
      }
      const note = response.json();
      setNotes(Notes.concat(note));
      showAlert("success","Note added successfully");
    }
    catch (error) {
      showAlert("warning","Something went wrong");
    };    
  }

  // Delete a note with particular note id and with authenticate user
  const deleteNote = async (noteId) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/removenote/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    })
    if(response.ok){
      setNotes(Notes => Notes.filter(note => note._id !== noteId));
      showAlert("success","Note deleted successfully");
    }
    
  }

  // Update the note with particular note id and with authenticate user
  const updateNote = async (id, Title, Description, Tag) => {
    // logic to API call 
    // eslint-disable-next-line
    const response = await fetch(`${host}//updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ Title, Description, Tag })
    })

    if(response.ok){
      showAlert("success","Note updated successfully");
    }
    // Front-end Client side logic
    for (let index = 0; index < Notes.length; index++) {
      const element = Notes[index];
      if (element._id === id) {
        element.Title = Title;
        element.Description = Description;
        element.Tag = Tag;
      }
      // updatedNotes.push(element);
    }
    // setNotes(updatedNotes);
  }

  return (
    <noteContext.Provider value={{ Notes, addNote, deleteNote, updateNote, getNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;
