import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import { Header } from './components/header';
import { Search } from './views/search';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Search />
      {/* <Counter /> */}
    </div>
  );
}

export default App;
