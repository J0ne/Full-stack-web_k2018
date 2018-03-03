import React from 'react';


class App extends React.Component {

  vote = (id) => () => {
    this.props.store.dispatch({ type: 'vote', id})
  }
  addNew = (event) => {
    event.preventDefault()
    const content = event.target.new.value
    this.props.store.dispatch({ type: 'add', content })
    event.target.new.value = ''
  }
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addNew}> 
          <div><input name='new' /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App