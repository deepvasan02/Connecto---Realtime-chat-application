import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import { socket } from '../../helpers/socket';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';


const Chat = ({location}) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    

    useEffect(() => {
      const { name, room } = queryString.parse(
        location.search
      );
  
      setName(name);
      setRoom(room);

      socket.on('connection', function(socket){
        console.log("New client connected");
      });

      socket.emit('join', { name, room }, (error) => {        
        if (error) {
          alert(error);
        }
      });
  
      return () => {
        socket.disconnect();
        socket.off();
      }
    }, [location.search]);
  
    useEffect(() => {
      socket.on('message', message => {
        setMessages(messages => [ ...messages, message ]);
      });
      
      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
    }, []);
  
    const sendMessage = (event) => {
      console.log(messages);
      event.preventDefault();
  
      if (message) {
        socket.emit('sendMessage', message, () =>
          setMessage('')
        );
      }
      setMessage('');
    };

    return (
    <div className="outer-container">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
