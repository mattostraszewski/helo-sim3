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
    axios
      .get(`/post/${this.props.match.params.postid}`)
      .then(res => {
        this.props.singlePost(res.data[0])
      })
  }

  delete = () => {
    const { post } = this.props
    axios
      .delete(`/post/delete/${post.post_id}`)
      .then(res => {
        this.props.getPosts(res.data)
        this.props.history.push('/dashboard')
      })
  }

  render() {
    const { post, userId } = this.props
    // console.log(post, 'posttttt')
    return (

      <div>
        {post.title}
        <div>
          {userId === post.author_id ? <button onClick={() => this.delete()}>Delete Post</button> : <div>Can Not Delete Post's That Aren't Yours.</div>}
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    post: state.post,
    userId: state.userId
  }
}

export default connect(mapStateToProps, { singlePost, getPosts })(Post)