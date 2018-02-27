import React from 'react'

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
          {this.state.blog.likes} <button>like</button> <br />
          {showUser(this.state.blog)}
        </div>
      </div>
    )
  }
} 

export default Blog