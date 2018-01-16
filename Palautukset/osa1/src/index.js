import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const Otsikko = () => {
        return (
            <h1>{kurssi}</h1>
        )
    }
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    
    const Osa = (props) => {
        return (<div>
            <p>{props.osa} {props.tehtavia}</p>
        </div>)
    }
    const Sisalto = () => {
        return (
            <div>
            <Osa osa={osa1} tehtavia={tehtavia1} />
            <Osa osa={osa2} tehtavia={tehtavia2} />
            <Osa osa={osa3} tehtavia={tehtavia3} />
            </div>
        )
    }
    const tehtavia3 = 14

    const Yhteensa = () => {
        return (
            <div>
                 <p>yhteensä {tehtavia1 + tehtavia2 + tehtavia3} tehtävää</p>
            </div>
        )
    }

    return (
        <div>
            <Otsikko kurssi={kurssi}/>
            <Sisalto/>
            <Yhteensa />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)