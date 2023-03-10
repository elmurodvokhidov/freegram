import React, { useContext, useState } from 'react';
import { ContextData } from '../utilities/ContextData';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import ChatRoom from './ChatRoom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { ImTelegram } from "react-icons/im";
import Login from './Login';
import { BiErrorCircle } from 'react-icons/bi';
import Swal from 'sweetalert2';

function Register() {

    const { user, change, changeFunc } = useContext(ContextData);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Handle registration function
    const handleRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // User registered successfully
                const user = userCredential.user;
                console.log(user);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    color: '#fff',
                    background: '#181818',
                    title: 'You registered in successfully',
                    showConfirmButton: false,
                    timer: 2000
                })
                // console.log('User registered successfully');
            })
            .catch((error) => {
                // Handle errors here
                setError(error.message);
            });
    };

    return (
        user ? <ChatRoom user={user} /> :
            change ?
                error ? <div className='error'>
                    <span><BiErrorCircle /></span>
                    <h1>{error}</h1>
                    <button onClick={() => setError(null)}>Try again</button>
                </div>
                    :
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
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                            </FormGroup>
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" type="button" onClick={handleRegister}>Register</Button>
                            </Stack>
                        </form>
                        <div className="footer">
                            <p>If you already have an account, <button onClick={changeFunc}>login</button> here</p>
                        </div>
                    </div> : <Login />
    );
}

export default Register;