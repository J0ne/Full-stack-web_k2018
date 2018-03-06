import React from 'react'
import { filtering } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {

    handleChange = (event) => {
        console.log(event.target.value)
        this.props.filtering(event.target.value)
    }
    render() {
        const style = {
            marginBottom: 10
        }

        return (
            <div style={style}>
                filter <input onChange={this.handleChange} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}
const mapDispatchToProps = {
    filtering
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)