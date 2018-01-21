import React from 'react'
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.persons)
    this.state = {
      persons: props.persons,
      newPerson: '',
      newNumber: '',
      filter: ''
    }
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: this.state.newPerson,
      number: this.state.newNumber,
      // date: new Date().new,
      // important: Math.random() > 0.5,
      id: this.state.persons.length + 1
    }
    const isAlready = this.state.persons.map( x=> x.name)
      .indexOf(this.state.newPerson) > -1

    if(isAlready) { 
      alert('Henkilö ' +this.state.newPerson + ' on jo listassa')
      return 
    }
    const persons = this.state.persons.concat(personObj)

    this.setState({
      persons,
      newPerson: '',
      newNumber: ''
    })
    console.log('Hlö lisätty: ', personObj, persons)
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newPerson: event.target.value })
  }
  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }
  upDateList = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  render() {
    const personsToShow = 
      this.state.filter.length == 0 ?
        this.state.persons :
        this.state.persons.filter(p => p.name.toUpperCase().includes(this.state.filter.toUpperCase()))

    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
          Rajaa näytettäviä: <input
            value={this.state.filter}
            onChange={this.upDateList}
          />
        </div>
        <br/>
         <form onSubmit={this.addPerson}>
         <div>
            Nimi: <input
              value={this.state.newPerson}
              onChange={this.handleNameChange}
            />
         </div>
         <div>
            Numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
         </div>
          <button type="submit">lisää</button>
        </form>
        <div>
          {/* <button onClick={this.toggleVisible}>
            näytä {label}
          </button> */}
        </div>
        <h2>Numerot</h2>
        <ul>
          {personsToShow.map(person => <Person key={person.id} name={person.name} number={person.number} />)}
        </ul>
       
      </div>
    )
  }
}

export default App