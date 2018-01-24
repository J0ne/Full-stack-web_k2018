import React from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
//import axios from 'axios'
import personService from './services/persons'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      persons: [],
      newPerson: '',
      newNumber: '',
      filter: '',
      infoText: null
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

  generateId(){
    let id = Math.max.apply(Math, this.state.persons.map( o => o.id )) +1;
    console.log(id);
    return id;
  }
  addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: this.state.newPerson,
      number: this.state.newNumber
    }
    const personIndex = this.state.persons.map(x => x.name)
      .indexOf(this.state.newPerson);

    if (personIndex > -1) {
      let personToUpdate = this.state.persons[personIndex];

      let result = window.confirm(personToUpdate.name + ' on jo luettelossa. Korvataanko vanha numero uudella?');
      if(!result) {
        return;
      }else{
        personService.update(personToUpdate.id, personObj)
        .then(persons => {
          this.setState({
            persons: persons,
            newPerson: '',
            newNumber: ''
          });
          this.showInfo('Henkilön ' + personObj.name + ' numero päivitetty!');
        });
        return;
      }
    }
    const persons = this.state.persons.concat(personObj)

    this.setState({
      persons,
      newPerson: '',
      newNumber: ''
    })
    personObj.id = this.generateId();
    personService
      .create(personObj)
      .then(persons => {
        this.setState({
          persons: persons,
          newPerson: '',
          newNumber: ''
        })
        this.showInfo('Henkilö ' + personObj.name + ' lisätty!');
      })
  }
  deletePerson = (id) => {
    return () => 
    {
      let person = this.state.persons
        .find(p => p.id === id).name;
      let result = window.confirm("Poistetaanko " + person);

      if (!result) { 
        // ei poisteta
        return
       }
      personService.deletePerson(id).then(persons =>
        {
          this.setState({ persons });
           this.showInfo(person +' poistettu!');
        }
      )
    }

  }

  showInfo(message){
    this.setState({
      infoText: message
    })
    setTimeout(() => {
      this.setState({ infoText: null })
    }, 4000)
  }

  render() {
    const personsToShow = 
      this.state.filter.length === 0 ?
        this.state.persons :
        this.state.persons.filter(p => p.name.toUpperCase().includes(this.state.filter.toUpperCase()))
    //const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    return (
      <div className="container">
        <Notification message={this.state.infoText} />
        <h1>Puhelinluettelo</h1>
        <Filter filter={this.state.filter} handler={this.upDateList}/>
        {/* submitAction, newPerson, personHandler, newNumber, numberHandler */}
        <Form submitAction={this.addPerson} newPerson={this.state.newPerson}
          personHandler={this.handleNameChange} newNumber={this.state.newNumber}
          numberHandler={this.handleNumberChange}/>
        <Numbers persons={personsToShow} deletePerson={this.deletePerson}/>
      
      </div>
    )
  }
}

export default App