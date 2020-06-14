import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { singlePost, getPosts } from '../../ducks/actionCreators'

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount = () => {
    console.log(this.props.match.params, 'hit')
    axios
      .get(`/post/${this.props.match.params.postid}`)
      .then(res => {
        console.log(res.data)
        this.props.singlePost(res.data[0])
      })
  }

  delete = () => {
    const { post } = this.props
    console.log(post, 'post id')
    axios
      .delete(`/post/delete/${post.post_id}`)
      .then(res => {
        this.props.getPosts(res.data)
        this.props.history.push('/dashboard')
      })
  }

  render() {
    const { post } = this.props

    return (

      <div>
        {post.title}
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