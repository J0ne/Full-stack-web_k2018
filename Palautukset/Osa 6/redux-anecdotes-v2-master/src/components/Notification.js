import React from 'react'
import { actionFor } from '../reducers/notificationReducer'

class Notification extends React.Component {

  componentDidMount() {
    this.props.store.dispatch(actionFor.notificationShowing('Moro'))
    console.log(this.props.store.getState())
  }
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.props.store.getState().notification.message}
      </div>
    )
  }
}

export default Notification
