import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FileDetailsPage from "./pages/FileDetailsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/file/:fileId" element={<FileDetailsPage />} />
    </Routes>
  );
};

export default App;