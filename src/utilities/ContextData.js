import React, { useState } from "react";
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'firebase/database';

export const ContextData = React.createContext();

const ContextProvider = ({ children }) => {

    const [user, loading, error] = useAuthState(firebase.auth());
    const [change, setChange] = useState(true);
    const [errorAuth, setErrorAuth] = useState([]);

    // console.log(user);

    // Changer Function
    function changeFunc() {
        setChange(!change);
    }

    return (
        <ContextData.Provider value={{
            user,
            loading,
            change,
            setChange,
            changeFunc,
            error,
            errorAuth,
            setErrorAuth,
        }}>
            {children}
        </ContextData.Provider>
    )
}

export default ContextProvider;