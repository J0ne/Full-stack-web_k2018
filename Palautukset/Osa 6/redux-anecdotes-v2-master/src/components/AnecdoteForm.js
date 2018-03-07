import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from "../services/anecdotes";

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.createNew(anecdote)
    this.props.anecdoteCreation(newAnecdote)
    
    this.props.showNotification(` ${newAnecdote.content} created`)
    setTimeout(() => {
      this.props.hideNotification()
    }, 5000);

  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

export default connect(
  null,
  { anecdoteCreation, showNotification, hideNotification}
)(AnecdoteForm)

