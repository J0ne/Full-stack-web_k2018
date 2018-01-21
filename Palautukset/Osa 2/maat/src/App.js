import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      // filter: '',
      selectedCountry: null
    }
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  upDateList = (event) => {
    const filterString = event.target.value.toUpperCase();
    this.setState({ selectedCountry: null })
    let resultCount = this.state.countries.filter(p => p.name.toUpperCase().includes(filterString)).length;

    if (event.target.value.length === 0) {
      this.infoText = '';
      this.countriesToShow = []
      return;
    };
    if (resultCount > 10) {
      this.infoText = 'Too many matches (' + resultCount + '), specify another filter';
      this.countriesToShow = [];
      return;
    }
    if(resultCount > 1){
      this.infoText = '';
      this.countriesToShow = this.state.countries.filter(p => p.name.toUpperCase().includes(filterString));
      return;
    }
    // resultCount = 1
    const tmp = this.state.countries.find(p => p.name.toUpperCase().includes(filterString))
    if(tmp === undefined){
      this.countriesToShow = [];
      return;
    }
    this.setState({ selectedCountry: {
      name: tmp.name,
      flag: tmp.flag
    }});
    return;

  }

  componentWillMount() {
    console.log('will mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        this.setState({ countries: response.data })
      })
  }
  infoText = '';

  countriesToShow = [];
  countryFilter = () => {
    console.log(this.state.filter.length);
    
  }
  render() {
    //const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'
    let element = null;
    if (this.state.selectedCountry != null) {
      element = <div><h3>{this.state.selectedCountry.name}</h3>
        <img src={this.state.selectedCountry.flag} alt="Loading image..." width="30%"></img> </div>
    } else {
      element = <ul >
        {this.countriesToShow.map(c => <li key={c.name}>{c.name}</li>)}
      </ul>
    }
    return (
      <div>
        <div>
          Find country: <input
            value={this.state.filter}
            onChange={this.upDateList}
          />
        </div>
        <label>{this.infoText}</label>
        <h1>Country</h1>
       {element}
      </div>
    )
  }
}

export default App