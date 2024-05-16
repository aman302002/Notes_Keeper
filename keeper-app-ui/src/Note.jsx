import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  
  async function handleClick () {
    
    try {
      await fetch(
        `http://localhost:4000/api/notes/${props.id}`,
        {
          method: "DELETE",
        }
      );
      
      props.onDelete(props.id);

    }
     catch (e) {
      console.log(e);
    }
    
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
