import noteContext from './noteContext'
import { useState } from 'react'
import Update_modal from '../../Component/Update_modal';

const NoteState = (props) => {
  let host = "http://localhost:3000/api/notes";
  const initialNotes = []
  const [Notes, setNotes] = useState(initialNotes);

  const getNote = async () => {
    // Backend API logic
     // eslint-disable-next-line
    const response = await fetch(`${host}/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0MzFmYmUzNzk3ODM2NDdjODM5NmIzIn0sImlhdCI6MTcwMDU2NzcxMH0.UCSvFrsik6Gxrali5V7RfLEIXOUPH9SDINSLQnrfKO0"
      }
    });
    console.log(response);
    const json = await response.json();
    setNotes(json);
  }

  // ADD a new note to user notes.
  const addNote = async (Title, Description, Tag) => {
    // Backend API logic
    try {
      const response = await fetch(`${host}/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0MzFmYmUzNzk3ODM2NDdjODM5NmIzIn0sImlhdCI6MTcwMDU2NzcxMH0.UCSvFrsik6Gxrali5V7RfLEIXOUPH9SDINSLQnrfKO0"
        },
        body: JSON.stringify({ Title, Description, Tag })
      })
      if (!response.ok) {
        throw new Error('failed to add new note');
      }
      const result = response.json();
      console.log(response);
    } 
    catch (error)  {
      console.error(error);
    };

    // Front-end logic
    const note = {
      "_id": "655d62e38c668c509c1bb42a",
      "user": "65431fbe379783647c8396b34",
      "Title": Title,
      "Description": Description,
      "Tag": Tag,
      "Timestamp": "2023-11-22T02:09:39.247Z",
      "__v": 0
    };
    setNotes(Notes.concat(note));
  }

  // Delete a note with particular note id and with authenticate user
  const deleteNote = async (noteId) => {
     // eslint-disable-next-line
    const response = await fetch(`${host}/removenote/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0MzFmYmUzNzk3ODM2NDdjODM5NmIzIn0sImlhdCI6MTcwMDU2NzcxMH0.UCSvFrsik6Gxrali5V7RfLEIXOUPH9SDINSLQnrfKO0"
      },
    })

    setNotes(Notes => Notes.filter(note => note._id !== noteId));
  }

  // Update the note with particular note id and with authenticate user
  const updateNote = async (id, Title, Description, Tag) => {
    // logic to API call 
     // eslint-disable-next-line
    const response = await fetch(`${host}//updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0MzFmYmUzNzk3ODM2NDdjODM5NmIzIn0sImlhdCI6MTcwMDU2NzcxMH0.UCSvFrsik6Gxrali5V7RfLEIXOUPH9SDINSLQnrfKO0"
      },
      body: JSON.stringify({ Title, Description, Tag })
    })

    // Front-end Client side logic
    for (let index = 0; index < Notes.length; index++) {
      const element = Notes[index];
      if (element._id === id) {
          element.Title= Title;
          element.Description= Description;
          element.Tag=Tag;
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

