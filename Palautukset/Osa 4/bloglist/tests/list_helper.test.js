const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

describe('favorite blog', () =>{

    const testBlogList = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Testiblogi',
            author: 'J Mannisto',
            url: 'http://www.example.com',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17x09',
            title: 'Testiblogi2',
            author: 'J Mannisto',
            url: 'http://www.example.com',
            likes: 8,
            __v: 0
        }
    ]

    test('gives the most liked blog', () => {
        const result = listHelper.favoriteBlog(testBlogList)
        expect(result._id).toBe('5a422aa71b54a676234d17f9')
        expect(result).toEqual(testBlogList[1])
    })
})