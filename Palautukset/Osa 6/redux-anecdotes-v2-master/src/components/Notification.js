import React from 'react'
import { actionForAlerts } from '../reducers/notificationReducer'

class Notification extends React.Component {

  componentDidMount() {
    console.log(this.props.store.getState())
  }
  render() {
    // console.log('NOTIF',this.props.store.getState().notification)
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      display: this.props.store.getState().notification.status
    }
    return (
      <div style={style}>
        {this.props.store.getState().notification.message}
      </div>
    )
  }
}

export default Notification
