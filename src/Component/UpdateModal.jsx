import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const UpdateModal = ({ id, title, description, tag, handleUpdate }) => {
    const [editedNote, setEditedNote] = useState({ // State to maintain any updates in notes
        id: id,
        etitle: title,
        edescription: description,
        etag: tag
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedNote({
            ...editedNote,
            [name]: value,
        });
    };

    const onUpdate = () => { //Function to handle onClick on Save Changes button
        handleUpdate(editedNote);
        handleClose();
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false); //Function to handle onClick on close button
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
                        <form id='editModal' action="" method='PUT'>
                            <div className="input-group mb-3">
                                <span htmlFor="Title" className="input-group-text" id="basic-addon1">Title</span>
                                <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" id='Title' name='etitle' value={editedNote.etitle} onChange={handleInputChange} />
                            </div>
                            <div className="input-group mb-3">
                                <span htmlFor="Description" className="input-group-text">Description</span>
                                <textarea className="form-control" aria-label="With textarea" id='Description' name='edescription' value={editedNote.edescription} onChange={handleInputChange}></textarea>
                            </div>
                            <div className="input-group mb-3">
                                <span htmlFor="Title" className="input-group-text" id="basic-addon1">Tag</span>
                                <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" id='Tag' name='etag' value={editedNote.etag} onChange={handleInputChange} />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={onUpdate}>Save Changes</Button> {/*disabled={editedNote.etitle.length<5 || editedNote.edescription.length<5}   */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateModal
