import React, { Component } from 'react'
// import Post from '../post/Post'
import { connect } from 'react-redux'
import { getPosts, singlePost } from '../../ducks/actionCreators'
import axios from 'axios'
import './Dashboard.css'
import { Link } from 'react-router-dom'

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
    axios
      .get('/posts')
      .then(res => {
        this.props.getPosts(res.data)
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

  reset = () => {
    this.setState({
      search: ''
    })
  }


  render() {
    const { search, showMyPosts } = this.state
    const { posts } = this.props

    const mappedPosts = posts.map((post) => {
      return (<Link className='postLink' to={`/post/${post.post_id}`} key={post.post_id} >
        <div className='displayedPosts' >
          <h2>{post.title}</h2>
          <h5 className='usernameDisplay' >{post.username}</h5>
          <img src={post.profilepicture} alt='prof' className='profPic' />
        </div>
      </Link >)
    })

    return (

      <div className='mainDash' >

        <div>
          <label>Search:</label>
          <input placeholder='Search Posts' name='search' value={search} onChange={(e) => this.handleChange(e)} />
        </div>

        <div>
          <button onClick={() => this.reset()} >Reset</button>
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

  return {
    userId: state.userId,
    username: state.username,
    profilePicture: state.profilePicture,
    posts: state.posts
  }
}

export default connect(mapStateToProps, { getPosts, singlePost })(Dashboard)




 // return (<Post
      //   key={post.id}
      //   title={post.title}
      //   author={post.author}
      //   picture={post.profilePicture}
      //   content={post.post_content}
      // />)