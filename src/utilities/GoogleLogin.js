import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from '../components/ChatRoom';
import 'firebase/database'; 

function GoogleLogin() {

    const [user, loading] = useAuthState(firebase.auth());

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                // User signed in successfully
                const user = result.user;
                console.log(user);
                console.log('User signed in successfully with Google account');
            })
            .catch((error) => {
                // Handle errors here
                console.error(error);
            });
    };

    return (
        <div>
            <h2>Login with Google</h2>
            <button type="button" onClick={handleGoogleSignIn}>Sign in with Google</button>
            {
                user ? <ChatRoom user={user} /> : ''
            }
        </div>
    );
}

export default GoogleLogin;