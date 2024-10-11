import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
//import ToggleTheme from "./hooksExercise";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, themes } from "./ThemeContext";

function App() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  useEffect(() => {
    document.body.style.background = currentTheme.background;
    document.body.style.color = currentTheme.foreground;
  }, [currentTheme]);

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
        <form className="note-form">
          <div>
            <input
              placeholder="Note Title"
              style={{
                background: currentTheme.background,
                color: currentTheme.foreground,
                borderColor: currentTheme.foreground,
              }}
            ></input>
          </div>

          <div>
            <textarea
              style={{
                background: currentTheme.background,
                color: currentTheme.foreground,
                borderColor: currentTheme.foreground,
              }}
            ></textarea>
          </div>

          <div>
            <button type="submit">Create Note</button>
          </div>
        </form>
        <div className="notes-grid">
          {dummyNotesList.map((note) => (
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
                  style={{
                    background: currentTheme.background,
                    color: currentTheme.foreground,
                  }}
                >
                  x
                </button>
              </div>
              <h2> {note.title} </h2>
              <p> {note.content} </p>
              <p> {note.label} </p>
            </div>
          ))}
        </div>
        \{" "}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
