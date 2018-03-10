import React from 'react'

const User = ({ user }) => {
    console.log('user',user, user.blogs)
    return (
        <div>
            <h2>{user.name}</h2>
            <h4>Added blogs</h4>
            <ul>{user.blogs.map(blog => <li key={blog._id} >{blog.title}</li>)}</ul>
           
        </div>
    )
}

export default User