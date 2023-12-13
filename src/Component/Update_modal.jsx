import React, { useState } from 'react'

const Update_modal = ({ showModal, changeModal }) => {
    return (
        alert(
        <div className='container'>
            <h1 className='text-center'>Update Your Notes</h1>
            <form action="" method='post'>
                <div className="input-group mb-3">
                    <span htmlFor="Title" className="input-group-text" id="basic-addon1">Title</span>
                    <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" id='Title' name='Title' />
                </div>
                <div className="input-group mb-3">
                    <span htmlFor="Title" className="input-group-text" id="basic-addon1">Tag</span>
                    <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" id='Title' name='Title' />
                </div>
                <div className="input-group mb-3">
                    <span htmlFor="Description" className="input-group-text">Description</span>
                    <textarea className="form-control" aria-label="With textarea" id='Description' name='Description' ></textarea>
                </div>
                <div className="buttonsclass">
                    <button className='btn btn-success' onClick={changeModal}>Edit</button>
                    <button className='btn btn-danger' onClick={changeModal}>Cancel</button>
                </div>
            </form>
        </div>
        )
    )
};

export default Update_modal
