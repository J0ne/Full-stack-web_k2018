import React from 'react'

const Yhteensa = ({ osat }) => {

    const tehtavat = (summa, tehtava) => summa + tehtava.tehtavia
    const yhteensa = osat.reduce(tehtavat, 0)

    return (
        <p>Tehtäviä yhteensä: {yhteensa}</p>
    )
}
export default Yhteensa