import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { notify } from '../reducers/notificationReducer'
// import { userInitialization } from '../reducers/userReducer'

class BlogDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blog: props.blog
        }
    }
    showBlog(blog){
        if (blog) {
            return (<div>
                <h2>{blog != null ? blog.title : ''}</h2>
                <div className="" >
                    <p><a href={blog.url}>{blog.url}</a></p>
                    <p>{blog.likes} likes</p>
                    <button className="btn-like" onClick={() => this.addlike(blog)}>like</button> <br />
                    {/* {showUser(this.state.blog)} */}
                    {/* {this.showDeleteButton(this.state.blog)} */}
                </div>
            </div>)
        } else {
            return (<div>...</div>
            )
        }
    }

    addlike(blog) {

        blog.likes++
        const response = blogService.addLike(blog).then(response => {
            this.setState({ blog: response })
            console.log(response)
            //this.showInfo(`${blogData.title} liked!`, "info")
        }).catch(err => console.log(err))
        //this.props.notify(`${blog.title} liked! `, 1)
    }

    render() {
        const { blog, handleLike } = this.props
        return this.showBlog(blog)
    }

}

// const mapStateToProps = (state) => {
//     return {
//         users: state.users
//     }
// }
export default BlogDetail
// export default connect(
//     mapStateToProps,
//     { userInitialization }
// )(BlogDetail)