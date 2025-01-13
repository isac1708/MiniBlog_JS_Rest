import styles from './Register.module.css';
import { useState,useEffect } from 'react';


const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handLeSubmit =  (e) => {
        e.preventDefault();//previne o comportamento padrão do formulário
        setError(null);

        const user = {  //objeto com os dados do usuário
            displayName,
            email,
            password,
           
        }
        if(password !== confirmPassword){
            setError('As senhas não conferem');
            return;
        }

        console.log(user);
    };

    return (
        <div className={styles.register}>
            <h1>Cadastre-se para postar</h1>
            <p>Compartilhe seus momentos, Cadastre-se!</p>
            <form onSubmit={handLeSubmit}>
                <label>
                    <span>Nome:</span>
                    <input 
                        type="text" 
                        name="displayName" 
                        required 
                        placeholder='Nome do usuário' 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)} 
                    />
                    <span>Email:</span>
                    <input 
                        type="email"
                        name="Email"
                        required
                        placeholder='Email do usuário'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <span>Senha:</span>
                    <input
                        type="password" 
                        name="password" 
                        required 
                        placeholder='Insira sua senha:' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>Confirme sua senha:</span>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        required 
                        placeholder='Confirme sua senha:'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                </label>
                <button className="btn"  type="submit">Cadastrar</button>
                {error && <div className={styles.error}>{error}</div>}
            </form>
        </div>
    );
};

export default Register;