import React from 'react'
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.persons)
    this.state = {
      persons: props.persons,
      newPerson: '',
      showAll: true
    }
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: this.state.newPerson,
      // date: new Date().new,
      // important: Math.random() > 0.5,
      id: this.state.persons.length + 1
    }

    const persons = this.state.persons.concat(personObj)

    this.setState({
      persons,
      newPerson: ''
    })
    console.log('Hlö lisätty: ', personObj, persons)
  }

  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newPerson: event.target.value })
  }

  render() {
    const personsToShow = this.state.persons
      // this.state.showAll ?
      //   this.state.persons :
      //   this.state.persons.filter(note => true)

    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    return (
      <div>
        <h1>Puhelinluettelo</h1>
         <form onSubmit={this.addPerson}>
          <input 
            value={this.state.newPerson} 
            onChange={this.handleNoteChange}
          />
          <button type="submit">lisää</button>
        </form>
        <div>
          {/* <button onClick={this.toggleVisible}>
            näytä {label}
          </button> */}
        </div>
        <h2>Numerot</h2>
        <ul>
          {personsToShow.map(person => <Person key={person.id} name={person.name} />)}
        </ul>
       
      </div>
    )
  }
}

export default App