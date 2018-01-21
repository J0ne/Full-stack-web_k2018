import React from 'react'
import Person from './Person'

const Numbers = ({personsToShow}) => {
    return (
        <div>
            <h2>Numerot</h2>
            <ul>
                {personsToShow.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
            </ul>
        </div>


    )
}
export default Numbers