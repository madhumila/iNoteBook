import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";

const App = () => {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message="ok"/>
          <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
};

export default App;
