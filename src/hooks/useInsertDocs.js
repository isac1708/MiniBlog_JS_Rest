import {useState, useEffect, useReducer} from 'react';
import {db} from '../services/firebase';
import {collection, addDoc, Timestamp} from 'firebase/firestore';


const initialState = {// função que retorna o estado inicial
    loading: null,
    error: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {loading: true, error: null};
        case 'error':
            return {loading: false, error: action.payload};
        case 'success':
            return {loading: false, error: null};
        default:
            return state;
    }
}

export const useInsertDocs = (docCollection) => {
    const [response, dispatch] = useReducer(reducer, initialState);// função que retorna o estado e a função de dispatch(que é a função que altera o estado)

    const [cancelled, setCancelled] = useState(false);

    const  checkCancelBeforeDispatch = (action) => {//função que verifica se a ação foi cancelada
        if(!cancelled){
            dispatch(action);
        }
    };

    const insertDocs = async (document) => {
        try {
            const newDocument = {...document, createdAt: Timestamp.now()};

            const insertedDoc = await addDoc(collection(db, docCollection), newDocument);

            checkCancelBeforeDispatch({type: "INSERT_DOC", payload: insertedDoc});

        } catch (error) {
            checkCancelBeforeDispatch({type: "ERROR", payload: error.message});
        }
    };

    useEffect(() => {
        return () => {
            setCancelled(true);
        }
    },[]);
    
    return {response, insertDocs, setCancelled};

};
