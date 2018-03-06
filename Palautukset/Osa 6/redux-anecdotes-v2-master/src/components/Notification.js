import React from 'react'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class Notification extends React.Component {
  
  render() {
    console.log('NOTIF',this.props)
    const {message, status} = this.props
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      display: status
    }
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log('notification STATE',state)
  return {
    message: state.notification.message,
    status: state.notification.status
  }
}
export default connect(
  mapStateToProps,
  { showNotification, hideNotification}
)(Notification)

