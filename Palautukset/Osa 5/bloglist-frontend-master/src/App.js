import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
// import Login from "./components/Login";
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      token: '',
      user: null

    }
  }
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  getBlogs = () =>{
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  componentDidMount() {
    this.getBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      blogService.setToken(user.token)
      this.setState({ user })
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
      })
    } catch (error) {
      if (error.response.status === 401) {
        alert("Käyttäjätunnus tai salasana väärin")
      } else {
        alert("Kirjautuminen ei onnistunut.")
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
  render() {
    const showLoginStatus = () => (
      <div>
        <p><b>{this.state.user.name}</b> on kirjautunut sisään</p>
        <button onClick={this.logOut}>Kirjaudu ulos</button>
      </div>
     
    )

    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
        <input
              type="text"
              name="username"
              autoComplete="off"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
        <input
              type="password"
              name="password"
              autoComplete="off"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    const showBlogForm = () => {
      if(this.state.user !== null ){
        return <BlogForm refresh={this.getBlogs}  />
      }
    }

    return (
      <div>
        {this.state.user ? showLoginStatus() : loginForm() }
        <br/>
          {showBlogForm()}
        <h2>blogs</h2>
        
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
