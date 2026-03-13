import React, { useState, useEffect } from 'react'
import Header_Banner from './components/structure/Header_Banner';
import Promo_Banner from './components/structure/Promo_Banner';
import Section_Banner from './components/structure/Section_Banner';
import Footer_Banner from './components/structure/Footer_Banner';
import Aside_Banner from './components/structure/Aside_Banner';

const App = () => {

  // Initialisation : on lit la valeur depuis localStorage si elle existe
  const [page, setPage] = useState(() => {
    return localStorage.getItem("page") || "Accueil";
  });

  // À chaque changement de page, on sauvegarde dans localStorage
  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  return (
    <div>
    <Header_Banner onChangePage={setPage} />
    <Promo_Banner />
    <div className='mapage'>
    <Section_Banner changePage={page} />
    <Aside_Banner />
    </div>
    <Footer_Banner />
    </div>
  )
}

export default App;
