//faz difença entre usuario cadastrado e não cadastrado
import { useContext,createContext } from "react";

const AuthContext = createContext();

export function  AuthProvider({children,value}){ //componente que vai envolver a aplic
    return <AuthContext.Provider value ={value}>{children}</AuthContext.Provider>
}


export function useAuth(){ //hook para usar o contexto
    return useContext(AuthContext);
}