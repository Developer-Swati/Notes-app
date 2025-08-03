import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import { Fragment } from "react";
import NotesCard from "../../components/NotesCard";
import { useNotes } from "../../context";

const Bin = () => {
  const { bin, theme } = useNotes();
  console.log("bin in bin page", bin);

  return (
    <Fragment>
      <Navbar />
      <main className="flex min-h-screen">
        <SideBar />
        <div className="flex-1 p-4 lg:p-6 main-content overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {bin?.length > 0 ? (
              <>
                <div className="mb-6">
                  <h2 className={`responsive-title font-bold mb-2 flex items-center gap-3 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>
                    <span className="material-icons text-red-500 text-3xl">delete</span>
                    Deleted Notes
                  </h2>
                  <p className={`responsive-text ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}>
                    Recently deleted notes ({bin.length} {bin.length === 1 ? 'note' : 'notes'})
                  </p>
                </div>
                
                <div className="notes-grid-mobile">
                  {bin.map(({ title, text, id, isPinned }) => (
                    <NotesCard
                      key={id}
                      title={title}
                      text={text}
                      id={id}
                      isPinned={isPinned}
                      bin={bin}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <span className={`material-icons-outlined text-8xl mb-4 block ${
                  theme === "dark" ? "text-gray-600" : "text-gray-300"
                }`}>delete</span>
                <h2 className={`text-2xl font-semibold mb-2 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}>
                  Bin is Empty
                </h2>
              </div>
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Bin;