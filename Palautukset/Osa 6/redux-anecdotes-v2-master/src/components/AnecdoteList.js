import React from 'react'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { voteCreator } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  handleLike = async(anecdote) => {

    const updatedAnecdote = await anecdoteService.addVote(anecdote)
    this.props.voteCreator(updatedAnecdote.id)
    this.props.showNotification(`you voted ${updatedAnecdote.content}`)
    setTimeout(() => {
      this.props.hideNotification()
    }, 1000);
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
  console.log(state.anecdotes)
  return {
    anecdotesToShow: state.anecdotes.filter(p => p.content.includes(state.filter))
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { showNotification, hideNotification, voteCreator }
)(AnecdoteList)

export default ConnectedAnecdoteList
