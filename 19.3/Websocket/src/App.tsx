import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');

    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello from Server!');
    }

    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setMsg(message.data);
      // console.log('Message received:', message.data);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <>
      <input onChange={(e) => {setInput(e.target.value)}} value={input}></input>
      <button onClick={() => {socket?.send(input)}}>send</button>
      Server sent a message {msg}
    </>
  )
}

export default App