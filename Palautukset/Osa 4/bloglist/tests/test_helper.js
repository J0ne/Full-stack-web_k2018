const Blog = require('../models/blog')
const User = require('../models/user')

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
const formatUser = (user) => {
    console.log("TEST - FORMAT", user)
    return {
        id: user._id,
        name: user.name,
        username: user.username,
        password: user.passwordHash,
        adult: user.adult
    }
}

const nonExistingUserId = async () => {
    const user = new User()
    await user.save()
    await user.remove()

    return user._id.toString()
}

const usersInDb = async () => {
    const users = await User.find({})
    console.log('users', users)
    return users.map(formatUser)
}

module.exports = {
    initialBlogs, format, nonExistingId, blogsInDb,
    formatUser, nonExistingUserId, usersInDb
}