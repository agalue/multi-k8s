import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    try {
      const { data } = await axios.get('/api/values/current');
      if (data) this.setState({ values: data });  
    } catch (error) {
      console.error(error);
    }
  }

  async fetchIndexes() {
    try {
      const { data } = await axios.get('/api/values/all');
      if (data) this.setState({ seenIndexes: data });  
    } catch (error) {
      console.error(error);
    }
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({number}) => number).join(', ');
  }

  renderValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  handleChangeValue = (event) => {
    this.setState({ index: event.target.value });
  };

  handleSubmit = async(event) => {
    event.preventDefault();
    try {
      await axios.post('/api/values', {
        index: this.state.index
      });
      this.setState({ index: '' });
      this.fetchValues();
      this.fetchIndexes();  
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { index } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label>Enter your Index:</label>
          <input
            value={ index }
            onChange={ this.handleChangeValue }
          />
          <button>Submit</button>
        </form>
        <h3>Indexes I have seen:</h3>
        { this.renderSeenIndexes() }
        <h3>Calculated values:</h3>
        { this.renderValues() }
      </div>
    );
  }
}

export default Fib;
