import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useNotes } from "../../context";

const SideBar = () => {
  const { theme } = useNotes();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getStyles = ({isActive}) => {
    const base = 'flex items-center px-4 py-3 gap-3 transition-all duration-200 responsive-text'
    const active = theme === "dark" 
      ? 'bg-indigo-600 rounded-tr-full rounded-br-full text-white shadow-md'
      : 'bg-indigo-600 rounded-tr-full rounded-br-full text-white shadow-md'
    const inactive = theme === "dark"
      ? 'hover:bg-gray-700 rounded-tr-full rounded-br-full hover:text-indigo-400 text-gray-300'
      : 'hover:bg-indigo-100 rounded-tr-full rounded-br-full hover:text-indigo-700 text-gray-700'
    return isActive ? `${base} ${active}`:`${base} ${inactive}`
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileSidebar}
        >
          <span className="material-icons-outlined">
            {isMobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isMobile ? 'sidebar-mobile' : 'sidebar-container'} 
        ${isMobile && !isMobileOpen ? 'closed' : ''} 
        flex-col p-4 border-r-2 backdrop-blur-sm
        w-64 lg:w-56 xl:w-64
        ${theme === "dark" 
          ? "bg-gray-800/95 border-gray-700" 
          : "bg-white/90 border-gray-200"
        }
      `}>
        <div className="flex flex-col gap-2">
          <NavLink 
            className={getStyles} 
            to="/"
            onClick={isMobile ? closeMobileSidebar : undefined}
          >
            <span className="material-icons-outlined text-xl">home</span>
            <span className="font-medium">Home</span>
          </NavLink>
          
          <NavLink 
            className={getStyles} 
            to="/archive"
            onClick={isMobile ? closeMobileSidebar : undefined}
          >
            <span className="material-icons-outlined text-xl">archive</span>
            <span className="font-medium">Archive</span>
          </NavLink>
          
          <NavLink 
            className={getStyles} 
            to="/important"
            onClick={isMobile ? closeMobileSidebar : undefined}
          >
            <span className="material-icons-outlined text-xl">star</span>
            <span className="font-medium">Important</span>
          </NavLink>
          
          <NavLink 
            className={getStyles} 
            to="/bin"
            onClick={isMobile ? closeMobileSidebar : undefined}
          >
            <span className="material-icons-outlined text-xl">delete</span>
            <span className="font-medium">Bin</span>
          </NavLink>
        </div>
        
        {/* Stats Section */}
        {/* <div className={`mt-8 p-3 rounded-lg ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-50"
        }`}>
          <h4 className={`text-sm font-semibold mb-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>Quick Stats</h4>
          <div className={`text-xs space-y-1 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            <div>Total Notes: 0</div>
            <div>Important: 0</div>
            <div>Archived: 0</div>
          </div>
        </div> */}
      </aside>
    </>
  );
};

export default SideBar;