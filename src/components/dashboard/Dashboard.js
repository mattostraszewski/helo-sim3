import React, { Component } from 'react'
import Post from '../post/Post'
import { connect } from 'react-redux'
import { getPosts } from '../../ducks/actionCreators'
import axios from 'axios'

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      showMyPosts: true,
      posts: []
    }
  }

  componentDidMount = () => {
    const { searchInput, showMyPosts } = this.state
    const { userId } = this.props
    this.props.getPosts(searchInput, showMyPosts, userId)
  }

  getPosts = () => {
    const { searchInput, showMyPosts } = this.state
    axios
      .get(`/posts/${this.props.userId}?userposts=${showMyPosts}&search=${searchInput}`)
      .then(res => {
        this.props.getPosts(res.data)
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // handleCheckbox = e => {
  //   this.setState({
  //     userposts: e.target.checked
  //   })
  //   setTimeout(() => this.getPosts(), 0)
  // }

  checkAddress = () => {
    var chkBox = document.getElementById('checkAddress')
    if (chkBox.checked) {
      this.setState({
        showMyPosts: true
      })
    } else {
      this.setState({
        showMyPosts: false
      })
    }
  }



  render() {
    const { searchInput, showMyPosts, posts } = this.state
    // console.log(this.props)

    const mappedPosts = posts.map((post) => {
      return (<Post
        key={post.id}
        title={post.title}
        author={post.author}
        picture={post.profilePicture}
      />)
    })


    return (

      <div>

        <div>
          <label>Search:</label>
          <input placeholder='Search Posts' name='searchInput' value={searchInput} onChange={(e) => this.handleChange(e)} />
        </div>

        <div>
          <button onClick={(e) => this.search(e)} >Search</button>
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
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps, { getPosts })(Dashboard)