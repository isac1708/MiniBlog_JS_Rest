//Cria o componente Navbar que é um menu de navegação para o site. Ele é composto por um título e dois links, um para a página inicial e outro para a página sobre.

import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>
                Mini <span>Blog</span>
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? styles.active : undefined} //testa se a rota está ativa e aplica a classe active
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/login" 
                        className={({ isActive }) => isActive ? styles.active : undefined}//testa se a rota está ativa e aplica a classe active
                    >
                        Entrar
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/register" 
                        className={({ isActive }) => isActive ? styles.active : undefined}//testa se a rota está ativa e aplica a classe active
                    >
                        Cadastrar
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => isActive ? styles.active : undefined}//testa se a rota está ativa e aplica a classe active
                    >
                        Sobre
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;