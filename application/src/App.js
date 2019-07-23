import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';

function App() {
  return (
      <Router>
          <Route exact path="/" component={Home} />
          <Route path="/chat" component={Chat} />
      </Router>
  );
}

export default App;
