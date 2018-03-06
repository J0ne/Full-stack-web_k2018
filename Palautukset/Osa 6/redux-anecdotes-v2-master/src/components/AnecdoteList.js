import React from 'react'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { voteCreator } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  handleLike(anecdote) {

    this.props.voteCreator(anecdote.id)
    this.props.showNotification(`you voted ${anecdote.content}`)
    setTimeout(() => {
      this.props.hideNotification()
    }, 1000);
  }
  render() {

    const anecdotesToShow =  () => {
      const { anecdotes, filter } = this.props
      console.log('anecdotes', anecdotes)
      console.log('filter', filter)
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
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { showNotification, hideNotification, voteCreator }
)(AnecdoteList)

export default ConnectedAnecdoteList
