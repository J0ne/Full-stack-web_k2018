import React from 'react'
import { notify } from '../reducers/notificationReducer'
import { voteCreator } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  handleLike = async(anecdote) => {
    this.props.voteCreator(anecdote)
    this.props.notify(`you voted ${anecdote.content}`, 1)
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
  { voteCreator, notify }
)(AnecdoteList)

export default ConnectedAnecdoteList
