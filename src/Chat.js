import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, Mic } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useParams } from 'react-router-dom'
import db from './firebase'
import firebase from 'firebase/compat/app'
import { useStateValue } from './StateProvider'
import Sidebar from './Sidebar'

function Chat() {

    const [input, setInput] = useState("")
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).
            onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name)
            ))

            db.collection("rooms").doc(roomId).collection("messages")
            .orderBy("timestamp", "asc").onSnapshot((snapshot) => 
            
                setMessages(snapshot.docs.map((doc) => doc.data()))
            );

            
        }
    }, [roomId]);

    useEffect(() => {
        console.log(messages);
    }, [messages]);

    // if (messages.length > 0) {
    //     setRoomName(messages[messages.length - 1].name);
    // }
    // }, [messages]);

    function sendMessage(e) {
        e.preventDefault();
        console.log(input);

        db.collection("rooms").doc(roomId).collection("messages")
        .add({
            message: input,
            name: user.displayName, // from google auth
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

        setInput("");
    }

  return (

    <>  
        <div className='chat'>
        
        <div className='chat_header'>
            <Avatar />
            <div className='chat_headerInfo'>
                <h3>{roomName}</h3>
                <p>Last seen at {" "}
                    {new Date(messages[messages.length-1]?.
                     timestamp?.toDate()
                    ).toUTCString()
                    }
                </p>
            </div>
            
            <div className='chat_headerRight'>
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>

        </div>

        <div className='chat_body'>

            {messages.map((message) => (
                <div className='messagebox'>
                    <p className={`chat_message ${
                        message.name === user.displayName
                        && "chat_reciever"}`}>
                    {message.name !== user.displayName
                    && <span className='chat_name'>{message.name}</span>}
                    
                    {message.message}
                    <span className='chat_timestamp'>
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                </div>
                
            ))}

            {/* <p className='chat_message'>
                <span className='chat_name'>Kaushik</span>
                Hey Guys
                <span className='chat_timestamp'>7:15pm</span>
            </p>
            <p className={`chat_message ${true && "chat_reciever"}`}>
                <span className='chat_name'>Kaushik</span>
                Hey Guys
                <span className='chat_timestamp'>7:15pm</span>
            </p> */}
        </div>

        <div className='chat_footer'>
            <InsertEmoticon />
            <form>
                <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message...'/>
                <button onClick={sendMessage} type='submit'>Send a message</button>
            </form>
            <Mic />
        </div>

    </div>
    </>
    
  )
}

export default Chat
