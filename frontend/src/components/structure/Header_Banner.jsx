import React from 'react'

const Header_Banner = ({onChangePage}) => {
  return (
    <header>
        <nav>
            <ul>
                <li><a href='#' onClick={() => {onChangePage('Accueil')}}>Accueil</a> </li>
                <li><a href='#' onClick={() => {onChangePage('Images')}}>Images</a> </li>
                <li><a href='#' onClick={() => {onChangePage('Ajouter')}}>Ajouter</a> </li>
                <li><a href='#' onClick={() => {onChangePage('Contact')}}>Contact</a> </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header_Banner;