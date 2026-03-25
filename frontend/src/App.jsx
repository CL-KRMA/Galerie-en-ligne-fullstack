// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Accueil from "./components/Accueil";
import ImageList from "./components/ImageList";
import Ajouter from "./components/Ajouter"
import Contact from "./components/Contact";
import Footer from "./components/Footer"

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="nav-center">
          <Link to="/">Accueil</Link>
          <Link to="/ImageList">ImageList</Link>
          <Link to="/Ajouter">Ajouter</Link>
          <Link to="/Contact">Contact</Link>
        </div>
        <div className="nav-right">
          <Link to="/signup">Inscription</Link>
          <Link to="/login">Connexion</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/ImageList" element={<ImageList />} />
        <Route path="/Ajouter" element={<Ajouter />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
