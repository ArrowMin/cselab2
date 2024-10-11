import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
//import ToggleTheme from "./hooksExercise";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, themes } from "./ThemeContext";
import { createToken } from "typescript";

function App() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  //Let body tag get be able to get toggled as well.
  useEffect(() => {
    document.body.style.background = currentTheme.background;
    document.body.style.color = currentTheme.foreground;
  }, [currentTheme]);

  const [likedNotes, setLikedNotes] = useState<Note[]>([]);

  const toggleLikedNote = (note: Note) => {
    if (likedNotes.includes(note)) {
      setLikedNotes(likedNotes.filter((likedNote) => likedNote !== note));
    } else {
      setLikedNotes([...likedNotes, note]);
    }
  };

  const [notes, setNotes] = useState(dummyNotesList);

  useEffect(() => {
    const likedNoteTitles = likedNotes.map((likedNote) => likedNote.title);
    console.log("Liked notes titles:", likedNoteTitles);
  }, [likedNotes]);

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <button
        style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }}
        onClick={toggleTheme}
      >
        {" "}
        Toggle Theme{" "}
      </button>

      <div
        style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }}
        className="app-container"
      >
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              style={{
                background: currentTheme.background,
                color: currentTheme.foreground,
                borderColor: currentTheme.foreground,
              }}
              value={createNote.title}
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              required
            ></input>
          </div>

          <div>
            <textarea
              style={{
                background: currentTheme.background,
                color: currentTheme.foreground,
                borderColor: currentTheme.foreground,
              }}
              value={createNote.content}
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })
              }
              required
            ></textarea>
          </div>

          <div>
            <select
              style={{
                background: currentTheme.background,
                color: currentTheme.foreground,
                borderColor: currentTheme.foreground,
              }}
              value={createNote.label}
              onChange={(event) =>
                setCreateNote({
                  ...createNote,
                  label: event.target.value as Label,
                })
              }
              required
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div>
            <button type="submit">Create Note</button>
          </div>
        </form>
        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              style={{
                background: currentTheme.background,
                color: currentTheme.foreground,
              }}
              className="note-item"
            >
              <div className="notes-header">
                <button
                  onClick={() => setSelectedNote(note)}
                  style={{
                    background: currentTheme.background,
                    color: currentTheme.foreground,
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleLikedNote(note)}
                  style={{
                    background: currentTheme.background,
                    color: currentTheme.foreground,
                  }}
                >
                  {likedNotes.includes(note) ? "❤️" : "♡"}
                </button>
                <button
                  style={{
                    background: currentTheme.background,
                    color: currentTheme.foreground,
                  }}
                  onClick={() => setNotes(notes.filter((n) => n !== note))}
                >
                  x
                </button>
              </div>

              <h2 contentEditable={note === selectedNote}>{note.title}</h2>
              <p contentEditable={note === selectedNote}>{note.content}</p>
              <p contentEditable={note === selectedNote}>{note.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>List of favorites:</h2>
        <ul>
          {likedNotes.map((note) => (
            <li>{note.title}</li>
          ))}
        </ul>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
