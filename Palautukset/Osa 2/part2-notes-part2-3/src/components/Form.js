import React from 'react'

const Form = ({ submitAction, newPerson, personHandler, newNumber, numberHandler }) => {
    return (
        <form onSubmit={submitAction}>
            <div>
                Nimi: <input
                    value={newPerson}
                    onChange={personHandler}
                />
            </div>
            <div>
                Numero: <input
                    value={newNumber}
                    onChange={numberHandler}
                />
            </div>
            <button type="submit">lisää</button>
        </form>
    )
}
export default Form