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
    console.log('tmpArr', tmpArr)
    // sort by value
    tmpArr.sort(function (a, b) {
        return a.likes - b.likes;
    });
    console.log(tmpArr)

    const last = tmpArr[tmpArr.length -1]
    console.log('last:', last)
    return blogs.find( x => x._id === last.id);
}


module.exports = {
    totalLikes, dummy, favoriteBlog
}