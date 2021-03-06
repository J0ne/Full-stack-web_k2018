import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      token: '',
      user: null,
      infoText: null,
      messageType: null
    }
  }

  getBlogs = () =>{
    blogService.getAll().then(blogs =>
      {
        blogs.sort(function (a, b) {
         return b.likes - a.likes;
         });
         this.setState({blogs})
      }
     
    )
  }

  componentDidMount() {
    this.getBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      // noteService.setToken(user.token)
    }
  } 

  login = async (e) => {
    e.preventDefault()
    try {
      const credentials = {
        username: this.state.username,
        password: this.state.password
      }
      console.log('loginData', credentials)
      loginService.logIn(credentials).then(response => {
        console.log(response)
        this.setState({
          user: { 
            name: response.name,
            username: response.username
            },
          username: response.username,
          token: response.token,
          name: response.name
        })
        blogService.setToken(response.token)
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(response))
        console.log(this.state);
        this.showInfo("Kirjautuminen onnistui", 'info')
      }).catch(error => {
        if (error.response.status === 401) {
          this.showInfo("Käyttäjätunnus tai salasana väärin", 'error')
        } else {
          this.showInfo("Kirjautuminen ei onnistunut.", 'error')
        }
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      })
    } catch (error) {
      if (error.response.status === 401) {
        this.showInfo("Käyttäjätunnus tai salasana väärin", 'error')
      } else {
        this.showInfo("Kirjautuminen ei onnistunut.", 'error')
      }
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  logOut = () =>{
    this.setState({
      username: '',
      password: '',
      token: '',
      user: null})
    window.localStorage.clear()
  }
  showInfo = (message, type) => {
    this.setState({
      infoText: message,
      messageType: type
    })
    setTimeout(() => {
      this.setState({ infoText: null, messageType: null })
    }, 4000)
  }
  handleLoginFieldChange = (event) => {
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleVisibility = () =>{
    this.BlogForm.toggleVisibility()
  }
  addLike = (blogData) => {
    //const blogData = this.state.blog
    blogData.likes++
    const response = blogService.addLike(blogData).then(response => {
      console.log(response)
      this.setState({ blog: response })
    }).catch(err => console.log(err))
  }
  render() {
    const showLoginStatus = () => {
      return (
        <div>
          <p><b>{this.state.user.name}</b> on kirjautunut sisään</p>
           <button onClick={this.logOut}>Kirjaudu ulos</button>
        </div>
      )
    }

    const loginForm = () => {
      return (
        <LoginForm
            onSubmit={this.login}
            passwordValue={this.state.password}
            usernameValue={this.state.username}
          handleLoginFieldChange={this.handleLoginFieldChange}
          /> )
    }


    const showBlogForm = () => {
      if(this.state.user !== null ){
        return (
          <Togglable buttonLabel="new blog" ref={component => this.BlogForm = component}>
          <BlogForm refresh={this.getBlogs} showInfo={this.showInfo} toggleVisibility={this.toggleVisibility} />
        </Togglable>)
       
      }
    }

    return (
      <div>
        <Notification message={this.state.infoText} type={this.state.messageType} />
        {this.state.user ? showLoginStatus() : loginForm() }
        <br/>
          {showBlogForm()}
        <h2>blogs</h2>
        
        {this.state.user ? this.state.blogs.map(blog => 
          <Blog handleLike={() => this.addLike(blog)} username={this.state.user !== null ?
            this.state.user.username: null} refresh={this.getBlogs} showInfo={this.showInfo} key={blog.id} blog={blog}/>
         ) : <p>Log in to see the blogs</p>}
      </div>
    );
  }
}

export default App;
