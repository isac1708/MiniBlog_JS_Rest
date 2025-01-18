import { auth } from '../firebase/config';

// ...existing code...
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';

import { useState, useEffect } from 'react';
import { data } from 'react-router-dom';


export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
//cleanup para evitar memory leak

const [cancelled, setCancelled] = useState(false);

const auth = getAuth();

function checkIfCancelled() {
    if (cancelled) {
        throw new Error('cancelled');
    }
}

    const createUser = async(data) => {
        setLoading(true);//inicia o loading
        setError(null);
        try {
            
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)
            await updateProfile(user, { displayName: data.displayName })
            return user;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            let systemErrorMessage
            if(error.message.includes("Password")){
                systemErrorMessage = "A senha deve ter no mínimo 6 caracteres"
            }else if(error.message.includes("email")){
                systemErrorMessage = "Email inválido"
            }else if(error.message.includes("already")){
                systemErrorMessage = "Email já cadastrado"
            }else{
                systemErrorMessage = "Erro ao criar usuário aguarde uns instantes e tente novamente"
            }
            setError(systemErrorMessage);
        }
    };
    useEffect(() => {
        return () => {
            setCancelled(true);
        };
    }, []);
    return { auth, createUser, error, loading };
};
