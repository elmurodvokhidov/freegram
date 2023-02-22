import React, { useContext, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Box, Button, Stack, TextField } from '@mui/material';
import { ImTelegram } from 'react-icons/im';
import { ContextData } from '../utilities/ContextData';

function Login() {

  const { changeFunc } = useContext(ContextData);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login events function
  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User logged in successfully
        const user = userCredential.user;
        console.log(user);
        console.log('User logged in successfully');
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  // Sign in with Google
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
    <div className='register'>
      <div className="logo"><span><ImTelegram /></span></div>
      <div className="about">
        <h1>Welcome to Freegram</h1>
        <p>Sign up to get started!</p>
      </div>
      <form>
        <Box
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        >
          <TextField fullWidth label="Email" id="fullWidth" />
        </Box>
        <Box
          type="password" value={password} onChange={(e) => setPassword(e.target.value)}
        >
          <TextField fullWidth label="Password" id="fullWidth" />
        </Box>
        <Stack spacing={2} direction="row">
          <Button variant="contained" type="button" onClick={handleLogin}>Login</Button>
        </Stack>
      </form>
      <div className="footer">
        <p>If you don't have an account, <button onClick={changeFunc}>register</button> here</p>
        <p>or sign in with <button type="button" onClick={handleGoogleSignIn}>Google</button></p>
      </div>
    </div>
  );
}

export default Login;