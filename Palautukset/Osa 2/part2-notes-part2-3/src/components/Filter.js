import React from 'react'

const Filter = ({filter, handler}) => {
    return (
        <div>
            Rajaa näytettäviä: <input
                value={filter}
                onChange={handler}
            />        
            <br />
        </div>
    )
}
export default Filter