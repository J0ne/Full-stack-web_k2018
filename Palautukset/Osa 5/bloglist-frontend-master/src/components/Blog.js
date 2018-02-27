import React from 'react'
import blogService from '../services/blogs'
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
  addLike = () => {
    const blogData = this.state.blog
    blogData.likes++
    const response = blogService.addLike(blogData).then(response =>{
      console.log(response)
      this.setState({ blog: response })
    }).catch(err => console.log(err))
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
    console.log("Toimii")
    console.log(this.state)
    this.setState({ showDetails: !this.state.showDetails})
  }

  render(){

    const blogStyle = {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      border: '1px solid black',
      borderWidth: 1,
      marginBottom: 5,
      borderRadius: '4px'
    }
    const titleStyle = {
      cursor: 'pointer',
      fontWeight: 'bolder'
    }
    //const show = { display: this.state.showDetails ? 'none' : '' }
    const hide = { display: this.state.showDetails ? '' : 'none' }
    return (
      
      <div style={blogStyle}>
        <div>
          <span style={titleStyle} onClick={this.toggleDetails}>{this.state.blog.title}</span> {this.state.blog.author}
        </div>
        <div style={hide}>
          <p><a href={this.state.blog.url}>{this.state.blog.url}</a></p>
          {this.state.blog.likes} 
          <button onClick={this.addLike}>like</button> <br />
          {showUser(this.state.blog)}
          <button onClick={this.deleteBlog}>delete blog</button> 
        </div>
      
      </div>
    )
  }
} 

export default Blog