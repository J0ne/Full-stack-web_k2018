import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const Otsikko = () => {
        return (
            <h1>{kurssi}</h1>
        )
    }
      const osa1 = {
          nimi: 'Reactin perusteet',
          tehtavia: 10
      }
      const osa2 = {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7
      }
      const osa3 = {
          nimi: 'Komponenttien tila',
          tehtavia: 14
      }
    console.log(osa1,osa2,osa3);
    const Osa = (props) => {
        return (<div>
            <p>{props.osa} {props.tehtavia}</p>
        </div>)
    }
    const Sisalto = () => {
        return (
            <div>
            <Osa osa={osa1.nimi} tehtavia={osa1.tehtavia} />
            <Osa osa={osa2.nimi} tehtavia={osa2.tehtavia} />
            <Osa osa={osa3.nimi} tehtavia={osa3.tehtavia} />
            </div>
        )
    }

    const Yhteensa = () => {
        return (
            <div>
                 <p>yhteensä {osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} tehtävää</p>
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