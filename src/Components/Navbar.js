//Cria o componente Navbar que é um menu de navegação para o site. Ele é composto por um título e dois links, um para a página inicial e outro para a página sobre.

import styles from './Navbar.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <NavLink to="/">
                Mini <span>Blog</span>
            </NavLink>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
        </nav>
    );
};
// Exporta o componente Navbar.

export default Navbar;