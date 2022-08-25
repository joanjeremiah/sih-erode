import axios from 'axios';
import React, {useState,useEffect, useRef}from 'react'
import styled from 'styled-components'
import {allUsersRoute, host} from '../../utils/APIRputes'
// import {useNavigate} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import Contacts from './Contacts';
import Welcome from './Welcome';
import ChatContainer from './ChatContainer';
import {io}  from 'socket.io-client';
import fetchUserData from '../../utils/fetchUserData';
import './Chat.css'

function Chat() {
  const socket = useRef();
//   const navigate = useNavigate();
  const history = useHistory();
  const [currentUser,setCurrentUser] = useState(undefined);
  const [contacts,setContacts]= useState([]);
  const [currentChat,setCurrentChat] = useState(undefined);
  useEffect(() => {
    async function fetchData() {
        const res = await fetchUserData()
        setCurrentUser(res.data)
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      console.log(currentUser)
      if (currentUser) {
        console.log(4)
        if (currentUser.isAvatarImageSet) {
          console.log(1)
          const data = await axios.get(`${allUsersRoute}`);
          
          setContacts(data.data);
        }else {
            console.log(2)
            history.push('/setAvatar')
        }
      }
    }
    fetchData();
  }, [currentUser]);
  const handleChatChange = (chat) =>{
    setCurrentChat(chat)
  }
useEffect(()=>{
  if(currentUser){
    socket.current = io(host);
    socket.current.emit("add-user",currentUser._id);
  } 
},[currentUser])

  return (<>
    <Container>
<div className='container chatapp-container'>
  <Contacts contacts={contacts} currentUser={currentUser}  changeChat={handleChatChange}/> 
  
  
  {currentChat===undefined?<Welcome currentUser={currentUser} />:
  <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />}
</div>

    </Container>
    </>
  )
}


const Container = styled.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat