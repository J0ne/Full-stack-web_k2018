import React from 'react'
import { actionForAlerts } from '../reducers/notificationReducer'
class AnecdoteList extends React.Component {
  handleLike(anecdote) {

    this.props.store.dispatch({ type: 'VOTE', id: anecdote.id })
    this.props.store.dispatch(actionForAlerts.showNotification(`you voted ${anecdote.content}`))
    setTimeout(() => {
      this.props.store.dispatch(actionForAlerts.hideNotification())
    }, 5000);
  }
  render() {

    const anecdotesToShow =  () => {
      const { anecdotes, filter } = this.props.store.getState()
      // console.log('anecdotes', anecdotes)
      // console.log('filter', filter)
      if(filter === ''){
        return anecdotes
      }
      return anecdotes.filter(p => p.content.includes(filter))
    }
      
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotesToShow().sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handleLike(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
