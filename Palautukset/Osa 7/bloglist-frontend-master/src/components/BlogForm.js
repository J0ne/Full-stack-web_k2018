import React from 'react'
import blogService from '../services/blogs'

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           author: '',
           title: '',
           url: ''
        }
    }
    createBlog = (e) => {
        e.preventDefault()
        const newBlog = this.state
        blogService.postBlog(newBlog).then(response => {
            console.log(response)
            this.props.refresh()

            this.props.showInfo(`Blogin "${this.state.title}" tallennus onnistui!`, 'info')
            
            
            
            this.setState({
                author: '',
                title: '',
                url: ''
            })
            console.log(this.state)
            setTimeout(() => {
                this.props.toggleVisibility()
            }, 400)
        }).catch(err => {
            this.props.showInfo("Tallennus ei onnistunut! Virhe: " + err, 'error')
        })
    }

    handleBlogFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Create blog</h2>

                <form>
                    <div>
                        Title:
                     <input
                            type="text"
                            name="title"
                            autoComplete="off"
                            value={this.state.username}
                            onChange={this.handleBlogFieldChange}
                        />
                    </div>
                    <div>
                        Author:
                    <input
                            type="title"
                            name="author"
                            autoComplete="off"
                            value={this.state.password}
                            onChange={this.handleBlogFieldChange}
                        />
                    </div>
                    <div>
                        Url:
                    <input
                            type="title"
                            name="url"
                            value={this.state.password}
                            onChange={this.handleBlogFieldChange}
                        />
                    </div>
                    <button onClick={this.createBlog}>Create</button>
                </form>
            </div>
        )
    }
}




export default BlogForm