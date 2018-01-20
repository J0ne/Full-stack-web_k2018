import React from 'react'
import Sisalto from './Sisalto'
import Otsikko from './Otsikko'
import Yhteensa from './Yhteensa'

const Kurssi = ({ nimi, osat }) => {
    return (
        <div>
            <Otsikko otsikko={nimi}/>
            <Sisalto osat={osat} />
            <Yhteensa osat={osat} />
        </div>

    )
}

export default Kurssi