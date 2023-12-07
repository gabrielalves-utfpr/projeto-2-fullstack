
import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const Message = ({ data }) => {
  return (
    <div className="message">
      <p>{data}</p>
    </div>
  );
};

export default function Notification () {
  const [token, setToken] = React.useState(null);
  const [messages, setMessages] = React.useState([]); 

  useEffect(() => {
    const jwt = localStorage.getItem('auth');
    setToken(jwt);
  }, []);

  const socketUrl = `ws://localhost:8080?authorization=Bearer%20${token}`;

  const {readyState} = useWebSocket(socketUrl, {
    onOpen: () => console.log('Conectado ao servidor websocket'),
    onClose: () => console.log('Desconectado do servidor websocket'),
    onMessage: (event) => {
      console.log('Mensagem recebida: ', event.data);
      setMessages(prevMessages => [event.data, ...prevMessages]);
    },
    onError: (error) => console.log('Erro: ', error),
    share: true,
    reconnectAttempts: 10,
    reconnectInterval: 3000
  });
  console.log(messages)
  return (
    <div className="grid">
        <p>Conexão: {readyState}</p>
        {messages.map((message, index) => (
            
            <Message key={index} data={message} />
        ))
        }
    </div>
  );
};


/*
import './style.css'
import logo from '../../assets/globe_with_satellites.svg'

export default function Header () { 
  return (
    <div className="top-bar">
        <div className="logo">
          <img
            id="globe"
            htmlFor="nasa"
            src={logo}
            alt=""
          />
          <h1 className="nasa-font" id="nasa" htmlFor="globe">
            NASA
          </h1>
        </div>
          <ul className="menu">
            <li  id="menu-home">
              <Link to="/" className="menu-opt">Home</Link>
            </li>
            <li id="menu-iod">
              <Link to="/image-of-day"  className="menu-opt">Image of the Day</Link>
              
            </li>
            <li className="menu-opt" id="menu-planets">
              <Link to="/planets"  className="menu-opt">Planets</Link>
            </li>
          </ul>
        </div>
  )
}
*/