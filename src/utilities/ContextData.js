import React from "react";
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'firebase/database';

export const ContextData = React.createContext();

const ContextProvider = ({ children }) => {

    const [user, loading] = useAuthState(firebase.auth());

    console.log(user);

    return (
        <ContextData.Provider value={{
            user,
            loading
        }}>
            {children}
        </ContextData.Provider>
    )
}

export default ContextProvider;