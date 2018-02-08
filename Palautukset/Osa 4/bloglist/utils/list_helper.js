const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => 
    blogs.map(x => x.likes).reduce(countLikes)

const countLikes = (acc, sum) => acc + sum;

module.exports = {
    totalLikes, dummy
}