
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(formatBlog))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(formatBlog(blog))
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    
    const likes = blog.likes ? blog.likes : 0
    blog.likes = likes
    const result = await blog.save()
    response.status(201).json(result)
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

module.exports = blogsRouter