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
      .then((res) => {
        this.setState({
          usernameInput: res.data.usernameInput,
          passwordInput: ''
        })
        this.props.history.push('/dashboard')
      })
  }

  login = (e) => {
    e.preventDefault();
    const { usernameInput, passwordInput } = this.state
    axios
      .post('/auth/login', usernameInput, passwordInput)
      .then((res) => {
        this.setState({
          usernameInput: res.data.usernameInput,
          passwordInput: ''
        })
        this.props.history.push('/dashboard')
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
          <button>Login</button>
          <button onClick={(e) => this.register(e)}>Register</button>
        </div>
      </div>


    )
  }
}