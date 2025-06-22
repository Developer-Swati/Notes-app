import React from "react";
import { NavLink } from "react-router";

const SideBar = () => {

  const getStyles = ({isActive}) => {
    const base = 'flex items-center px-2 py-1 gap-2'
    const active = 'bg-indigo-800 rounded-tr-full rounded-br-full text-white'
    const inactive = 'hover:bg-indigo-800 rounded-tr-full rounded-br-full hover:text-white'
    return isActive ? `${base} ${active}`:`${base} ${inactive}`
  }

  return (
    <aside className="flex h-screen gap-3 flex-col p-4 border-r-2 w-[210px] ">
      <NavLink className={getStyles} to="/">
        <span className="material-symbols-outlined">home</span>
        <span> Home</span>
      </NavLink>
      <NavLink className={getStyles} to="/archive">
        <span className="material-symbols-outlined">archive</span>{" "}
        <span>Archive</span>
      </NavLink>
      <NavLink className={getStyles} to="/important">
        <span className="material-symbols-outlined">label_important</span>
        <span>Important</span>
      </NavLink>
      <NavLink className={getStyles} to="/bin">
        <span className="material-symbols-outlined">delete</span>
        <span>Bin</span>
      </NavLink>
    </aside>
  );
};

export default SideBar;
