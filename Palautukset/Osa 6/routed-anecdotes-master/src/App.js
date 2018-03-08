import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from 'react-router-dom'
import { Container, Icon, Label, Table, Grid, Image, Button, Checkbox, Form } from 'semantic-ui-react'


const menuStyle = {
  backgroundColor: '#bcd1f2',
  color: 'black',
  borderRadius: 4,
  height: 'auto',
  padding: 5
}
const active = {
  backgroundColor: '#eaeff7',
  fontWeight: 'bolder',
  color: 'black',
  borderRadius: 4,
  height: 'auto',
  padding: 5
}

const Menu = () => (
    < div>    
    <NavLink  exact activeStyle={active} to="/">anecdotes</NavLink> &nbsp;
    <NavLink  activeStyle={active} to="/new">create new</NavLink> &nbsp;
    <NavLink  activeStyle={active} to="/about">about</NavLink>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote => 
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              < Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content}</Link>
            </Table.Cell>
            <Table.Cell>
              {anecdote.author}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)
const Anecdote = ({ anecdote }) => {
  console.log(anecdote)
  return (
    <div>
      <h2>{anecdote.content}</h2>
      {/* <div>{anecdote.user}</div> */}
      <div><strong>{anecdote.votes} likes</strong></div>
    </div>
  )
}
const About = () => (
   <Grid celled>
    <h2>About anecdote app</h2>
     <Grid.Row>
      <Grid.Column width={12}>
        <div>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
             An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </div>
      </Grid.Column>
      <Grid.Column width={4}>
        <Image src='http://i.dailymail.co.uk/i/pix/2018/01/07/09/47D810F300000578-5243337-image-m-3_1515318365981.jpg' />
        <p>Alan Turing</p>
      </Grid.Column>
    </Grid.Row>
    </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
      <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Content</label>
          <input name='content' value={this.state.content} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input name='author' value={this.state.author} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Url for more info</label>
          <input name='info' value={this.state.info} onChange={this.handleChange} />
        </Form.Field>
        <Button type='submit'>Create</Button>
      </Form>
      </div>)

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: '',
      notificationVisible: 'none'
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setState({ notification: `new anecdote ${anecdote.content} created`, notificationVisible: 'block'  })
    setTimeout(() => {
      this.setState({ notification: '', notificationVisible: 'none' })
    }, 10000);

  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }
  anecdoteById = (id) => {
   console.log(id)
   return this.state.anecdotes.find(anecdote => Number(anecdote.id) === Number(id)) 
  }
   

  render() {
    const notificationStyle = {
      border: '2px solid green',
      color: 'green',
      padding: 5,
      borderRadius: 4,
      backgroundColor: 'rgb(200,220, 200)',
      display: this.state.notificationVisible 
    }
    return (
      <Container>
        <h1>Software anecdotes</h1>
        <h3 style={notificationStyle}>{this.state.notification}</h3>
        <Router>
          <div>
          <Menu />
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/new" render={({ history }) => <CreateNew history={history} addNew={this.addNew} />}/>
            <Route path="/about" render={() => <About />}/>
            <Route exact path="/anecdotes/:id" render={({ match }) =>
            <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <Footer />
   
      </Container>
    );
  }
}

export default App;
