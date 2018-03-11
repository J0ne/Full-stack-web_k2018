import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import UserList from "./components/UserList"
import User from "./components/User"
import BlogDetail from "./components/BlogDetail"
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import Notification from './components/Notification'
import { notify } from './reducers/notificationReducer'
import { userInitialization } from './reducers/userReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from 'react-router-dom'
import { debug } from 'util';
import { Container, Table } from 'semantic-ui-react'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      token: '',
      user: null
      // infoText: null,
      // messageType: null
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
    this.props.userInitialization()
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
  // addLike = (blogData) => {
  //   // alert(id)
  //   // const blogData = this.state.blogs.find(b => b.id === id)
  //   if(!blogData) return
  //   blogData.likes++
  //   const response = blogService.addLike(blogData).then(response => {
  //     this.setState({ blog: response })
      
  //     //this.showInfo(`${blogData.title} liked!`, "info")
  //   }).catch(err => console.log(err))
  //   this.props.notify(`${blogData.title} liked! `, 1)
  // }
  
  render() {
    const userById = (id) => {
      if (this.props.users.length === 0){
        return null
      }else{
        return this.props.users.find(a => a.id === id)
      }
    }
    const blogById = (id) => {
      if (this.state.blogs.length === 0) { // toistaiseksi state
        return null
      } else {
        return this.state.blogs.find(a => a.id === id)
      }
    }
    const loginStyle = {
      float: 'right'
    }
    const menuStyle = {
      border: '2px solid green',
      padding: 5
    }
    const showLoginStatus = () => {
      return (
        <span style={loginStyle}><span><b>{this.state.user.name}</b> on kirjautunut sisään  </span><button onClick={this.logOut}>Kirjaudu ulos</button></span>
         
      )
    }
    const Menu = () => (
      <div >
        <NavLink to="/">Blogs</NavLink> &nbsp;
        <NavLink to="/users">Users</NavLink> &nbsp;
        <span style={loginStyle}> {this.state.user ? showLoginStatus() : loginForm()}</span>
      </div>
    )
    const loginForm = () => {
      return (
        <LoginForm
            onSubmit={this.login}
            passwordValue={this.state.password}
            usernameValue={this.state.username}
          handleLoginFieldChange={this.handleLoginFieldChange}
          /> )
    }

    const showUsers = () => {
      return (
        <UserList />
      )
    }

    const showBlogForm = () => {
      if(this.state.user !== null ){
        return (
          <Togglable buttonLabel="new blog" ref={component => this.BlogForm = component}>
          <BlogForm refresh={this.getBlogs} showInfo={this.showInfo} toggleVisibility={this.toggleVisibility} />
        </Togglable>)
       
      }
    }

    const renderBlogs = () => {
      return ( 
      <div>
        <h2>blogs</h2>
          <Table striped celled>
            <Table.Body>
              {this.state.user ? this.state.blogs.map(blog =>
                 <Blog username={this.state.user !== null ?
                 this.state.user.username : null} handleClick={() => this.addLike(blog)} 
                 refresh={this.getBlogs} showInfo={this.showInfo} key={blog.id} blog={blog} />
              ) : <Table.Row>
                  <Table.Cell>Log in to see the blogs</Table.Cell>
              </Table.Row>}
              </Table.Body>
          </Table>
        </div>
        )
    }
    return (
      <Container>
      <Router>
      <div>
          <div style={menuStyle} >
            <Menu /> 
          
          </div>

        <Notification store={this.props.store} />
        {showBlogForm()}
       
          <Route exact path="/" render={() => renderBlogs()} />
          <Route exact path="/blogs/:id" render={({ match }) => 
            <BlogDetail id={match.params.id} blog={blogById(match.params.id)} />}/>
          <Route exact path="/users" render={() => <UserList />} />
          <Route exact path="/users/:id" render={ ({ match }) =>
            <User user={userById(match.params.id)}/>} />
      </div>
      </Router>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}
export default connect(
  mapStateToProps,
  { notify, userInitialization }
)(App)
