import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import VotePage from "./pages/VotePage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePage />}></Route>
        <Route path="/vote/:id" element={<VotePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
