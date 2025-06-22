export const notesReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes : [...state.notes, {payload}]
      };
    case "DELETE_NOTE":
      return {
        notes : state.notes.filter((note) => note.payload.id !== payload.id)
      };      
    default:
      return state;
  }
};
