import React from 'react'
import { actionFor } from '../reducers/anecdoteReducer'
import { actionForAlerts } from '../reducers/notificationReducer'
// import { actionFor } from '../reducers/notificationReducer'
class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    console.log(anecdote)
     this.props.store.dispatch(
       actionFor.anecdoteCreation(anecdote)
    )  
    this.props.store.dispatch(actionForAlerts.showNotification(` ${anecdote} created`))
    setTimeout(() => {
      this.props.store.dispatch(actionForAlerts.hideNotification())
    }, 5000);
    e.target.anecdote.value = ''
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

export default AnecdoteForm
