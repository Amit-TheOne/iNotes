import AddNote from './AddNote';
import NoteItem from './NoteItem';
import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from "react-router-dom"

const Notes = (props) => {
    const { notes, getNotes } = useContext(noteContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes()
        }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <div className="row my-3">
                <h3>Your Notes</h3>
                <div className="container mx-2">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} showAlert={props.showAlert} />;
                })}
            </div>
        </>
    )
}

export default Notes