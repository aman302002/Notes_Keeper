import React,{useState,useEffect} from 'react';
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {    // atleast one time this function run , and after that it depend on dependency array 
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/notes"
        );
        const notes = await response.json();
        setNotes(notes);  
      } 
      catch (e) {
        console.log(e);
      }
    };

    fetchNotes();
  }, [notes]);  // dependency array , if any element in this changes this function runs 


  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }
  
  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== id;
      });
    });
  }
  
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
