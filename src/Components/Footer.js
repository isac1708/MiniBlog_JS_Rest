// Cria o componente Footer que é um rodapé para o site. Ele é composto por um título e um texto de direitos autorais.
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return <footer>
    <h3>Escreva sobre o que você tem interesse!</h3>
    <p>Mini Blog  &copy; 2025 </p>
  </footer>;
};

export default Footer;