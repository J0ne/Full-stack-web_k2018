import React from 'react'
import Person from './Person'

const Numbers = ({ personsToShow, deletePerson}) => {
    console.log(personsToShow)
    return (
        <div>
            <h2>Numerot</h2>
            <table>
                <tbody>
                {personsToShow.map(person => 
                    <Person key={person.id} name={person.name} number={person.number}
                        id={person.id} deletePerson={deletePerson} />)}
                </tbody>
            </table>
        </div>


    )
}
export default Numbers