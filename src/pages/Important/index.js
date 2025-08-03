import React from "react";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import { Fragment } from "react";
import NotesCard from "../../components/NotesCard";
import { useNotes } from "../../context";

const Important = () => {
  const { important, theme } = useNotes();

  return (
    <Fragment>
      <Navbar />
      <main className="flex">
        <SideBar />
        <div className="flex-1 p-4 lg:p-6 main-content">
          <div className="max-w-7xl mx-auto">
            {important?.length > 0 ? (
              <>
                <div className="mb-6">
                  <h2 className={`responsive-title font-bold mb-2 flex items-center gap-3 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>
                    <span className="material-icons text-yellow-500 text-3xl">star</span>
                    Important Notes
                  </h2>
                  <p className={`responsive-text ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}>
                    Your starred and high-priority notes ({important.length} {important.length === 1 ? 'note' : 'notes'})
                  </p>
                </div>
                
                <div className="notes-grid-mobile">
                  {important.map(({ title, text, id, isPinned }) => (
                    <NotesCard
                      key={id}
                      title={title}
                      text={text}
                      id={id}
                      isPinned={isPinned}
                      important={important}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <span className={`material-icons-outlined text-8xl mb-4 block ${
                  theme === "dark" ? "text-gray-600" : "text-gray-300"
                }`}>star_border</span>
                <h2 className={`text-2xl font-semibold mb-2 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}>
                  No Important Notes Yet
                </h2>
              </div>
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Important;