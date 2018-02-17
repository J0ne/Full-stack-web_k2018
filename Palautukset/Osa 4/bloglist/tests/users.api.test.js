const supertest = require('supertest')
const User = require('../models/user')
const { app, server } = require('../index')
const { formatUser, nonExistingUserId, usersInDb } = require('./test_helper')
const api = supertest(app)


describe.only('when there is initially one user at db', async () => {
    afterAll(() => {
        server.close()
    })
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'testuser', password: 'salasana!!!', adult: true, name: 'Teppo Testinen' })
        await user.save()
    })

    test('POST /api/users succeeds with a fresh username', async () => {
        const usersBeforeOperation = await usersInDb()
        console.log('usersBeforeOperation',usersBeforeOperation)
        const newUser = {
            username: 'jjmannis',
            name: 'Jouni Männistö',
            password: 'testiä1234',
            adult: true
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        console.log(usersAfterOperation)
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const usernames = usersAfterOperation.map(u => u.username)
        expect(usernames).toContain(newUser.username)
        
    })
})