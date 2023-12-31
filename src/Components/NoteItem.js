import React, { useContext } from "react";
import NoteContext from "../Context/notes/noteContext";
const NoteItem = (props) => {
 const { note, updateNote }=props;
  console.log(updateNote);
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  

  return (
    <div className="col-md-3">
      <div className="card my-3"> 
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">
              {note.title}{" "}
              <i
                className="fa fa-trash mx-2"
                onClick={() => deleteNote(note._id)}
              ></i>{" "}
            </h5>
          </div>
          <p className="card-text">
            {note.description} <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
