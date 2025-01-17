import styles from './Register.module.css';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    


    const {  createUser, error: authError, loading } = useAuthentication(); //para usar a função de autenticação

    const handLeSubmit = async (e) => {
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

        setLoading(true); // Set loading to true before createUser

        const res = await createUser(user);

        setLoading(false); // Set loading to false after createUser

        if (res) {
            console.log('Usuário criado com sucesso:', res);
        }

        console.log(user);
    };
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        if(authError){
            setError(authError);
        }   
    }, [authError]);

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
                <button className="btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Salvando...' : 'Cadastrar'}
                </button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default Register;