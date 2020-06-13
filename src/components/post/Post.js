import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { singlePost, getPosts } from '../../ducks/actionCreators'

class Post extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  componentDidMount() {
    axios
      .get(`/post/${this.props.match.params.post_id}`)
      .then(res => {
        this.props.singlePost(res.data)
      })
  }

  delete = () => {
    const { post } = this.props
    console.log(post.post_id, 'post id')
    axios
      .delete(`/post/delete/${post.post_id}`)
      .then(res => {
        this.props.getPosts(res.data)
        this.props.history.push('/dashboard')
      })
  }

  render() {
    const { post } = this.props
    console.log(post, 'post')
    const mappedPost = post.map((e, i) => {
      return (
        <div key={i}>
          {e.title}
          {e.post_content}
          {e.username}
          {e.image}
          <img src={e.profilepicture} alt='profile avatar' />
        </div>
      )
    })
    return (

      <div>
        {mappedPost}
        <div>
          <button onClick={() => this.delete()}>Delete Post</button>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  console.log(state.post, 'state post')
  return {
    post: state.post,
    userId: state.userId
  }
}

export default connect(mapStateToProps, { singlePost, getPosts })(Post)