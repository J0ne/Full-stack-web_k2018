import React from 'react'
import { connect} from 'react-redux'
import { userInitialization } from '../reducers/userReducer'

class User extends React.Component{

    render(){
        const { user } = this.props
        return (
            <div>
                <h2>{user != null ? user.name : ''}</h2>
                <h4>Added blogs</h4>
                <ul>{user != null && user.blogs != undefined ? user.blogs.map(blog => <li key={blog._id} >{blog.title}</li>): ''}</ul>

            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(
    mapStateToProps,
    { userInitialization}
)(User)