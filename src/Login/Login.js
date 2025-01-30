import { useState, useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import styles from './Login.module.css'; // Certifique-se de importar os estilos

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const { loginUser, error: authError } = useAuthentication(); // para usar a função de autenticação

    const handleSubmit = async (e) => {
        e.preventDefault(); // previne o comportamento padrão do formulário
        setError(null);

        const user = { // objeto com os dados do usuário
            email,
            password,
        };

        setLoading(true); 

        const res = await loginUser(user);

        setLoading(false); 

        if (res) {
            console.log('Usuário logado com sucesso:', res);
        } else {
            setError('Erro ao fazer login');
        }

        console.log(user);
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className={styles.login}>
            <h1>Entrar</h1>
            <p>Faça login para utilizar o ambiente</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email:</span>
                    <input
                        type="email"
                        name="Email"
                        required
                        placeholder='Email do usuário'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder='Insira sua senha:'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button className="btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Aguarde...' : 'Entrar'}
                </button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;