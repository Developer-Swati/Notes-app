import React, { useState, useRef, useEffect } from "react";
import { useNotes } from "../../context";

const NotesCard = ({ title, text, id, isPinned, archive, bin, important }) => {
  const { nodeDispatch, theme } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editText, setEditText] = useState(text);
  const [showActions, setShowActions] = useState(false);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEditing]);

  const findArchive = (archive, id) => {
    return archive?.some((note) => note.id === id);
  };

  const isArchive = findArchive(archive, id);

  const findImportant = (important, id) => {
    return important?.some((note) => note.id === id);
  };

  const isImportant = findImportant(important, id);

  const findDeleted = (bin, id) => {
    return bin?.some((note) => note.id === id);
  };

  const isDeleted = findDeleted(bin, id);

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(title);
    setEditText(text);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() || editText.trim()) {
      nodeDispatch({
        type: "EDIT_NOTE",
        payload: { id, title: editTitle.trim(), text: editText.trim() }
      });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(title);
    setEditText(text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleDeleteClick = (id) => {
    isArchive
      ? nodeDispatch({
          type: "DELETE_FROM_ARCHIVE",
          payload: { id },
        })
      : isDeleted
      ? nodeDispatch({
          type: "DELETE_FOREVER",
          payload: { id },
        })
      : nodeDispatch({
          type: "DELETE_NOTE",
          payload: { id },
        });
  };

  const handleRestoreClick = (id) => {
    nodeDispatch({
      type: "RESTORE_NOTE",
      payload: { id },
    });
  };

  const handleIsPinned = (id) => {
    nodeDispatch({
      type: "PINNED_NOTE",
      payload: { id },
    });
  };

  const handleIsImportant = (id) => {
    !isImportant
      ? nodeDispatch({
          type: "ADD_TO_IMPORTANT",
          payload: { id },
        })
      : nodeDispatch({
          type: "REMOVE_FROM_IMPORTANT",
          payload: { id },
        });
  };

  const handleArchiveClick = (id) => {
    isArchive
      ? nodeDispatch({
          type: "REMOVE_ARCHIVE",
          payload: { id },
        })
      : nodeDispatch({
          type: "ADD_ARCHIVE",
          payload: { id },
        });
  };

  return (
    <div
      className={`note-card group cursor-pointer card-entrance relative ${isPinned ? 'ring-2 ring-indigo-200' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Visual Indicators */}
      {isPinned && !isEditing && (
        <div className="absolute -top-2 -right-2 bg-indigo-500 text-white rounded-full p-1 shadow-md">
          <span className="material-icons text-2xl">push_pin</span>
        </div>
      )}
      
      {isImportant && !isEditing && (
        <div className="absolute -top-2 -left-2 bg-yellow-500 text-white rounded-full p-1 shadow-md">
          <span className="material-icons text-2xl">star</span>
        </div>
      )}

      {/* Header Section */}
      <div className="note-card-header">
        <div className="flex items-start justify-between mb-3">
          {isEditing ? (
            <input
              ref={titleRef}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`flex-1 text-base font-semibold border rounded px-2 py-1 focus:outline-none focus:border-indigo-500 mr-2 ${
                theme === "dark" 
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                  : "bg-gray-50 border-indigo-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Note title..."
            />
          ) : (
            <h3 className={`flex-1 text-base font-semibold line-clamp-2 ${
              !title ? 'italic' : ''
            } ${
              theme === "dark" 
                ? (title ? "text-white" : "text-gray-400") 
                : (title ? "text-gray-800" : "text-gray-400")
            }`}>
              {title || 'Untitled'}
            </h3>
          )}
          
          {/* Action Buttons */}
          <div className={`flex gap-1 transition-opacity duration-200 ${showActions || isEditing ? 'opacity-100' : 'opacity-0'}`}>
            {!isEditing && (
              <>
                <button 
                  className={`btn p-1 hover:text-indigo-600 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-400"
                  }`}
                  onClick={handleEdit}
                  title="Edit note"
                >
                  <span className="material-icons-outlined text-2xl">edit</span>
                </button>
                
                {!isArchive && !isDeleted && (
                  <button 
                    className={`btn p-1 hover:text-yellow-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-400"
                    }`}
                    onClick={() => handleIsImportant(id)}
                    title={isImportant ? "Remove from important" : "Mark as important"}
                  >
                    <span className={isImportant ? "material-icons text-yellow-500" : "material-icons-outlined"}>
                      star
                    </span>
                  </button>
                )}
                
                {!isArchive && !isDeleted && !isImportant && (
                  <button 
                    className={`btn p-1 hover:text-indigo-600 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-400"
                    }`}
                    onClick={() => handleIsPinned(id)}
                    title={isPinned ? "Unpin note" : "Pin note"}
                  >
                    <span className={isPinned ? "material-icons text-indigo-600" : "material-icons-outlined"}>
                      push_pin
                    </span>
                  </button>
                )}
              </>
            )}
            
            {isEditing && (
              <>
                <button 
                  className="btn p-1 text-green-600 hover:bg-green-100" 
                  onClick={handleSaveEdit}
                  title="Save (Ctrl+Enter)"
                >
                  <span className="material-icons-outlined text-2xl">check</span>
                </button>
                <button 
                  className="btn p-1 text-red-600 hover:bg-red-100" 
                  onClick={handleCancelEdit}
                  title="Cancel (Esc)"
                >
                  <span className="material-icons-outlined text-2xl">close</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="note-card-content mb-4 flex-1">
        {isEditing ? (
          <textarea
            ref={textRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`w-full h-full border rounded p-2 focus:outline-none focus:border-indigo-500 resize-none ${
              theme === "dark" 
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                : "bg-gray-50 border-indigo-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Write your note here..."
            style={{ minHeight: '100px', maxHeight: '140px' }}
          />
        ) : (
          <div className="h-full overflow-hidden">
            <p className={`text-sm line-clamp-4 whitespace-pre-wrap h-full ${
              !text ? 'italic' : ''
            } ${
              theme === "dark" 
                ? (text ? "text-gray-300" : "text-gray-500") 
                : (text ? "text-gray-600" : "text-gray-400")
            }`}>
              {text || 'No content'}
            </p>
          </div>
        )}
      </div>

      {/* Footer Section */}
      {!isEditing && (
        <div className="note-card-footer">
          <div className={`flex justify-end gap-2 pt-3 border-t transition-opacity duration-200 ${
            showActions ? 'opacity-100' : 'opacity-60'
          } ${
            theme === "dark" ? "border-gray-700" : "border-gray-100"
          }`}>
            {!isImportant && (
              <button 
                className={`btn p-1 hover:text-red-500 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-400"
                }`}
                onClick={() => handleDeleteClick(id)}
                title={isDeleted ? "Delete forever" : "Move to bin"}
              >
                <span className={isDeleted ? "material-icons text-red-500 text-2xl" : "material-icons-outlined text-2xl"}>
                  delete
                </span>
              </button>
            )}
            
            {isDeleted && !isImportant && (
              <button 
                className={`btn p-1 hover:text-green-500 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-400"
                }`}
                onClick={() => handleRestoreClick(id)}
                title="Restore note"
              >
                <span className="material-icons text-green-600 text-2xl">restore_from_trash</span>
              </button>
            )}
            
            {!isDeleted && !isImportant && (
              <button 
                className={`btn p-1 hover:text-blue-500 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-400"
                }`}
                onClick={() => handleArchiveClick(id)}
                title={isArchive ? "Unarchive" : "Archive"}
              >
                <span className={isArchive ? "material-icons text-blue-500 text-2xl" : "material-icons-outlined text-2xl"}>
                  archive
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Edit Mode Instructions */}
      {isEditing && (
        <div className={`text-xs mt-2 text-center border-t pt-2 ${
          theme === "dark" ? "text-gray-500 border-gray-700" : "text-gray-400 border-gray-100"
        }`}>
          Ctrl+Enter to save • Esc to cancel
        </div>
      )}
    </div>
  );
};

export default NotesCard;