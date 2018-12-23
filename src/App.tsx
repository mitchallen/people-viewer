import React, { Component } from 'react';
import './App.css';

import { PeopleCard } from './components/PeopleCard';

class App extends Component {

  render() {
    return (
      <div className="App" style={{ width: '100%', margin: '0 auto'}}>
        <PeopleCard />
      </div>
    );
  }
}

export default App;
