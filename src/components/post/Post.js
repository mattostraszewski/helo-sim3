import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { singlePost } from '../../ducks/actionCreators'

class Post extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  componentDidMount() {
    axios
      .get(`/post/${this.props.match.params.postid}`)
      .then(res => {
        this.props.singlePost(res.data)
      })
  }

  render() {
    const { post } = this.props
    const mappedPost = post.map((e, i) => {
      return (
        <div key={i}>
          {e.title}
          {e.post_content}
          {e.username}
          {e.image}
          <img src={e.profilepicture} alt='profile avatar' />
          <button onClick={() => this.delete()}>Delete Post</button>
        </div>
      )
    })
    return (

      <div>
        {mappedPost}
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    post: state.post
  }
}

export default connect(mapStateToProps, { singlePost })(Post)