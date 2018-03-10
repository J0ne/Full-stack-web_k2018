import React from 'react'
import { connect } from 'react-redux'

class UserList extends React.Component {
    
    render() {
        return (
            <div>
                <h2>Users</h2>
                <table>
                    <thead>
                     <tr><th>User:</th><th>blogs posted:</th></tr>
                    </thead>
                    <tbody>
                        {this.props.users.map(user =>
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state.users)
    return {
        users: state.users
    }
}

const ConnectedUserList = connect(
    mapStateToProps
)(UserList)

export default ConnectedUserList
