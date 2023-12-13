import React, { useState, useContext } from 'react'
import noteContext from "../Context/notes/noteContext"

const AddNote = () => {
    const { addNote } = useContext(noteContext); //Using context from noteconext 
    const [note, setNote] = useState({ Title: "", Description: "", Tag: "General" }); //State to add the new note

    const onClick = (e) => {
        e.preventDefault();
        addNote(note.Title, note.Description, note.Tag);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className='container'>
            <h1 className='text-center'>Add Your Notes</h1>
            <form action="" method='post'>
                <div className="input-group mb-3">
                    <span htmlFor="Title" className="input-group-text" id="basic-addon1">Title</span>
                    <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" id='Title' name='Title' onChange={onChange} />
                </div>
                <div className="input-group mb-3">
                    <span htmlFor="Title" className="input-group-text" id="basic-addon1">Tag</span>
                    <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" id='Title' name='Title' onChange={onChange} />
                </div>
                <div className="input-group mb-3">
                    <span htmlFor="Description" className="input-group-text">Description</span>
                    <textarea className="form-control" aria-label="With textarea" id='Description' name='Description' onChange={onChange}></textarea>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary mb-3" onClick={onClick}>ADD</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote
