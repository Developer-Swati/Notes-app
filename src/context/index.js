import { createContext, useContext, useReducer, useEffect } from "react";
import { notesReducer } from "../reducers/index";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  // Get saved theme from localStorage or default to light
  const getInitialTheme = () => {
    try {
      const savedTheme = localStorage.getItem('noteIt-theme');
      return savedTheme || 'light';
    } catch (error) {
      return 'light';
    }
  };

  const initialValues = {
    notes: [],
    title: "",
    text: "",
    isPinned: false,
    archive: [],
    bin: [],
    important: [],
    theme: getInitialTheme()
  };

  const [
    { notes, title, text, isPinned, archive, bin, important, theme },
    nodeDispatch,
  ] = useReducer(notesReducer, initialValues);

  // Apply theme to document and save to localStorage whenever theme changes
  useEffect(() => {
    try {
      document.body.className = theme === "light" ? "light-theme" : "dark-theme";
      localStorage.setItem('noteIt-theme', theme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [theme]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        title,
        text,
        isPinned,
        archive,
        bin,
        important,
        nodeDispatch,
        theme
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);
export { useNotes, NotesProvider };