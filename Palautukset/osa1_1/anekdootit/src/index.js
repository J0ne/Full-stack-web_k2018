import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: this.props.anecdotes.map(() => 0)
        }
    }

    annaAnekdootti = (props) =>{
        const max = this.props.anecdotes.length;
        let ind  = Math.floor((Math.random() * max))
        this.setState({ selected: ind});
    }
    annaAani = () => {
        let index = this.state.selected;
        let votes = this.state.votes;
        votes[index]++;
        this.setState({votes});
    }
    annaTilanne = () => {
        let index = this.state.selected;
        let votes = this.state.votes;
        return votes[index];
    }
    render() {
        return (
            <div>
                <h3>{this.props.anecdotes[this.state.selected]}</h3>
                <p>has {this.annaTilanne()} votes</p>
                <div>
                    <button onClick={this.annaAani}>Vote!</button> 
                    <button onClick={this.annaAnekdootti} >Next anecdote!</button></div>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)