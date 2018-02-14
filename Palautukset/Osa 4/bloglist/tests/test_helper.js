const Blog = require('../models/blog')

const initialBlogs = [
    {
        "_id": "5a7899e5d27bbf0b994ea865",
        "title": "Learn to code",
        "author": "Marius Schultz",
        "url": "https://egghead.io/courses/understand-javascript-s-this-keyword-in-depth",
        "__v": 0,
        "likes": 123
    },
    {
        "_id": "5a789bf6a84af80c38968226",
        "title": "Sparkfun - START SOMETHING",
        "author": "Feldi",
        "url": "https://www.sparkfun.com/news/2597",
        "likes": 0,
        "__v": 0
    }
]

const format = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

module.exports = {
    initialBlogs, format, nonExistingId, blogsInDb
}