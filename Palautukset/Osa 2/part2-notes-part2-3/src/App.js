import React from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'
//import axios from 'axios'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.persons)
    this.state = {
      persons: [],
      newPerson: '',
      newNumber: '',
      filter: ''
    }
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
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

  componentWillMount() {
    personService.getAll().then( persons =>
      this.setState({ persons })
    )
  }
  addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: this.state.newPerson,
      number: this.state.newNumber,
      id: this.state.persons.length + 1
    }
    const isAlready = this.state.persons.map(x => x.name)
      .indexOf(this.state.newPerson) > -1

    if (isAlready) {
      alert('Henkilö ' + this.state.newPerson + ' on jo listassa')
      return
    }
    const persons = this.state.persons.concat(personObj)

    this.setState({
      persons,
      newPerson: '',
      newNumber: ''
    })

    personService
      .create(personObj)
      .then(response => {
        this.setState({
          persons: this.state.notes.concat(response.data),
          newPerson: ''
        })
      })
  }

  render() {
    const personsToShow = 
      this.state.filter.length === 0 ?
        this.state.persons :
        this.state.persons.filter(p => p.name.toUpperCase().includes(this.state.filter.toUpperCase()))

    //const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    return (
      <div>
        <h1>Puhelinluettelo *</h1>
        <Filter filter={this.state.filter} handler={this.upDateList}/>
        {/* submitAction, newPerson, personHandler, newNumber, numberHandler */}
        <Form submitAction={this.addPerson} newPerson={this.state.newPerson}
          personHandler={this.handleNameChange} newNumber={this.state.newNumber}
          numberHandler={this.handleNumberChange}/>
        <Numbers personsToShow={personsToShow} />
      
      </div>
    )
  }
}

export default App