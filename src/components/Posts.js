import { Router, Link, Route, Routes, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from 'react'

const Posts = (props) => {
    // const [userPosts, setUserPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [searchValue, setSearchValue] = useState('')
    const newPost = {
        title,
        description,
        price
    }
    const [onlyUserPosts, setOnlyUserPosts] = useState(false)
    const token = props.token;
    const posts = props.posts
    const setPosts = props.setPosts


    const fetchPost = async (token) => {
try {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2206-FTB-PT-WEB-PT/posts',
            {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':   `Bearer ${token}`
                }, 
        })
        const data = await response.json();
        setPosts(data.data.posts);
} catch(err) {
    console.error(err)
}
    }
 
    useEffect(() => {
        fetchPost(token)
        // token? fetchUsersPosts(token): null
    }, [posts])
    

//     const fetchUsersPosts = async (token) => {
// try {
//         const response = await fetch('https://strangers-things.herokuapp.com/api/2206-FTB-PT-WEB-PT/users/me', {
//             headers: {
//             'Content-Type': 'application/json',
//             'Authorization':   `Bearer ${token}`
//             },
//         })
//         const result = await response.json()
//         setUserPosts(result.data.posts)
//     } catch(err) {
//         console.error(err.message)
//     }
//     }

    const createUserPost = async (title, description, price, token) => {
        try{
        const response = await fetch('https://strangers-things.herokuapp.com/api/2206-FTB-PT-WEB-PT/posts', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    post: {
      title: title,
      description: description,
      price: price,
      willDeliver: true
    }
  })
})
    const result = await response.json()
    newPost.isAuthor = true
    newPost._id = result.data.post._id
    setPosts((prev) => [newPost, ...prev]

)
    } catch(err) {
        console.error(err)
    }
}

const deleteUserPost = async (id, token) => {
    console.log(id);
    try{
        await fetch(`https://strangers-things.herokuapp.com/api/2206-FTB-PT-WEB-PT/posts/${id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
    setPosts((prev) => 
        prev.filter((post) => id !== post._id)
    )

    } catch (err) {
        console.error(err.message)
    }
}
const userPosts = posts.filter((post) => {
    return post.isAuthor? post
    : null
    
})
const postMatches = (post) => {
    const textToCheck = (
      post.title + post.description
    ).toLowerCase();
    return textToCheck.includes(searchValue.toLowerCase());
  };

  const filteredPosts = posts.filter((post) => {
    return postMatches(post);
  });

  const filteredUserPosts = userPosts.filter((post) => {
    return postMatches(post)
})
    return (<>
    
        <h1>Posts</h1>

        <h2>Got something to sell?</h2>
        {
        token? <form onSubmit={(event) => {
        event.preventDefault()
        createUserPost(title, description, price, token)
        event.target.reset()
        }}>
            <input type='text' id='item' placeholder='Item' className="btn btn-grey " onChange={(event) => setTitle(event.target.value)}></input>
            <input type='text' id='description' placeholder='Description' className="btn btn-grey " onChange={(event) => setDescription(event.target.value)}></input>
            <input type='text' id='price' placeholder='Price' className="btn btn-grey " onChange={(event) => setPrice(event.target.value)}></input>
            <input type='submit' value='Create Post' className="btn btn-secondary text-white"></input><br />
            <label>Only User Post</label>
            <input type='checkbox' className="btn btn-white" onChange={()=>{
                onlyUserPosts? setOnlyUserPosts(false)
                :setOnlyUserPosts(true);
            }}></input>
        </form>
: <h3>Please log in...</h3>
        }
          <input
        type="text"
        placeholder="Search for an item"
        value={searchValue}
        className="bg-white"
        onChange={(event) => setSearchValue(event.target.value)}
      />

        {
        onlyUserPosts? 
        <>
            <h2>Your Listings</h2>
            <ul>
                {

                    filteredUserPosts.map((post) => {
                        return <div key={post._id} className='row mb-3'>
                            {
                                post.active? <div key={post._id}>
                                <h3>{post.title}</h3>
                                <h4 title={post.title}> {post.description}</h4>
                                <h4 title={post.title}>$ {post.price}</h4>
                                <h4 title={post.title}>active</h4>

                                <form className="row mb-3">
                                <input type='submit' value='edit' className="btn btn-secondary" onClick={(event)=> {
                                    event.preventDefault()
                                return <>       
                                                       
                                    <input type='text' id='item' placeholder='Item' className="bg-light" onChange={(event) => setTitle(event.target.value)}></input>
                                    <input type='text' id='description' placeholder='Description' className="bg-light" onChange={(event) => setDescription(event.target.value)}></input>
                                    <input type='text' id='price' placeholder='Price' className="bg-light" onChange={(event) => setPrice(event.target.value)}></input>
                                    <input type='submit' value='Create Post' className="btn btn-light"></input>
                                    </>}}>
                                </input>
                                <input type='button' value='delete' className="btn btn-secondary" id={post._id} onClick={(event)=>{
                                    event.preventDefault()
                                    deleteUserPost(post._id, token)
                                }}></input>
                                </form>
                                </div>: <div key={post._id}>
                                <h3>{post.title}</h3>
                                <h4 title={post.title}> {post.description}</h4>
                                <h4 title={post.title}> ${post.price}</h4>
                                <h4 title={post.title}>not active</h4>

                                <form>
                                <input type='submit' value='edit' className="btn btn-secondary" onClick={(event)=> {
                                    event.preventDefault()
                                return <>       
                                                            
                                    <input type='text' id='item' placeholder='Item' className="bg-light" onChange={(event) => setTitle(event.target.value)}></input>
                                    <input type='text' id='description'  className="bg-light" placeholder='Description' onChange={(event) => setDescription(event.target.value)}></input>
                                    <input type='text' id='price' className="bg-light" placeholder='Price' onChange={(event) => setPrice(event.target.value)}></input>
                                    <input type='submit' value='Create Post'></input>
                                    </>}}>
                                </input>
                                <input type='button' value='delete' className="btn btn-secondary" id={post._id} onClick={(event)=>{
                                    event.preventDefault()
                                    deleteUserPost(post._id, token)
                                }}></input>
                                </form>
                        </div>
                    }</div>
})
        
                }
                
            </ul>
            
        </>
        : <> 
            <h2>Listings</h2>
            <ul>
                { 
                filteredPosts.map((post) => {
                            return (
                                <div key={post._id} className='row mb-3'>
                                    <h3>{post.title}</h3>
                                    <h4 title={post.title}> {post.description}</h4>
                                    <h4 title={post.title}> {post.price}</h4>
                                    {post.isAuthor ? <form className="row mb-3">
                                    <Link to={`/posts/view/${post._id}`}><input type='button' className="row mb-3 btn btn-secondary" value='view'></input></Link>
                                    <input type='submit' value='edit' className="btn btn-secondary" onClick={(event)=> {
                                        event.preventDefault()
                                    return <>                          
                                        <input type='text' id='item' placeholder='Item' className="btn btn-secondary" onChange={(event) => setTitle(event.target.value)}></input>
                                        <input type='text' id='description' placeholder='Description' className="btn btn-secondary" onChange={(event) => setDescription(event.target.value)}></input>
                                        <input type='text' id='price' placeholder='Price' className="btn btn-secondary" onChange={(event) => setPrice(event.target.value)}></input>
                                        <input type='submit' value='Create Post' className="btn btn-secondary"></input>
                                        </>}}>
                                    </input>
                                    <input type='button' value='delete' className="btn btn-secondary" id={post._id} onClick={(event)=>{
                                        event.preventDefault()
                                        deleteUserPost(post._id, token)
                                    }}></input>
                                    </form>: 
                                    
                                    <Link to={`/posts/view/${post._id}`} className='row mb-3 btn btn-secondary'><input type='button' value='view'></input></Link>
                                    }
        
                                </div>
                            )
                        })
                    
                }
            </ul> 
            </>} 
        </>)
        
}



export default Posts