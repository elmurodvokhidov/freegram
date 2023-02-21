import React, { useContext, useState } from 'react';
import { ContextData } from '../utilities/ContextData';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './ChatRoom';

function Register() {

    const { user } = useContext(ContextData);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // User registered successfully
                const user = userCredential.user;
                console.log(user);
                console.log('User registered successfully');
            })
            .catch((error) => {
                // Handle errors here
                console.error(error);
            });
    };

    return (
        <div>
            <h2>Register</h2>
            <form>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleRegister}>Register</button>
            </form>
            {
                user ? <ChatRoom user={user} /> : ''
            }
        </div>
    );
}

export default Register;