import React from "react";
import logo from "../../assests/notes-logo.png"

const Navbar = () =>{
    return (
        <header className="border-b-2 border-gray-200">
            <nav style={{"alignItems": "center","width": "260px"}} className="flex justify-between p-3 text-center">
                <img className="h-20"src={logo} alt="logo" />
                <p className="font-bold p-5 text-4xl text-center text-indigo-700 align-center">NoteIt</p>
            </nav>
        </header>
    )
}

export default Navbar;