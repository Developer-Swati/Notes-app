import { v4 as uuid } from "uuid";

export const notesReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TITLE":
      return {
        ...state,
        title: payload,
      };

    case "ADD_TEXT":
      return {
        ...state,
        text: payload,
      };

    case "ADD_NOTE":
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: uuid(),
            text: state.text,
            title: state.title,
            isPinned: state.isPinned,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      };

    case "CLEAR_INPUT":
      return {
        ...state,
        text: "",
        title: "",
      };

    case "THEME_TOGGLE":
      return {
        ...state,
        theme : state.theme === "light" ? "dark" : "light"
      }

    case "EDIT_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === payload.id
            ? {
                ...note,
                title: payload.title,
                text: payload.text,
                updatedAt: new Date().toISOString(),
              }
            : note
        ),
        // Also update in archive if it exists there
        archive: state.archive.map((note) =>
          note.id === payload.id
            ? {
                ...note,
                title: payload.title,
                text: payload.text,
                updatedAt: new Date().toISOString(),
              }
            : note
        ),
        // Also update in important if it exists there
        important: state.important.map((note) =>
          note.id === payload.id
            ? {
                ...note,
                title: payload.title,
                text: payload.text,
                updatedAt: new Date().toISOString(),
              }
            : note
        ),
        // Also update in bin if it exists there
        bin: state.bin.map((note) =>
          note.id === payload.id
            ? {
                ...note,
                title: payload.title,
                text: payload.text,
                updatedAt: new Date().toISOString(),
              }
            : note
        ),
      };

    case "REORDER_NOTES":
      const { fromIndex, toIndex } = payload;
      const newNotes = [...state.notes];
      const [movedNote] = newNotes.splice(fromIndex, 1);
      newNotes.splice(toIndex, 0, movedNote);
      return {
        ...state,
        notes: newNotes,
      };

    case "PINNED_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === payload.id
            ? {
                ...note,
                isPinned: !note.isPinned,
                updatedAt: new Date().toISOString(),
              }
            : note
        ),
      };

    case "ADD_TO_IMPORTANT":
      const noteToAddToImportant =
        state.notes.find((note) => note.id === payload.id) ||
        state.archive.find((note) => note.id === payload.id);
      return {
        ...state,
        important: noteToAddToImportant
          ? [
              ...state.important,
              { ...noteToAddToImportant, updatedAt: new Date().toISOString() },
            ]
          : state.important,
      };

    case "REMOVE_FROM_IMPORTANT":
      return {
        ...state,
        important: state.important.filter((note) => note.id !== payload.id),
      };

    case "ADD_ARCHIVE":
      const noteToArchive = state.notes.find((note) => note.id === payload.id);
      return {
        ...state,
        archive: noteToArchive
          ? [
              ...state.archive,
              { ...noteToArchive, updatedAt: new Date().toISOString() },
            ]
          : state.archive,
        notes: state.notes.filter((note) => note.id !== payload.id),
      };

    case "REMOVE_ARCHIVE":
      const noteToUnarchive = state.archive.find(
        (note) => note.id === payload.id
      );
      return {
        ...state,
        notes: noteToUnarchive
          ? [
              ...state.notes,
              { ...noteToUnarchive, updatedAt: new Date().toISOString() },
            ]
          : state.notes,
        archive: state.archive.filter((note) => note.id !== payload.id),
      };

    case "DELETE_NOTE":
      const noteToDelete = state.notes.find((note) => note.id === payload.id);
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== payload.id),
        bin: noteToDelete
          ? [
              ...state.bin,
              { ...noteToDelete, deletedAt: new Date().toISOString() },
            ]
          : state.bin,
      };

    case "RESTORE_NOTE":
      const noteToRestore = state.bin.find((note) => note.id === payload.id);
      return {
        ...state,
        notes: noteToRestore
          ? [
              ...state.notes,
              { ...noteToRestore, updatedAt: new Date().toISOString() },
            ]
          : state.notes,
        bin: state.bin.filter((note) => note.id !== payload.id),
      };

    case "DELETE_FOREVER":
      return {
        ...state,
        bin: state.bin.filter((note) => note.id !== payload.id),
        // Also remove from important if it exists there
        important: state.important.filter((note) => note.id !== payload.id),
      };

    case "DELETE_FROM_ARCHIVE":
      const archivedNoteToDelete = state.archive.find(
        (note) => note.id === payload.id
      );
      return {
        ...state,
        bin: archivedNoteToDelete
          ? [
              ...state.bin,
              { ...archivedNoteToDelete, deletedAt: new Date().toISOString() },
            ]
          : state.bin,
        archive: state.archive.filter((note) => note.id !== payload.id),
      };

    default:
      return state;
  }
};
