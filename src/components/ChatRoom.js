import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, push } from 'firebase/database';

function ChatRoom() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    console.log(messages);

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
        <div>
            {user ? (
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
            )}
        </div>
    );
}

export default ChatRoom;