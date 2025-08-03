import React, { useReducer, useState } from "react";
import NotesCard from "../NotesCard";
import { useNotes } from "../../context";

const InputForm = () => {
  const { title, text, notes, isPinned, archive, nodeDispatch, theme } = useNotes();
  const [draggedNote, setDraggedNote] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleTitle = (e) => {
    nodeDispatch({
      type: "ADD_TITLE",
      payload: e.target.value,
    });
  };

  const handleText = (e) => {
    nodeDispatch({
      type: "ADD_TEXT",
      payload: e.target.value,
    });
  };

  const handleAddClick = () => {
    if (title.trim() || text.trim()) {
      nodeDispatch({
        type: "ADD_NOTE",
      });
      nodeDispatch({
        type: "CLEAR_INPUT",
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAddClick();
    }
  };

  // Drag and Drop Functions
  const handleDragStart = (e, note, index) => {
    setDraggedNote({ note, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    setDragOverIndex(null);
    
    if (draggedNote && draggedNote.index !== dropIndex) {
      nodeDispatch({
        type: "REORDER_NOTES",
        payload: { fromIndex: draggedNote.index, toIndex: dropIndex }
      });
    }
    setDraggedNote(null);
  };

  const pinnedNotes = notes?.filter(({ isPinned }) => isPinned);
  const otherNotes = notes?.filter(({ isPinned }) => !isPinned);

  return (
    <div className="w-full px-4 lg:px-6 py-4">
      {/* Input Form */}
      <div className="input-form-container mt-6 lg:mt-10">
        <div className={`relative backdrop-blur-sm border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
          theme === "dark" 
            ? "bg-gray-800/95 border-gray-700" 
            : "bg-white/90 border-neutral-300"
        }`}>
          <input
            value={title}
            className={`w-full p-4 border-b focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-t-lg responsive-text bg-transparent ${
              theme === "dark" 
                ? "border-gray-700 text-white placeholder-gray-400" 
                : "border-neutral-200 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Enter title..."
            onChange={handleTitle}
            onKeyUp={handleKeyPress}
          />
          <textarea
            value={text}
            className={`w-full p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-b-lg resize-none responsive-text bg-transparent min-h-[80px] ${
              theme === "dark" 
                ? "text-white placeholder-gray-400" 
                : "text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Take a note..."
            onChange={handleText}
            onKeyUp={handleKeyPress}
            rows="3"
          />
          <button
            disabled={title?.length === 0 && text?.length === 0}
            className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            onClick={handleAddClick}
            title="Add Note (Ctrl+Enter)"
          >
            <span className="material-icons-outlined text-lg">add</span>
          </button>
        </div>
        
        {/* Quick Stats */}
        <div className={`mt-4 text-center text-sm ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}>
          <span>Total: {notes.length}</span>
          <span className="mx-2">•</span>
          <span>Pinned: {pinnedNotes.length}</span>
          <span className="mx-2">•</span>
          <span>Ctrl+Enter to add</span>
        </div>
      </div>

      {/* Pinned Notes Section */}
      {pinnedNotes.length > 0 && (
        <div className="mt-8 lg:mt-12">
          <h3 className={`responsive-title font-semibold mb-4 flex items-center gap-2 ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}>
            <span className="material-icons-outlined text-indigo-600">push_pin</span>
            Pinned Notes
          </h3>
          <div className="notes-grid-mobile">
            {pinnedNotes.map((note, index) => (
              <div
                key={note.id}
                draggable
                onDragStart={(e) => handleDragStart(e, note, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                className={`transition-all duration-200 ${
                  dragOverIndex === index ? 'scale-105 shadow-lg' : ''
                } ${draggedNote?.note.id === note.id ? 'opacity-50' : ''}`}
              >
                <NotesCard
                  title={note.title}
                  text={note.text}
                  id={note.id}
                  isPinned={note.isPinned}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Notes Section */}
      <div className="mt-8 lg:mt-12">
        {otherNotes.length > 0 && pinnedNotes.length > 0 && (
          <h3 className={`responsive-title font-semibold mb-4 flex items-center gap-2 ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}>
            <span className="material-icons-outlined text-gray-600">note</span>
            Other Notes
          </h3>
        )}
        
        {otherNotes.length > 0 ? (
          <div className="notes-grid-mobile">
            {otherNotes.map((note, index) => {
              const actualIndex = pinnedNotes.length + index;
              return (
                <div
                  key={note.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, note, actualIndex)}
                  onDragOver={(e) => handleDragOver(e, actualIndex)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, actualIndex)}
                  className={`transition-all duration-200 ${
                    dragOverIndex === actualIndex ? 'scale-105 shadow-lg' : ''
                  } ${draggedNote?.note.id === note.id ? 'opacity-50' : ''}`}
                >
                  <NotesCard
                    title={note.title}
                    text={note.text}
                    id={note.id}
                    isPinned={note.isPinned}
                  />
                </div>
              );
            })}
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <span className={`material-icons-outlined text-6xl mb-4 block ${
              theme === "dark" ? "text-gray-600" : "text-gray-300"
            }`}>note_add</span>
            <h3 className={`text-xl mb-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>No notes yet</h3>
            <p className={`${
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`}>Create your first note above!</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InputForm;