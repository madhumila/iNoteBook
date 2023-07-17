import React, { useContext } from "react";
import NoteContext from "../Context/notes/noteContext";
const NoteItem = ({ note }) => {
  console.log(note);
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const handleDelete = (id) => {
    deleteNote(note._id);
  };
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">
              {note.title}{" "}
              <i
                className="fa fa-trash mx-2"
                onClick={() => handleDelete(note._id)}
              ></i>{" "}
            </h5>
          </div>
          <p className="card-text">
            {note.description} <i className="far fa-edit mx-2"></i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
