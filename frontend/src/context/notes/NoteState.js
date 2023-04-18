import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const initialNotes = [
        {
          "_id": "63820df8a67d25183ebdbfcb",
          "user": "637e6e29f5fd8b9e80d11cb7",
          "title": "TODO",
          "description": "My TODO List",
          "tag": "personal",
          "timestamp": "2022-11-26T13:00:40.479Z",
          "__v": 0
        },
        {
          "_id": "63820df8a67d25183ebdbfcb",
          "user": "637e6e29f5fd8b9e80d11cb7",
          "title": "TODO",
          "description": "My TODO List",
          "tag": "personal",
          "timestamp": "2022-11-26T13:00:40.479Z",
          "__v": 0
        },
        {
          "_id": "63820df8a67d25183ebdbfcb",
          "user": "637e6e29f5fd8b9e80d11cb7",
          "title": "TODO",
          "description": "My TODO List",
          "tag": "personal",
          "timestamp": "2022-11-26T13:00:40.479Z",
          "__v": 0
        },
        {
          "_id": "63820df8a67d25183ebdbfcb",
          "user": "637e6e29f5fd8b9e80d11cb7",
          "title": "TODO",
          "description": "My TODO List",
          "tag": "personal",
          "timestamp": "2022-11-26T13:00:40.479Z",
          "__v": 0
        },
        {
          "_id": "63820df8a67d25183ebdbfcb",
          "user": "637e6e29f5fd8b9e80d11cb7",
          "title": "TODO",
          "description": "My TODO List",
          "tag": "personal",
          "timestamp": "2022-11-26T13:00:40.479Z",
          "__v": 0
        },
        {
          "_id": "63820df8a67d25183ebdbfcb",
          "user": "637e6e29f5fd8b9e80d11cb7",
          "title": "TODO",
          "description": "My TODO List",
          "tag": "personal",
          "timestamp": "2022-11-26T13:00:40.479Z",
          "__v": 0
        },
        {
          "_id": "63820df8a67d25183ebdbfcb",
          "user": "637e6e29f5fd8b9e80d11cb7",
          "title": "TODO",
          "description": "My TODO List",
          "tag": "personal",
          "timestamp": "2022-11-26T13:00:40.479Z",
          "__v": 0
        },
      ]

      const [notes, setNotes] = useState(initialNotes);

    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;