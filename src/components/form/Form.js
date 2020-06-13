import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import { createPost } from '../../ducks/actionCreators'

class Form extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      image: '',
      content: ''
    }
  }

  handleChanger = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createPost = () => {
    const { userId } = this.props
    const { title, image, content } = this.state
    const body = {
      title: title,
      image: image,
      content: content
    }
    axios
      .post(`/new/${userId}`, body)
      .then(res => {
        console.log(res.data)
        this.props.createPost(res.data)
        this.props.history.push('/dashboard')
      })
  }

  render() {

    return (

      <div>
        <div className='newPostCard'>
          <div className='newPostH1'>
            <h1>New Post</h1>
          </div>

          <div className='titleInput'>
            <label>Title:</label>
            <input name='title' onChange={(e) => this.handleChanger(e)} />
          </div>

          <div className='imageHolder'>
            {/* <img src={} alt='post' className='newPostImg' /> */}
          </div>

          <div className='newPostInput'>
            <label>Image URL:</label>
            <input name='image' onChange={(e) => this.handleChanger(e)} />
          </div>

          <div className='newPostContent'>
            <label>Content:</label>
            <input name='content' onChange={(e) => this.handleChanger(e)} />
          </div>

          <div className=''>
            <button onClick={() => this.createPost()}>Post</button>
          </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps, { createPost })(Form)