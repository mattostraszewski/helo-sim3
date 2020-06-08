import React, { Component } from 'react'
import axios from 'axios';


export default class Auth extends Component {
  constructor() {
    super();

    this.state = {
      usernameInput: '',
      passwordInput: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  register = (e) => {
    e.preventDefault();
    const { usernameInput, passwordInput } = this.state
    const body = {
      username: usernameInput,
      password: passwordInput
    }
    axios
      .post('/auth/register', body)
      .then(() => {
        this.props.history.push('/dashboard')
      }).catch((err) => {
        alert(err.response.data)
      })
  }

  login = (e) => {
    e.preventDefault();
    const { usernameInput, passwordInput } = this.state
    const body = {
      username: usernameInput,
      password: passwordInput
    }
    axios
      .post('/auth/login', body)
      .then(() => {
        this.props.history.push('/dashboard')
      }).catch((err) => {
        alert(err.response.data)
      })
  }


  render() {
    const { usernameInput, passwordInput } = this.state
    return (
      <div>

        <div>
          <label>Username:</label>
          <input name='usernameInput' value={usernameInput} onChange={(e) => this.handleChange(e)} placeholder='Enter Username' />

          <label>Password:</label>
          <input name='passwordInput' value={passwordInput} onChange={(e) => this.handleChange(e)} placeholder='Enter Password' />
        </div>

        <div>
          <button onClick={(e) => this.login(e)}>Login</button>
          <button onClick={(e) => this.register(e)}>Register</button>
        </div>
      </div>


    )
  }
}