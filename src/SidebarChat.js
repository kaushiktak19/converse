import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import db from './firebase';
import { Link, useParams } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {

    const [messages, setMessages] = useState("")

    useEffect(() => {
        if(id) {
            db.collection("rooms").doc(id).collection("messages").
            orderBy("timestamp", "asc").onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) =>
                doc.data()
            ))
        )
        }
    }, [id])

    function createChat() {
        const roomName = prompt("Please enter name for chat");

        if(roomName){
            // adds new room from user-input to our db and renders
            db.collection("rooms").add({
                name: roomName,
            })
        }
    }
    

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
        <div className='sidebarChat'>
        <Avatar />
        <div className='sidebarChat_info'>
            <h2>{name}</h2>
            <p>{messages[messages.length-1]?.message}</p>
        </div>
        </div>
    </Link>
    ) 
  :
  (
    <div onClick={createChat} className='sidebarChat'>
        <h2>Add New Chat</h2>
    </div>
  )
  
}

export default SidebarChat
