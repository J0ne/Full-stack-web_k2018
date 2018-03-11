import React from 'react'
import blogService from '../services/blogs'
import { NavLink, Link } from 'react-router-dom'
const showUser = (blog) => {
  if(blog.postedBy != null){
    return 'added by ' + blog.postedBy.name;
  }
}
class Blog extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      showDetails: false
    }
  }
 

  deleteBlog = () => {
    let title = this.state.blog.title;
    let confirm = window.confirm(`Delete blog ${this.state.blog.title}?`)
    if(confirm){
      const id = this.state.blog.id
      const response = blogService.deleteBlog(id).then(response => {
        this.props.showInfo(`${title} successfully deleted!`, 'info' )
        this.props.refresh()
      }).catch(err => {
        console.log(err)
        if(err.status === 401){
          this.props.showInfo(`Unauthorized!`, 'error')
        }
      })
    }

  }

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails})
  }

  showDeleteButton = (blog) => {
    if (!blog.postedBy || blog.postedBy.username === this.props.username){
      return (
        <button className="delete-btn" onClick={this.deleteBlog}>delete blog</button> 
      )
    }
  }

  render(){

    const blogStyle = {
      paddingTop: 5,
      paddingBottom: 25,
      paddingLeft: 10,
      border: '1px solid black',
      borderWidth: 1,
      marginBottom: 5,
      borderRadius: '4px'
    }
    const titleStyle = {
      cursor: 'pointer',
      fontWeight: 'bolder'
    }
    const floatRight = {
      float: 'right'
    }

    //const show = { display: this.state.showDetails ? 'none' : '' }
    const hide = { display: this.state.showDetails ? '' : 'none' }
    return (
      
      <div className='wrapper' style={blogStyle}>
        <div className="list-content">
          <Link to={`/blogs/${this.state.blog.id}`}> {this.state.blog.title}</Link><span style={floatRight}>({this.state.blog.comments.length } comments)</span>
          {/* <span style={titleStyle} onClick={this.toggleDetails}>{this.state.blog.title}</span> {this.state.blog.author} */}
        </div>
        <div className="details" style={hide}>
          <p><a href={this.state.blog.url}>{this.state.blog.url}</a></p>
          {this.state.blog.likes} 
          <button className="btn-like" onClick={this.props.handleLike}>like</button> <br />
          {showUser(this.state.blog)}
          {this.showDeleteButton(this.state.blog)}
        </div>
      </div>
    )
  }
} 

export default Blog