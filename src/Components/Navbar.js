//Cria o componente Navbar que é um menu de navegação para o site. Ele é composto por um título e dois links, um para a página inicial e outro para a página sobre.

import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuthentication } from '../hooks/useAuthentication'; // Corrige o caminho da importação
import { useAuth } from '../context/AuthContext'; // Corrige o caminho da importação // Corrige o caminho da importação

const Navbar = () => {
    const {user} = useAuth();
    const {logout} = useAuthentication();
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
                {!user && (
                    <>
                        <li>
                            <NavLink 
                                to="/login" 
                                className={({ isActive }) => isActive ? styles.active : undefined} // testa se a rota está ativa e aplica a classe active
                            >
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/register" 
                                className={({ isActive }) => isActive ? styles.active : undefined} // testa se a rota está ativa e aplica a classe active
                            >
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <li>
                        <NavLink 
                            to="/dashboard" 
                            className={({ isActive }) => isActive ? styles.active : undefined} // testa se a rota está ativa e aplica a classe active
                        >
                            Dashboard
                        </NavLink>
                    </li>
                )}
               
                <li>
                    <NavLink 
                        to="/create-post" 
                        className={({ isActive }) => isActive ? styles.active : undefined} // testa se a rota está ativa e aplica a classe active
                    >
                        Criar Post
                    </NavLink>
                </li>
                <li>
                    {/* Outros itens de navegação aqui */}
                </li>
                <li>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => isActive ? styles.active : undefined}//testa se a rota está ativa e aplica a classe active
                    >
                        Sobre
                    </NavLink>
                </li>
                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>)}
            </ul>
        </nav>
    );
};

export default Navbar;