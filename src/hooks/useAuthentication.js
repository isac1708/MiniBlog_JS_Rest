import {
    getAuth,
    creatUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';

import { useState, useEffect } from 'react';

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

};
