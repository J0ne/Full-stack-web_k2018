import React from 'react'
import { filtering } from '../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
        // input-kentän arvo muuttujassa event.target.value
        // console.log(event.target.value)
        this.props.store.dispatch(filtering(event.target.value))
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

export default Filter