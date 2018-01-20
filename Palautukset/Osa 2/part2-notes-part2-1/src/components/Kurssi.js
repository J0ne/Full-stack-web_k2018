import React from 'react'
import Sisalto from './Sisalto'
import Otsikko from './Otsikko'
import Yhteensa from './Yhteensa'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko otsikko={kurssi.nimi}/>
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>

    )
}

export default Kurssi