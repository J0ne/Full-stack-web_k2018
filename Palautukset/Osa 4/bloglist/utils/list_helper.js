const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => 
    blogs.map(x => x.likes).reduce(countLikes)

const countLikes = (acc, sum) => acc + sum;

const favoriteBlog = (blogs) =>
{
    const tmpArr = blogs.map(x => { 
        return { id: x._id, likes: x.likes}
    })
    // console.log('tmpArr', tmpArr)
    // sort by value
    tmpArr.sort(function (a, b) {
        return a.likes - b.likes;
    });
    const last = tmpArr[tmpArr.length -1]
    return blogs.find( x => x._id === last.id);
}

const mostBlogs = (blogs) => {
    let result = [];
    let authorsTmp = blogs.map( x => x.author);
    // new set, without duplicates
    authorsTmp  = Array.from(new Set(authorsTmp));
    authorsTmp.forEach( author => {
        result.push({
            author,
            blogs: blogs.filter(item => item.author == author).length
        }) 
    })
    result.sort(function (a, b) {
        return a.blogs - b.blogs;
    });
    console.log(result);
    const last = result[result.length - 1]
    return last
}

module.exports = {
    totalLikes, dummy, favoriteBlog, mostBlogs
}