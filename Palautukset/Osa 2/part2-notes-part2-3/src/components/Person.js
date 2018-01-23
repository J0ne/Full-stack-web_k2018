import React from 'react'

const Person = ({ id, name, number, deletePerson }) => {
  return (
    <tr>
      <td> {name}:</td><td>{number}</td><td> <button key={id} onClick={deletePerson(id)}>poista</button></td>   
    </tr>
  )
}

export default Person