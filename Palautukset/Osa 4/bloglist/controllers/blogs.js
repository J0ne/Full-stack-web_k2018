
const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('postedBy', {'username': 1, 'name': 1})
    response.json(blogs.map(Blog.format))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(Blog.format(blog))
})

blogsRouter.post('/', async (request, response) => {
    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const blog = new Blog(request.body)

        if (!blog.url || !blog.title) {
            return response.status(400).json({ error: 'url or title missing' }).end()
        }
        const likes = blog.likes ? blog.likes : 0
        blog.likes = likes

        const userName = decodedToken.username
        const user = await User.findOne({ username: userName})
        
        blog.postedBy = user._id

        const savedBlog = await blog.save()
        console.log("USER TOKENISTA", user)
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: 'token missing, error: ' +  exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
        }
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog
            .findByIdAndRemove(request.params.id)

        response.status(204).end()
    } catch (error) {
        response.status(400).send({ error: 'malformatted id' })
    }

})
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    try {
        const result = await Blog
            .findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(Blog.format(result))
    } catch (error) {
        console.log("error:", error)
        response.status(400).send({ error: 'malformatted id' })
    }
    
})

const formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}
const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}
module.exports = blogsRouter