const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')
const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test('blog is saved', async () => {
    const testBlog = {
        "title": "Test Blog",
        "author": "API TEST",
        "url": "https://www.example.com/",
        "likes": 100
    }
    await api
        .post('/api/blogs').send(testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    server.close()
})

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

beforeAll(async () => {
    await Blog.remove({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})