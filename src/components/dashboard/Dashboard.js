import React, { Component } from 'react'
// import Post from '../post/Post'
import { connect } from 'react-redux'
import { getPosts } from '../../ducks/actionCreators'
import axios from 'axios'

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      showMyPosts: false
    }
    this.getPosts = this.getPosts.bind(this)
  }

  componentDidMount = () => {
    // const { search, showMyPosts } = this.state
    // const { userId } = this.props
    // this.props.getPosts(search, showMyPosts, userId)
    axios
      .get('/posts')
      .then(res => {
        this.props.getPosts(res.data)
        // console.log(res.data, 'getAllPosts')
      })
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { showMyPosts, search } = this.state
    if (prevState.showMyPosts !== showMyPosts || prevState.search !== search) {
      this.getPosts()
    }

  }

  getPosts() {
    const { search, showMyPosts } = this.state
    // console.log(this.props.userId, 'userId')
    // console.log(search, 'search')
    // console.log(showMyPosts, 'showmyposts')
    axios
      .get(`/posts/${this.props.userId}?userposts=${showMyPosts}&search=${search}`)
      .then(res => {
        this.props.getPosts(res.data)
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  checkAddress = () => {
    const { showMyPosts } = this.state
    // console.log(showMyPosts)
    if (!showMyPosts) {
      this.setState({
        showMyPosts: true
      })
    } else {
      this.setState({
        showMyPosts: false
      })
    }
  }

  // reset = () =




  render() {
    const { search, showMyPosts } = this.state
    const { posts } = this.props
    // console.log(this.props, 'postssss')
    // console.log(showMyPosts, 'showmyposts')

    const mappedPosts = posts.map((post) => {
      // console.log(post, 'mapped element')

      return (<div>
        {post.title}
        {post.username}
        {post.profilePicture}
      </div>)
    })

    // console.log(mappedPosts, 'mappedposts')
    return (

      <div>

        <div>
          <label>Search:</label>
          <input placeholder='Search Posts' name='search' value={search} onChange={(e) => this.handleChange(e)} />
        </div>

        <div>
          {/* <button onClick={(e) => this.search(e)} >Search</button> */}
          <button onClick={(e) => this.reset(e)} >Reset</button>
        </div>

        <div>
          <label>My Posts</label>
          <input type='checkbox'
            name='showMyPosts'
            id='checkAddress'
            checked={showMyPosts}
            onChange={this.checkAddress} />
        </div>

        <div>
          {mappedPosts}
        </div>

      </div>

    )
  }
}

function mapStateToProps(state) {
  console.log(state, 'state props')

  return {
    userId: state.userId,
    username: state.username,
    profilePicture: state.profilePicture,
    posts: state.posts
  }
}

export default connect(mapStateToProps, { getPosts })(Dashboard)




 // return (<Post
      //   key={post.id}
      //   title={post.title}
      //   author={post.author}
      //   picture={post.profilePicture}
      //   content={post.post_content}
      // />)