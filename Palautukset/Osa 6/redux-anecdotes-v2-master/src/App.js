import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import ConnectedAnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
class App extends React.Component {

  render() {
    // const anecdotes = this.props.store.getState()
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Filter />
        <Notification />
        <ConnectedAnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default App