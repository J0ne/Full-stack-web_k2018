import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    it('renders content', () => {
        const blog = {
            author: 'jjmannis',
            title: 'blog title',
            url: 'www.example.com',
            likes: 10
        }

        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        // console.log(blogComponent.debug())

        const contentTitleDiv = blogComponent.find('.content-title')
        
        expect(contentTitleDiv.text()).toContain(blog.author)
        expect(contentTitleDiv.text()).toContain(blog.title)
        // expect(contentTitleDiv.text()).toContain(blog.url)

        const contentLikesDiv = blogComponent.find('.content-likes')
        expect(contentLikesDiv.text()).toContain(10)
    })
    it('clicking like button calls handler', () => {
        const blog = {
            author: 'jjmannis',
            title: 'blog title',
            url: 'www.example.com',
            likes: 10
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <SimpleBlog
                blog={blog}
                onClick={mockHandler}
            />
        )

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
        

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})