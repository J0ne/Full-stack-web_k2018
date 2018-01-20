import React from 'react'

const Osa = ({ nimi, tehtavia, id }) => {
    return (
        <div key={id}>{nimi} {tehtavia}</div>
    )
}
export default Osa