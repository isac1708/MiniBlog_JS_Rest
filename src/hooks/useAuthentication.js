import { auth } from '../firebase/config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';
import { useState, useEffect, useRef } from 'react'; // Importa useRef que será usado para verificar o status de montagem do componente
// useRef é um hook que retorna um objeto mutável com a propriedade .current. Ele é útil para manter valores que precisam ser acessados entre renderizações, como o status de montagem do componente.

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const auth = getAuth();

    // Usa useRef para rastrear o status de montagem do componente
    const isMounted = useRef(true);

    const createUser = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(user, { displayName: data.displayName });
            if (isMounted.current) { // Verifica se o componente ainda está montado
                return user;
            }
        } catch (error) {
            if (isMounted.current) { // Verifica antes de definir o erro
                setError(getErrorMessage(error.message)); // Usa função auxiliar
                setLoading(false);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false); // Garante que o loading seja definido como false mesmo em caso de erro
            }
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            if (isMounted.current) {
                setError(error.message);
            }
        }
    };
    const getLoginErrorMessage = (errorMessage) => {
        if (errorMessage.includes("wrong-password")) {
            return "Senha incorreta";
        } else if (errorMessage.includes("user-not-found")) {
            return "Usuário não encontrado";
        } else if (errorMessage.includes("invalid-email")) {
            return "Email inválido";
        } else {
            return "Erro ao logar, tente novamente mais tarde";
        }
    };
    const loginUser = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
            if (isMounted.current) { // Verifica se o componente ainda está montado
                return user;
            }
        } catch (error) {
            if (isMounted.current) {
                setError(getLoginErrorMessage(error.message)); // Usa função auxiliar específica para login
                setLoading(false);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false); // Garante que o loading seja definido como false mesmo em caso de erro
            }
        }
    };

    // Função auxiliar para centralizar a lógica de mensagens de erro
    const getErrorMessage = (errorMessage) => {
        if (errorMessage.includes("Password")) {
            return "A senha deve ter no mínimo 6 caracteres";
        } else if (errorMessage.includes("email")) {
            return "Email inválido";
        } else if (errorMessage.includes("already")) {
            return "Email já cadastrado";
        } else {
            return "Erro ao criar/logar usuário, aguarde uns instantes e tente novamente";
        }
    };

    useEffect(() => {
        isMounted.current = true; // Define como true quando o componente monta

        return () => {
            isMounted.current = false; // Define como false quando o componente desmonta
        };
    }, []);

    return { auth, createUser, error, loading, logout, loginUser };
};

export default useAuthentication;