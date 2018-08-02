import React from 'react';
import './App.css';

//https://reactjs.org/docs/forms.html

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.props.onSubmit && typeof this.props.onSubmit === "function") {
      this.props.onSubmit(this.state.value)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input className="charName" type="text" value={this.state.value} onChange={this.handleChange}/>
        </label> 
        <input type="submit" value="Submit"/> 
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(value) {
    let searchInput = value //get the value of charName input here
    let requestUrl = 'https://swapi.co/api/people/?search='
    fetch(requestUrl + searchInput)
      //make the results json
      .then(response => response.json())
        // map over data from the json and put it into a variable
      .then(data=> {
        let resp = data.results.map((chara) => {
        return(
          <div className="mt1 ba w-25 center" key={chara.name}>
            <p>Name: {chara.name}</p>
            <p>Gender: {chara.gender}</p>
            <p>Height: {chara.height}cm</p>
            <p>Weight: {chara.mass}kg</p>
            <p>Birth Yeah: {chara.birth_year}</p>
            <p>Number of movies: {chara.films.length}</p>
          </div>
        )
      })
      //set the state of the app with the varibale created
      this.setState({ characters: resp });
    })     
  }

  render() {
    //render the state
    return (
      <div className="App tc mt7">
        <h1>Star Wars Character Search</h1>
        <SearchForm onSubmit={this.handleSubmit}/>
        {this.state.characters}
      </div>
    )
  }
}


export default App;
