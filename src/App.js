import './App.css';
import Archive from './pages/Archive';
import Home from './pages/Home';
import Bin from './pages/Bin';
import Important from './pages/Important';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/bin" element={<Bin />} />
      <Route path="/important" element={<Important />} />
      </Routes>
     
    </>
  );
}

export default App;
