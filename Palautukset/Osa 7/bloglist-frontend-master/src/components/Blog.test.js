import React from 'react'
import { shallow, mount } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('renders content', () => {
        const blog = {
            author: 'Teppo Testaaja',
            title: 'blog title',
            url: 'www.example.com',
            likes: 10
        }

        const blogComponent = shallow(<Blog blog={blog} />)


        const contentTitleDiv = blogComponent.find('.list-content')

        expect(contentTitleDiv.text()).toContain(blog.author)
        expect(contentTitleDiv.text()).toContain(blog.title)
        // expect(contentTitleDiv.text()).toContain(blog.url)

        const contentLikesDiv = blogComponent.find('.details')
        expect(contentLikesDiv.text()).toContain(10)
    })
    it('clicking blogs like button calls handler', () => {
        const blog = {
            author: 'Teppo Testaaja',
            title: 'blog title',
            url: 'www.example.com',
            likes: 10
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <Blog blog={blog} handleLike={mockHandler} />
        )

        console.log(blogComponent.debug())
        const button = blogComponent.find('button.btn-like')
        button.simulate('click')
        expect(button.length).toBe(1)
        
        // console.log(blogComponent.instance().addlike);
        
        expect(mockHandler.mock.calls.length).toBe(1)
    })
    it('after clicking name the details are displayed', () => {
        const blog = {
            author: 'Teppo Testaaja',
            title: 'blog title',
            url: 'www.example.com',
            likes: 10
        }

        const blogComponent = shallow(<Blog blog={blog}  />)
        console.log('1. vaihe',blogComponent.debug())

        const contentTitleDiv = blogComponent.find('.list-content')




        expect(contentTitleDiv.text()).toContain(blog.author)
        expect(contentTitleDiv.text()).toContain(blog.title)
        const detailsDiv = blogComponent.find('.details')
        expect(detailsDiv.getElement().props.style).toEqual({ display: 'none' })
        //expect(contentTitleDiv.text()).not('.wrapper').toContain(blog.url)
        const name = blogComponent.find('span')
        name.simulate('toggleDetails')

        console.log(blogComponent.debug())
        // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
        //const detailsDiv = blogComponent.find('.details')
        expect(detailsDiv.getElement().props.style).toEqual({ display: '' })
        expect(detailsDiv.text()).toContain(blog.url)
})
    
})