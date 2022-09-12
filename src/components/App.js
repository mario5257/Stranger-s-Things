import { Router, Link, Route, Routes, useNavigate, useParams} from "react-router-dom";
import { useCallback, useEffect, useState } from 'react'
import Home from './Home'
import Posts from "./Posts";
import Login from "./Login";
import Register from "./Register";
import View from "./View";
import Profile from "./Profile";
const App = () => {
        const [token, setToken] = useState('')
        const [username, setUsername] = useState('')
        const [id, setId] = useState('')
        const [posts, setPosts] = useState([]);
        const [messages, setMessages] = useState([])
        // const [isLoggedIn, setIsLoggedIn] = useState(false)
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-row mb-3 shadow p-3">
            <Link to="/" className="nav-item ms-1 btn btn-secondary">Home</Link>
            <Link to="/posts" className="nav-item ms-1 btn btn-secondary">Posts</Link>
            <Link to="/profile" className="nav-item ms-1 btn btn-secondary">Profile</Link>
            <Link to="/login" className="nav-item ms-1 btn btn-secondary">Log In</Link>

        </nav>
        {
        token? <h4>Signed in as: {username} <button onClick={()=>{
            setToken('')
        }}>Log Out</button></h4>
        : <h4>Signed in as: guest</h4> 
        }
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Posts token={token} id={id} setId={setId} posts={posts} setPosts={setPosts} setMessages={setMessages} />  } />
                <Route path='/posts/view/:id' element={<View posts={posts} token={token}/>} />

                <Route path="/profile" element={<Profile username={username} posts={posts} token={token}/>} />
                <Route path="/login" element={<Login setToken={setToken} token={token} setUsername={setUsername} username={username} />} />
                <Route path='/login/register' element={<Register />} />
            </Routes>
            </>
    )
}

export default App