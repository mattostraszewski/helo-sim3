import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import { createPost } from '../../ducks/actionCreators'
import './Form.css'

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
    const { image } = this.state
    return (

      <div className='position'>
        <div className='newPostCard'>
          <div className='newPostH1'>
            <h1>New Post</h1>
          </div>

          <div className='titleInput'>
            <label>Title:</label>
            <input className='title' name='title' onChange={(e) => this.handleChanger(e)} />
          </div>

          <div className='imageHolder'>
            {!image ? <img src='https://tc-itservices.com/wp-content/uploads/2018/07/lenovo-camera1-300x225.png' alt='post' className='newPostImages' />
              : <img src={image} alt='post' className='newPostImages' />}
          </div>

          <div className='newPostInput'>
            <label>Image URL:</label>
            <input className='imagee' name='image' onChange={(e) => this.handleChanger(e)} />
          </div>

          <div className='newPostContent'>
            <label>Content:</label>
            <input className='content' name='content' onChange={(e) => this.handleChanger(e)} />
          </div>

          <div className='notSure' >
            <div className='buttonCreator'>
              <button onClick={() => this.createPost()} className='createButton'>Post</button>
            </div>
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