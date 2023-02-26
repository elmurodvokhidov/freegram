import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { BiDotsVerticalRounded, BiLogOut, BiMenu, BiSearch } from "react-icons/bi";
import Stack from '@mui/material/Stack';
import { FormControlLabel, FormGroup, IconButton, Switch } from '@mui/material';
import { FiPhone } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { BsBookmark, BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { RiMoonClearLine } from "react-icons/ri";
import { MdOutlinePersonOutline } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
import Swal from 'sweetalert2';


const firebaseConfig = {
    // Your Firebase project config
    apiKey: "AIzaSyAeyUpul0_tZFnsHPeQZiiYWG8C1jmKuQ8",
    authDomain: "freegram-2bb53.firebaseapp.com",
    projectId: "freegram-2bb53",
    storageBucket: "freegram-2bb53.appspot.com",
    messagingSenderId: "352833183360",
    appId: "1:352833183360:web:3346d098ddc52326f11065"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function ChatRoom() {
    const [menuModal, setMenuModal] = useState(false);
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const auth = getAuth();
    const database = getDatabase();

    useEffect(() => {
        // Subscribe to messages collection
        const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
            const newMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(newMessages);
        });

        // Clean up event listener when component unmounts
        return () => unsubscribe();
    }, [db]);


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


    const handleNewMessageSubmit = async (event) => {
        event.preventDefault();
        if (newMessage.trim() === '') {
            return;
        }
        await addDoc(collection(db, 'messages'), {
            text: newMessage,
            userId: user.uid,
            timestamp: new Date(),
        });
        setNewMessage('');
    };


    // if (!user) {
    //     return <div>Loading...</div>;
    // }

    // Sign in Function
    // const handleSignIn = () => {
    //     const provider = new firebase.auth.GoogleAuthProvider();
    //     auth.signInWithPopup(provider);
    // };

    // Sign out Function
    const handleSignOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            width: 500,
            color: '#fff',
            background: '#181818',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                auth.signOut();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    color: '#fff',
                    background: '#181818',
                    title: 'You have successfully logged out!',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        })
    };

    return (
        <div className="chatRoom">
            <div className="left"
                onClick={() => setMenuModal(false)}
                onMouseLeave={() => setMenuModal(false)}>
                {/* Top */}
                <div className="top">
                    <div className="menu" onClick={(e) => e.stopPropagation()}>
                        <Stack direction="row" spacing={1}>
                            <IconButton onClick={() => setMenuModal(!menuModal)} color="primary" aria-label="add to shopping cart">
                                <span><BiMenu /></span>
                            </IconButton>
                        </Stack>
                    </div>
                    <div className="search">
                        <label htmlFor="search"><span><BiSearch /></span></label>
                        <input type="text" name="search" id="search" placeholder='Search' />
                    </div>

                    {/* Menu Modal */}
                    <div className="menuModal" onClick={(e) => e.stopPropagation()} id={menuModal ? 'menuModal' : ''}>
                        <button><span><BsBookmark /></span><p>Saved Messages</p></button>
                        <button><span><MdOutlinePersonOutline /></span><p>Profile</p></button>
                        <button className="switchDarkmode"><span><RiMoonClearLine /></span><p>Dark Mode</p>
                        </button>
                        <button><a href="https://telegram.org/" target="_blank" rel="noopener noreferrer"><span><AiOutlineQuestionCircle /></span><p>Telegram Features</p></a></button>
                        <button onClick={handleSignOut}><span><BiLogOut /></span><p>Log out</p></button>
                        <h2>Freegram Web 1.0.0 (306)</h2>
                    </div>
                </div>

                {/* People List */}
                <div className="peopleList">
                    <div className="peopleCard">
                        <div className="pcLeft">
                            <div className="profileImg">
                                <figure><img src="https://www.aceshowbiz.com/images/photo/alexander_rybak.jpg" alt="profileImage" /></figure>
                            </div>

                            <div className="profileTitle">
                                <p className="profileName">Alexander Rybak</p>
                                <p className="lastMessage">What's this?</p>
                            </div>
                        </div>

                        <div className="messageTime">
                            <span>10</span>
                            <span>:</span>
                            <span>19</span>
                            <span>PM</span>
                        </div>
                    </div>


                    <div className="peopleCard">
                        <div className="pcLeft">
                            <div className="profileImg">
                                <figure><img src="https://www.aceshowbiz.com/images/photo/alexander_rybak.jpg" alt="profileImage" /></figure>
                            </div>

                            <div className="profileTitle">
                                <p className="profileName">Alexander Rybak</p>
                                <p className="lastMessage">What's this?</p>
                            </div>
                        </div>

                        <div className="messageTime">
                            <span>10</span>
                            <span>:</span>
                            <span>19</span>
                            <span>PM</span>
                        </div>
                    </div>


                    <div className="peopleCard">
                        <div className="pcLeft">
                            <div className="profileImg">
                                <figure><img src="https://www.aceshowbiz.com/images/photo/alexander_rybak.jpg" alt="profileImage" /></figure>
                            </div>

                            <div className="profileTitle">
                                <p className="profileName">Alexander Rybak</p>
                                <p className="lastMessage">What's this?</p>
                            </div>
                        </div>

                        <div className="messageTime">
                            <span>10</span>
                            <span>:</span>
                            <span>19</span>
                            <span>PM</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="right" onClick={() => setMenuModal(false)}>
                <div className="top">
                    <div className="pcLeft">
                        <div className="profileImg">
                            <figure><img src="https://www.aceshowbiz.com/images/photo/alexander_rybak.jpg" alt="profileImage" /></figure>
                        </div>

                        <div className="profileTitle">
                            <p className="profileName">Alexander Rybak</p>
                            <p className="lastOnline">last seen <span>35</span> minutes ago</p>
                        </div>
                    </div>

                    <div className="profileAction">
                        <div className="menu call">
                            <Stack direction="row" spacing={1}>
                                <IconButton color="primary" aria-label="add to shopping cart">
                                    <span><FiPhone /></span>
                                </IconButton>
                            </Stack>
                        </div>
                        <div className="menu profileSearch">
                            <Stack direction="row" spacing={1}>
                                <IconButton color="primary" aria-label="add to shopping cart">
                                    <span><BiSearch /></span>
                                </IconButton>
                            </Stack>
                        </div>
                        <div className="menu moreAction">
                            <Stack direction="row" spacing={1}>
                                <IconButton color="primary" aria-label="add to shopping cart">
                                    <span><BiDotsVerticalRounded /></span>
                                </IconButton>
                            </Stack>
                        </div>
                    </div>
                </div>

                <div className="userMessage">
                    <div className="messagesWrapper">
                        {messages.sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds).map((val) => (
                            <div className='userNewMessage' key={val.id}
                                style={{
                                    alignItems: user.uid === val.userId ? '' : 'flex-start',
                                }}
                            >
                                <div className='newMessage'
                                    style={{
                                        backgroundColor: user.uid === val.userId ? '#8774E1' : '#212121',
                                    }}
                                >
                                    <p className='userText'>{val.text}</p>
                                    <p className='sentTime'>{new Date(val.timestamp?.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', })}</p>
                                </div>
                            </div>
                        ))}</div>
                    <div className="sendMessage">
                        <div className="smContent">
                            <div className="menu">
                                <Stack direction="row" spacing={1}>
                                    <IconButton color="primary" aria-label="add to shopping cart">
                                        <span><BsEmojiSmile /></span>
                                    </IconButton>
                                </Stack>
                            </div>
                            <textarea value={newMessage} onChange={(event) => setNewMessage(event.target.value)} name="message" id="message" cols="30" rows="1"></textarea>
                            <div className="menu">
                                <Stack direction="row" spacing={1}>
                                    <IconButton color="primary" aria-label="add to shopping cart">
                                        <span><ImAttachment /></span>
                                    </IconButton>
                                </Stack>
                            </div>
                        </div>
                        <div className="menu sendBtn">
                            <Stack direction="row" spacing={1}>
                                <IconButton onClick={(event) => handleNewMessageSubmit(event)} color="primary" aria-label="add to shopping cart">
                                    <span><IoSend /></span>
                                </IconButton>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;