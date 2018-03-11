const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    message: String,
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
})

commentSchema.statics.format = (comment) => {
    return {
        id: comment._id,
        message: comment.message,
        blog: comment.blog
    }
}

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment