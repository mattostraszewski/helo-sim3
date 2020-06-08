import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from './components/auth/Auth'
import Dashboard from './components/dashboard/Dashboard'
import Post from './components/post/Post'
import Form from './components/form/Form'

export default (
  <Switch>
    <Route exact path='/' component={Auth} />
    {/* <Route path='/dashboard' component={Dashboard} />
    <Route path='/post/:postid' component={Post} />
    <Route path='/new' component={Form} /> */}
  </Switch>
)
