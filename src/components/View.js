import { Router, Link, Route, Routes, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from 'react'

const View = (props) => {
    const {id} = useParams()
    const posts = props.posts
    const token = props.token
    const [message, setMessage] = useState('')

    const post = posts.find((p) => p._id === id)

    // const singlePost = async (token) => {
    //     try {
    //             const response = await fetch(`https://strangers-things.herokuapp.com/api/2206-FTB-PT-WEB-PT/posts/${id}`, {
    //                 headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization':   `Bearer ${token}`
    //                 },
    //             })
    //             const result = await response.json()
    //             setUserPosts(result.data.posts)
    //         } catch(err) {
    //             console.error(err.message)
    //         }
    //         }
    // useEffect(() => {
    //     singlePost(token)
    // },[])
        const createMessage = async (message, token) => {
            try {    const response = await fetch(`https://strangers-things.herokuapp.com/api/2206-FTB-PT-WEB-PT/posts/${id}/messages`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    message: {
      content: message
    }
  })
})
const result = await response.json()
console.log(result)
               } catch(err) {
                console.error(err)
               }
                }

    return  <> 
    <h2>Item: {post.title}</h2>
        <h4 title={post.title}>Description: {post.description}</h4>
        <h4 title={post.title}>Price: {post.price}</h4>
        { token? <h2>Messages</h2>: null

        }
        {
                    post.messages? post.messages.map((message) => {
                       return <>
                       <h4>Message: {message.content}</h4>
                       <h4>- {message.fromUser.username}</h4>
                       </>
               }): <h4>No Messages</h4>
               }
  { token? <form onSubmit={(event) => {
        event.preventDefault()
        createMessage(message, token)
        event.target.reset()
    }}>
    <label>Message: </label>
    <input type='textarea' onChange={(event) => {
        event.preventDefault()
        setMessage(event.target.value)
    }}></input>
    <input type='submit' value='send'></input>
</form>
: null
}

    <Link to={'/posts'} className="btn btn-danger">Return to posts</Link>
    </>
}

export default View