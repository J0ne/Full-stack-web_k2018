import React from 'react'
import Kurssi from './Kurssi'

const Kurssit = ({ kurssit }) => {
    const nimet = kurssit.map(x => <Kurssi key={x.id} nimi={x.nimi} osat={x.osat} />)
    return (
        <div>{nimet}</div>
    )
}

export default Kurssit