const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    passwordHash: String,
    adult: Boolean,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
    return {
        id: user._id,
        name: user.name,
        password: user.passwordHash,
        adult: user.adult,
        username: user.username,
        blogs: user.blogs
    }
}
const User = mongoose.model('User', userSchema)

module.exports = User