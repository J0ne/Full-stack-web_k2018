import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
    <div className="wrapper">
        <div className="content-title">
            {blog.title} {blog.author}
        </div>
        <div className="content-likes">
            blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
        </div>
    </div>
)

export default SimpleBlog