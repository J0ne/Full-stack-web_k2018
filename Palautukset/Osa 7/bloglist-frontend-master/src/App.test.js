import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import Login from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App  />)
    })

    it('doesnt render blogs if user isnt logged in', () => {
        app.update()
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(0)
    })

    // it('renders blogs when user is logged in', () => {
    //     const user= {
    //         name: 'Teppo Testaaja',
    //         username: "teppo",
    //         password: "teppo123!"
    //     }
    //     localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    //     app = mount(<App />)
    //     //app.setProps(});
    //     app.update()
    //     const blogComponents = app.find(Blog)
    //     expect(blogComponents.length).toEqual(2)
    // })
})
describe('<App />', () => {
    let app

    describe('when user is not logged', () => {
        beforeEach(() => {
            app = mount(<App />)
        })

        it('only login form is rendered', () => {
            app.update()
            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toEqual(0)
            const LoginComponents = app.find(Login)
            expect(LoginComponents.length).toEqual(1)
        })
    })

    describe('when user is logged', () => {
        beforeEach(() => {
            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Teuvo Testaaja'
            }
            localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('all blogs are rendered', () => {
            app.update()
            console.log('logged in', app.debug())
            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toEqual(2)
        })
    })
})