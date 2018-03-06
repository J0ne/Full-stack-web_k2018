import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    console.log(this.props)
    this.props.anecdoteCreation(anecdote)
    this.props.showNotification(` ${anecdote} created`)
    setTimeout(() => {
      this.props.hideNotification()
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

// const mapDispatchToProps = {
//   actionFor
// }
// const ConnectedAnecdoteForm = connect(
//   null,
//   mapDispatchToProps
// )(AnecdoteForm)

export default connect(
  null,
  { anecdoteCreation, showNotification, hideNotification}
)(AnecdoteForm)

