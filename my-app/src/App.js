import "./app.css";
import { useEffect, useState } from "react";
import Card from "./components/card/Card.js";
import Navbar from "./components/navbar/Navbar.js";
import { posts } from "./data.js";
import { io } from "socket.io-client";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    if (username) {
      socket.emit("addUser", username);
    }
  }, [socket, username]);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} user={user} socket={socket} />
          ))}

          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <h2>Lama App</h2>
          <input
            type="text"
            placeholder="username"
            onBlur={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
          {console.log(user)}
        </div>
      )}
    </div>
  );
}

export default App;
