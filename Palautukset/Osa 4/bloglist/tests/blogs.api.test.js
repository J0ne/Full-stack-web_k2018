const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')
const api = supertest(app)
const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

describe('API TESTS', () => {
    afterAll(() => {
        server.close()
    })
    describe('GET API calls ', () => {
        beforeAll(async () => {
            await Blog.remove({})

            const blogObjects = initialBlogs.map(b => new Blog(b))
            await Promise.all(blogObjects.map(b => b.save()))
        })

        test('blogs are returned as json', async () => {
            const blogsIndatabase = await blogsInDb()
            const result = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
            expect(result.body.length).toBe(blogsIndatabase.length)
        })

        test('blog by id is found', async () => {
            const blogsIndatabase = await blogsInDb()
            const expectedBlog = blogsIndatabase[0]
            const result = await api
                .get(`/api/blogs/${expectedBlog.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            expect(result.body.url).toBe(expectedBlog.url)
            expect(result.body.author).toBe(expectedBlog.author)
        })

    })

    describe('POST API calls', () => {
        test('blog is saved', async () => {

            const blogsIndatabaseBeforePost = await blogsInDb()
            const expectedTotal = blogsIndatabaseBeforePost.length + 1
            const testBlog = {
                "title": "Test Blog",
                "author": "API TEST",
                "url": "https://www.example.com/",
                "likes": 100
            }
            await api
                .post('/api/blogs')
                .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpqbWFubmlzIiwiaWQiOiI1YTg4Nzk4MjQ4MTY0NzRlNjFmNmVjMzgiLCJpYXQiOjE1MTg4OTUzMDl9.AZ3uHnJtZC8441zpob5pNiVyNVUdlnDdpptc527UMA4')
                .send(testBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const result = await blogsInDb()
            expect(result.length).toBe(expectedTotal)
        })

        test('blog likes initialised', async () => {
            const testBlog = {
                "title": "Test Blog",
                "author": "API TEST",
                "url": "https://www.example.com/"
            }
            const result = await api
                .post('/api/blogs')
                .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpqbWFubmlzIiwiaWQiOiI1YTg4Nzk4MjQ4MTY0NzRlNjFmNmVjMzgiLCJpYXQiOjE1MTg4OTUzMDl9.AZ3uHnJtZC8441zpob5pNiVyNVUdlnDdpptc527UMA4')
                .send(testBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            expect(result.body.likes).toBe(0)
        })
        test('blog title and url required', async () => {
            const testBlog = {
                "author": "API TEST"
            }
            const result = await api
                .post('/api/blogs')
                .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpqbWFubmlzIiwiaWQiOiI1YTg4Nzk4MjQ4MTY0NzRlNjFmNmVjMzgiLCJpYXQiOjE1MTg4OTUzMDl9.AZ3uHnJtZC8441zpob5pNiVyNVUdlnDdpptc527UMA4')
                .send(testBlog)
                .expect(400)

            // toinen puuttuu    
            const testBlog2 = {
                "author": "API TEST2",
                "title": "Test blog"
            }
            const result2 = await api
                .post('/api/blogs')
                .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpqbWFubmlzIiwiaWQiOiI1YTg4Nzk4MjQ4MTY0NzRlNjFmNmVjMzgiLCJpYXQiOjE1MTg4OTUzMDl9.AZ3uHnJtZC8441zpob5pNiVyNVUdlnDdpptc527UMA4')
                .send(testBlog2)
                .expect(400)
        })
    })
    describe('DELETE blog', () => {
        test('blog is removed', async () => {
            const blogsIndatabaseBeforeDelete = await blogsInDb()
            const blogToDelete = blogsIndatabaseBeforeDelete[1]
            const result = await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsInDbAfterDelete = await blogsInDb()

            expect(blogsIndatabaseBeforeDelete.length - 1).toBe(blogsInDbAfterDelete.length)
        })

    })
    describe('PUT request', () => {
        beforeAll(async () => {
            await Blog.remove({})

            const blogObjects = initialBlogs.map(b => new Blog(b))
            await Promise.all(blogObjects.map(b => b.save()))
        })
        test('likes count is updated', async () => {
            const blogsInDatabase = await blogsInDb()
            const blogToUpdate = blogsInDatabase[0]
            blogToUpdate.likes = 666

            const result = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)
                .expect('Content-Type', /application\/json/)
            expect(result.body.likes).toBe(666)

            
            
            
        })
        // afterAll(() => {
        //     server.close()
        // })
    })
})



// beforeAll(async () => {
//     await Blog.remove({})

//     let blogObject = new Blog(initialBlogs[0])
//     await blogObject.save()

//     blogObject = new Blog(initialBlogs[1])
//     await blogObject.save()
// })