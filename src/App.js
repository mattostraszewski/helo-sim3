import React from 'react';
import Nav from './components/nav/Nav'
import routes from './routes'
import './App.css';
import { withRouter } from 'react-router-dom' //withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.

function App(props) {

  return (
    // I am using a ternary to determine if my Nav component should be displayed or not.
    // withRouter allows me to use props.location to determine what path my App is looking at.
    // I am displaying all my routes in the div which gives me access to all my other components via paths???
    <div className="App">
      {/* Nav is displayed on my other components because of this ternary */}
      {props.location.pathname === '/' ? null : <Nav />}
      {routes}
    </div>
  );
}

export default withRouter(App);
