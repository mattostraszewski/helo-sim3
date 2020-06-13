module.exports = {
  getPosts: async (req, res) => {
    const { userposts, search } = req.query
    const { userId } = req.params
    const db = req.app.get('db')
    const posts = await db.get_posts()
    const allUserPosts = await db.userposts(userId)

    console.log(userposts, search, 'line8')

    if (userposts == 'false' && !search) {
      console.log('hit', 'line11')
      return res.status(200).send(posts)
    }
    else if (userposts == 'false' && search) {
      console.log('hit', 'line16')
      const results = await db.contains_search_and_isnt_author(userId, search)
      return res.status(200).send(results)
    }
    else if (userposts && search) {
      console.log('hit', 'line21')
      const results = await db.title_contains_search(search)
      return res.status(200).send(results)
    }
    else {
      return res.status(200).send(allUserPosts)
    }
  },


  getAllPosts: async (req, res) => {
    const db = req.app.get('db')
    const allPosts = await db.get_posts()
    return res.status(200).send(allPosts)
  },


  selectPost: async (req, res) => {
    const { post_id } = req.params
    const db = req.app.get('db')
    const singlePost = await db.get_single_post(post_id)
    return res.status(200).send(singlePost)
  },


  createPost: async (req, res) => {
    const { userId } = req.params
    const { title, image, content } = req.body
    const db = req.app.get('db')

    const newPost = await db.create_post(userId, title, content, image)
    return res.status(200).send(newPost)
  },


  deletePost: async (req, res) => {
    console.log('hitttt')
    const { post_id } = req.params
    const db = req.app.get('db')

    const updatedPost = await db.delete_post(post_id)
    return res.status(200).send(updatedPost)
  }

}