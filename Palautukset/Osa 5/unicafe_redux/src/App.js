import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'
import { createStore } from 'redux'


const store = createStore(counterReducer)

let state = store.getState()
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
  state = Object.assign({}, storeNow)
})
const getAll = () =>{
  return state.good + state.ok + state.bad;
}
const resetStatistics = () => {
  store.dispatch({type: 'ZERO'})
}
const Statistiikka = () => {
  const palautteita = getAll()

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }


  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{state.average.toFixed(2)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{state.oks.toFixed(2)} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={resetStatistics}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (type) => () => {
    console.log(type)
    store.dispatch({type});
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
// ReactDOM.render(<App />, document.getElementById('root'));

export default App