import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { UpdateNote } from "./UpdateNote";

const NoteItem = ({ note, showAlert }) => {
    const { deleteNote } = useContext(noteContext);

    const handleDelete = () => {
        deleteNote(note._id);
        showAlert(
            "Deleted Successfully",
            "success"
        );
    }

    return (
        <div className="col-md-4 my-2">
            <div className="card rounded">
                <div className="bg-secondary text-black rounded-top">
                    <div className="d-flex mx-3 mt-2">
                        <h5 className="card-title text-break">{note.title}</h5>
                        <div className="ps-2 ms-auto flex-shrink-0">
                            <i
                                type="button"
                                className="fa-solid fa-trash mx-1"
                                onClick={handleDelete}
                            />
                            <UpdateNote note={note} showAlert={showAlert} />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
