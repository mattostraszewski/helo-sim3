import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  render() {
    console.log(this.props)
    return (

      <div>
        <Link to='/dashboard'>
          <button>Home</button>
        </Link>

        <Link to='/new'>
          <button>New Post</button>
        </Link>

        <Link to='/'>
          <button>Logout</button>
        </Link>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.username,
    profilePicture: state.profilePicture
  }
}

export default connect(mapStateToProps)(Nav)