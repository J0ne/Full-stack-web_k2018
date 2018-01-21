import React from 'react'
import Osa from './Osa'

const Sisalto = ({ osat }) => {
  const nimet = osat.map(x => 
    <Osa key={x.id} nimi={x.nimi} tehtavia={x.tehtavia}/>
    )
  return (
    <div>{nimet}</div>
  )
}

export default Sisalto