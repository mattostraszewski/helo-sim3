import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from './components/auth/Auth'
import Dashboard from './components/dashboard/Dashboard'
import Post from './components/post/Post'
import Form from './components/form/Form'

export default (
  // Here I am using Switch to look over all my routes and render the route in which its Path matches the request?
  // An exact path means my URL has to be exactly what is set as my path and that my URL can not just contain it but match exactly. 
  // I am giving each route a component in which it links too.
  <Switch>
    <Route exact path='/' component={Auth} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/post/:postid' component={Post} />
    <Route path='/new' component={Form} />
  </Switch>
)
