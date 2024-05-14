import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
// import Chat from './Chat'
import { Avatar, IconButton } from '@mui/material'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material'
import db from './firebase'
import { useStateValue } from './StateProvider'


function Sidebar() {

    const[rooms, setRooms] = useState([]);
    const[{user}, dispatch] = useStateValue();

    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot) => 
                setRooms(snapshot.docs.map((doc) => 
                    ({
                        id: doc.id,
                        data: doc.data(),
                    })
                )
            )
        )
    }, [])

  return (
    <div className='sidebar'>

      <div className='sidebar_header'>
        <Avatar src={user?.photoURL}/> 
        {/* user pic from google */}
        <div className='sidebar_headerRight'>
            <IconButton>
                <DonutLarge />
            </IconButton>
            <IconButton>
                <Chat />
            </IconButton>
            <IconButton>
                <MoreVert />
            </IconButton>
        </div>
      </div>

      <div className='sidebar_search'>
        <div className='sidebar_searchContainer'>
            <SearchOutlined />
            <input type='text' placeholder='Search or start new chat' />
        </div>
      </div>

      <div className='sidebar_chats'>
        <SidebarChat addNewChat />
        {rooms.map(room => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
        ))}
      </div>

    </div>
  ) 
}

export default Sidebar
