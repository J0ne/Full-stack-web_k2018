import React from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
        return (
                <td>{props.arvo}</td>
        )
    }
const Statistics = ({tilat, keskiarvo, positiivisia}) => {
    if(tilat.kaikki() > 0){
        return (
            <div>
                <h2>Statistiikka:</h2>
                <table>
                    <thead>
                        <tr>
                        <th>Hyvät</th><th>Neutraalit</th><th>Huonot</th><th>Keskiarvo</th><th>Positiivisia (%)</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <Statistic nimi={'hyvä'} arvo={tilat.hyvät} />
                            <Statistic nimi={'neutraali'} arvo={tilat.neutraalit} />
                            <Statistic nimi={'huono'} arvo={tilat.huonot} />
                            <Statistic nimi={'keskiarvo'} arvo={keskiarvo.toFixed(2)} />
                            <Statistic nimi={'positiivisia'} arvo={positiivisia.toFixed(2)} merkki={'%'} />
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }else{
        return(
            <div>
                <p>Yhtään palautetta ei ole annettu</p>
            </div>
        )
    }

    }

    const  Btn = ({ handler, text }) => {
        return (
            <button onClick={handler} type='button'>{text}</button>
        )
    }
    const ButtonGroup = ({ handler }) => {
        return (
            <div>
                <Btn handler={() => { handler('hyvä') }} text={'hyvä'} />
                <Btn handler={() => { handler('neutraali') }} text={'neutraali'} />
                <Btn handler={() => { handler('huono') }} text={'huono'} />
            </div>
        )
    }
class App extends React.Component {
    constructor() {
            super()
            this.state = {
                hyvät: 0,
                huonot: 0,
                neutraalit: 0,
                kaikki: () => {
                    return this.state.hyvät + this.state.huonot + this.state.neutraalit;
                }
            }
    }
    
    handleClick = (type) => {
        switch (type) {
            case 'hyvä':
                this.setState({ hyvät: this.state.hyvät + 1 })
                    break;
            case 'neutraali':
                this.setState({
                        neutraalit: this.state.neutraalit + 1
                    }) 
                    break;
            case 'huono':
                this.setState({
                        huonot: this.state.huonot + 1
                    })
                    break;
            default:     
                   break;
            }
    }
    keskiarvo = () => {
        let yhteensä = this.state.hyvät + this.state.huonot + this.state.neutraalit;
        if (yhteensä === 0) {
            return 0;
        };
        return (this.state.hyvät + this.state.huonot) / yhteensä;
    }
    positiivisia = () =>{
        let yhteensä = this.state.hyvät + this.state.huonot + this.state.neutraalit;
        if (yhteensä === 0) {
            return 0;
        };
        return this.state.hyvät/ yhteensä *100;
    }
    render()
    {
        return (

        <div>
            <h2>Anna palautetta</h2>
            <ButtonGroup handler={this.handleClick}/>
            <Statistics tilat={this.state} keskiarvo={this.keskiarvo()} positiivisia={this.positiivisia()} kaikki={this.state.kaikki()}/>    
        </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
