import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { BiMenu, BiSearch } from "react-icons/bi";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';

function ChatRoom() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const auth = getAuth();
    const database = getDatabase();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, [auth]);

    useEffect(() => {
        const messagesRef = ref(database, 'messages');
        onValue(messagesRef, (snapshot) => {
            const messagesObject = snapshot.val();
            if (messagesObject) {
                const messagesList = Object.keys(messagesObject).map((key) => ({
                    ...messagesObject[key],
                    key,
                }));
                setMessages(messagesList);
            }
        });
    }, [database]);

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (message.trim() === '') {
            return;
        }
        const newMessage = {
            user: user.displayName,
            text: message,
            createdAt: new Date().toISOString(),
        };
        push(ref(database, 'messages'), newMessage);
        setMessage('');
    };

    const handleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };

    const handleSignOut = () => {
        auth.signOut();
    };

    return (
        <div className="chatRoom">
            <div className="left">
                <div className="top">
                    <div className="menu">
                        <Stack direction="row" spacing={1}>
                            <IconButton color="primary" aria-label="add to shopping cart">
                                <span><BiMenu /></span>
                            </IconButton>
                        </Stack>
                    </div>
                    <div className="search">
                        <label htmlFor="search"><span><BiSearch /></span></label>
                        <input type="text" name="search" id="search" placeholder='Search' />
                    </div>
                </div>
                <div className="peopleList"></div>
            </div>
            <div className="right"></div>
            {/* {user ? (
                <button onClick={handleSignOut}>Sign Out</button>
            ) : (
                <button onClick={handleSignIn}>Sign In with Google</button>
            )}
            <ul>
                {messages.map((message) => (
                    <li key={message.key}>
                        <strong>{message.user}</strong>: {message.text}
                    </li>
                ))}
            </ul>
            {user && (
                <form onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>
            )} */}
        </div>
    );
}

export default ChatRoom;