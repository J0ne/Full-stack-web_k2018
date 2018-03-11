import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import CommentForm from './CommentForm'
import { notify } from '../reducers/notificationReducer'
import { Button, Form, Container, Header  } from 'semantic-ui-react'
// import { userInitialization } from '../reducers/userReducer'

class BlogDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            blog: props.blog,
            comment: '',
            notification: ''
        }
    }
    componentDidMount() {
        if(!this.state.blog){
            const blog = blogService.getById(this.state.id).then(response => {
                this.setState({ blog: response })
            })
            
        }
    }
    handleInput = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }
    addComment = async (e) => {
        e.preventDefault();
        if(this.state.comment.length == 0) return;
        console.log("ADD COMMENT ->")
        blogService.postComment(this.state.id, this.state.comment).then(response => {
            console.log(response)
            const blog = this.state.blog;
            blog.comments = blog.comments.concat(response)
            this.setState({blog})
            this.props.notify(`${this.state.comment} added! `, 1)
            this.setState({comment:''})
        })
    }
    showBlog(blog){
        if (blog) {
            return (<Container fluid>
                <Header as='h2'>{blog != null ? blog.title : ''}</Header>
                    <p><a href={blog.url}>{blog.url}</a></p>
                    <p>{blog.likes} likes</p>
                    <Button className="btn-like" onClick={() => this.addlike(blog)}>like</Button>
                    
                    <p>added by {blog.postedBy !== null ? blog.postedBy.name : 'anonymous!'}</p>

                    <Header>comments:</Header>
                    <CommentForm onSubmit={this.addComment} commentValue={this.state.comment} handleCommentFieldChange={this.handleInput} />
                    <ul>
                    {blog.comments.map(c => <li key={c._id}>{c.message}</li>)}
                    </ul>
            </Container>)
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
        const { blog, id } = this.props
        return this.showBlog(blog)
    }

}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}
// export default BlogDetail
export default connect(
    mapStateToProps,
    { notify }
)(BlogDetail)