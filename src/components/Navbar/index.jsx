import React, { useState, useEffect } from "react";
import logo from "../../assests/notes-logo.png";
import { useNotes } from "../../context";

const Navbar = () => {
  const { theme, nodeDispatch, notes, archive, important } = useNotes();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleThemeToggle = () => {
    console.log("theme -> ", theme);
    nodeDispatch({ type: "THEME_TOGGLE" }); // Fixed typo here
  };

  // Theme is now handled in the context provider

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const allNotes = [...notes, ...archive, ...important];
      const results = allNotes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, notes, archive, important]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  return (
    <>
      <header className={`backdrop-blur-sm border-b-2 shadow-sm sticky top-0 z-30 ${
        theme === "dark" 
          ? "bg-gray-800/95 border-gray-700" 
          : "bg-white/90 border-gray-200"
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-3 lg:gap-4">
              <img 
                className="h-10 w-10 lg:h-12 lg:w-12 object-contain" 
                src={logo} 
                alt="NoteIt Logo" 
              />
              <div>
                <h1 className={`font-bold text-xl lg:text-2xl xl:text-3xl ${
                  theme === "dark" ? "text-indigo-400" : "text-indigo-700"
                }`}>
                  NoteIt
                </h1>
                <p className={`text-xs hidden sm:block ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}>
                  Your digital notebook
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search Button */}
              <button 
                onClick={handleSearchToggle}
                className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  theme === "dark" 
                    ? "text-gray-400 hover:text-indigo-400 hover:bg-gray-700" 
                    : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <span className="material-icons-outlined text-lg">search</span>
                <span className="hidden lg:inline text-sm">Search</span>
              </button>

              {/* Theme Toggle */}
              <button 
                onClick={handleThemeToggle} 
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  theme === "dark" 
                    ? "text-gray-400 hover:text-indigo-400 hover:bg-gray-700" 
                    : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <span className="material-icons-outlined text-lg">
                  {theme === "dark" ? "dark_mode" : "light_mode"}
                </span>
              </button>

              {/* Settings */}

            </div>
          </div>
        </nav>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <div className="fixed inset-0 bg-black/50" onClick={handleSearchToggle}></div>
          <div className={`relative w-full max-w-2xl mx-4 rounded-lg shadow-lg ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}>
            <div className="p-4">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
                  theme === "dark" 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-400" 
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500"
                }`}
                autoFocus
              />
            </div>
            
            {searchResults.length > 0 && (
              <div className="max-h-96 overflow-y-auto border-t border-gray-300 dark:border-gray-600">
                {searchResults.map((note) => (
                  <div 
                    key={note.id} 
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      theme === "dark" ? "border-gray-600" : "border-gray-200"
                    }`}
                  >
                    <h4 className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {note.title}
                    </h4>
                    <p className={`text-sm mt-1 line-clamp-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {note.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            {searchQuery && searchResults.length === 0 && (
              <div className={`p-8 text-center ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}>
                No notes found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;