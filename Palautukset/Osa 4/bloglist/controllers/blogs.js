
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
    try {
        const blog = new Blog(request.body)
        if (!blog.url || !blog.title) {
            return response.status(400).json({ error: 'url or title missing' }).end()
        }
        const likes = blog.likes ? blog.likes : 0
        blog.likes = likes
        const result = await blog.save()
        response.status(201).json(result)
    } catch (error) {
        console.log(error)
        response.status(500).json({ error: 'something went wrong...' })
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

module.exports = blogsRouter