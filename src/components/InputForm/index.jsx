import React, { useReducer, useState } from "react";
import { notesReducer } from "../../reducers";
import { v4 as uuid } from "uuid";
import "./style.css"

const InputForm = () => {
  const initialValues = {
    notes: []
  };

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [{ notes }, nodeDispatch] = useReducer(notesReducer, initialValues);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleAddClick = () => {
    nodeDispatch({
      type: "ADD_NOTE",
      payload: { title, text, id: uuid() },
    });
    setTitle("");
    setText("");
  };

  const handleDeleteClick = (id) => {
    console.log("deleted id", id)
    nodeDispatch({
      type: "DELETE_NOTE",
      payload: {  id},
    });
  };

  console.log("notes", notes);

  return (
    <>
    <div style={{position:"relative"}} className="flex flex-col w-[300px]">
      <input
        value={title}
        style={{ padding: "4px" }}
        className="border"
        placeholder="Enter title"
        onChange={(e) => handleTitle(e)}
      />
      <textarea
        value={text}
        style={{  padding: "4px" }}
        placeholder="Enter note"
        className="border"
        onChange={(e) => handleText(e)}
      />
      <button
        disabled={title.length === 0}
        className="bottom-2 right-2"
        style={{
          position: "absolute",
          borderRadius: "100%",
          cursor: "pointer",
          border: "2px solid black",
          // backgroundColor: "rgba(111, 111, 111, 0.9)"
        }}
        onClick={handleAddClick}
      >
        <span className="material-symbols-outlined">add</span>
      </button>
      </div>
      <div className="flex flex-wrap gap-6 mt-14"
      >
        {notes.length > 0 &&
          notes?.map( ({payload : {title, text, id } })  => (
            <div className="w-56 border border-neutral-800 bg-white rounded-md p-[5px]" key={id}>
              <div className="flex">
                <p
                  style={{ width: "100%", height: "80px%", padding: "4px" }}
                >
                  {title}
                </p>
                <buttton className="btn">
                  {" "}
                  <span className="material-symbols-outlined">keep</span>
                </buttton>
              </div>
              <hr />
              <div className="flex p-[5px]">
                <p style={{ width: "100%", height: "80%", padding: "4px" }}>
                  {text}
                </p>
                <buttton className="btn" onClick
                ={()=>handleDeleteClick(id)}>
                  {" "}
                  <span className="material-symbols-outlined">delete</span>
                </buttton>
                <buttton className="btn">
                  {" "}
                  <span className="material-symbols-outlined">archive</span>
                </buttton>
              </div>
            </div>
          ))}
      </div>
      </>
  );
};

export default InputForm;
