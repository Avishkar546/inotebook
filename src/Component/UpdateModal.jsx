import { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import noteContext from "../Context/notes/noteContext"

const UpdateModal = ({ currentNote }) => {
    const { updateNote } = useContext(noteContext);
    const [editedNote, setEditedNote] = useState({ // State to maintain any updates in notes
        id: currentNote._id,
        etitle: currentNote.Title,
        edescription: currentNote.Description,
        etag: currentNote.Tag
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedNote({
            ...editedNote,
            [name]: value,
        });
    };

    const handleUpdate = (id, title, description, tag) => {
        updateNote(id, title, description, tag);
        handleClose();
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="btn btn-primary btn-sm" onClick={handleShow}>Update</button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <h1 className='text-center'>Add Your Notes</h1>
                        <form action="" method='post'>
                            <div className="input-group mb-3">
                                <span htmlFor="Title" className="input-group-text" id="basic-addon1">Title</span>
                                <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" id='Title' name='etitle' onChange={handleInputChange} />
                            </div>
                            <div className="input-group mb-3">
                                <span htmlFor="Description" className="input-group-text">Description</span>
                                <textarea className="form-control" aria-label="With textarea" id='Description' name='edescription' onChange={handleInputChange}></textarea>
                            </div>
                            <div className="input-group mb-3">
                                <span htmlFor="Title" className="input-group-text" id="basic-addon1">Tag</span>
                                <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" id='Tag' name='etag' onChange={handleInputChange} />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdate(editedNote.id,editedNote.etitle,editedNote.edescription,editedNote.etag)}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateModal
