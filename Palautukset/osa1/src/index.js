import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const Otsikko = (props) => {
        return (
            <h1>{props.kurssi}</h1>
        )
    }
    const osat = [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10,
        },
        {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
        },
        {
            nimi: 'Komponenttien tila',
            tehtavia: 14
        }
    ]
    
    console.log(osat);
    const Osa = (props) => {
        return (<div>
            <p>{props.osa} {props.tehtavia}</p>
        </div>)
    }
    const Sisalto = (props) => {
        console.log(props)
        return (
            <div>
            <Osa osa={props.osat[0].nimi} tehtavia={props.osat[0].tehtavia} />
            <Osa osa={props.osat[1].nimi} tehtavia={props.osat[1].tehtavia} />
            <Osa osa={props.osat[2].nimi} tehtavia={props.osat[2].tehtavia} />
            </div>
        )
    }

    const Yhteensa = () => {
        return (
            <div>
                 <p>yhteensä {osat[0].tehtavia + osat[1].tehtavia + osat[2].tehtavia} tehtävää</p>
            </div>
        )
    }

    return (
        <div>
            <Otsikko kurssi={kurssi}/>
            <Sisalto osat={osat}/>
            <Yhteensa osat={osat} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)