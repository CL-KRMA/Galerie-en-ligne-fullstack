import React from 'react'
import Ajouter from '../pages/ajouter';
import ImageList from '../pages/ImageList';
import Accueil from '../pages/Accueil';
import Contact from '../pages/Contact';

export const Section_Banner = ({changePage}) => {
  return (
    <section>
        {changePage === 'Accueil' && (<Accueil />)}
        {changePage === 'Images' && (<ImageList />)}
        {changePage === 'Ajouter' && (<Ajouter />)}
        {changePage === 'Contact' && (<Contact />)}
    </section>
  )
}

export default Section_Banner;