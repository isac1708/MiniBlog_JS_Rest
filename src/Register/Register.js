import styles from './Register.module.css';
import { useState,useEffect } from 'react';


const Register = () => {
    return (
        <div>
            <h1>Cadastre-se para postar</h1>
            <p>Compartilhe seus momentos, Cadastre-se!</p>
            <form>
                <label>
                    <span>Nome:</span>
                    <input type="text" name="displayName" requiered placeholder='Nome do usuário' />
                    <span>Email:</span>
                    <input type="email" name="Email" requiered placeholder='Email do usuário' />
                    <span>Senha:</span>
                    <input type="password" name="password" requiered placeholder='Insira sua senha:' />
                    <span>Confirme sua senha:</span>
                    <input type="password" name="confirPassword" requiered placeholder='Confirme sua senha:' />
                </label>
                <button className="btn"  type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default Register;