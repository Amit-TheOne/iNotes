import React, { useContext, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext'

export const UpdateNote = ({ note, showAlert }) => {
  const { editNote } = useContext(noteContext);
  const [updateNote, setUpdateNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  const refClose = useRef(null)

  const handleUpdate = () => {
    console.log("Updating the note..!", note)
    editNote(updateNote.id, updateNote.etitle, updateNote.edescription, updateNote.etag)
    refClose.current.click();
    showAlert("Updated Successfully", "success")
  }

  const onChange = (e) => {
    setUpdateNote({ ...updateNote, [e.target.name]: e.target.value })
  }

  const openUpdateModal = () => {
    setUpdateNote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag });
  };

  return (
    <>
      <i type="button" className="fa-solid fa-pen-to-square mx-1" onClick={openUpdateModal} data-bs-toggle="modal" data-bs-target={`#exampleModal-${note._id}`} />

      {/* // Modal */}
      <div className="modal fade" id={`exampleModal-${note._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose} />
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={updateNote.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={updateNote.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={updateNote.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={updateNote.etitle.length < 5 || updateNote.edescription.length < 5} onClick={handleUpdate} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
