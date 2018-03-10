let token = null

const blogs = [{
        "_id": {
            "$oid": "5a7899e5d27bbf0b994ea865"
        },
        "title": "Learn to code",
        "author": "Marius Schultz",
        "url": "https://egghead.io/courses/understand-javascript-s-this-keyword-in-depth",
        "__v": 0,
        "likes": 666
    },
    {
        "_id": {
            "$oid": "5a789bf6a84af80c38968226"
        },
        "title": "Sparkfun - START SOMETHING",
        "author": "Feldi",
        "url": "https://www.sparkfun.com/news/2597",
        "likes": 0,
        "__v": 0
    }]

const getAll = () => {
    return Promise.resolve(blogs)
}
const setToken = (token) => {
    token = token
}
export default { getAll, blogs, setToken }