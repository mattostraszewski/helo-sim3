import React from 'react';
import Nav from './components/nav/Nav'
// import Auth from './components/auth/Auth'
// import Dashboard from './components/dashboard/Dashboard'
// import Form from './components/form/Form'
// import Post from './components/post/Post'
import routes from './routes'
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      {/* <Auth />
      <Dashboard />
      <Form />
      <Post /> */}
      {routes}
    </div>
  );
}

export default App;
