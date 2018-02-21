import React from 'react'
import Blog from './components/Blog'
// import Login from "./components/Login";
import blogService from './services/blogs'
import loginService from './services/login'
const baseUrl = '/api/login'

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
  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  login = (e) => {
    e.preventDefault()
    const credentials = {
      username: this.state.username,
      password: this.state.password
    }
    console.log('loginData', credentials)
    loginService.logIn(credentials).then(response => {
      console.log(response)
        this.setState({ user: response.token, username: response.username, token: response.token, name: response.name })
        console.log(this.state);
    }).catch(error => {
      if(error.response.status === 401){
          alert("Käyttäjätunnus tai salasana väärin")
      } else{
          alert("Kirjautuminen ei onnistunut.")
      }
      console.log(error)
    })
  }

  render() {
    const showLoginStatus = () => (
      <p><b>{this.state.name}</b> on kirjautunut sisään</p>
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
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
        <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    return (
      <div>
        {this.state.user ? showLoginStatus() : loginForm() }
        <h2>blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
