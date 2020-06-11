module.exports = {
  getPosts: async (req, res) => {
    const { userposts, search } = req.query
    const { userId } = req.params
    const db = req.app.get('db')
    const posts = await db.get_posts()
    const userPosts = await db.userposts(userId)
    // console.log(db.get_posts, 'line7')

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
      return res.status(200).send(userPosts)
    }
  },

  getAllPosts: async (req, res) => {
    const db = req.app.get('db')
    const allPosts = await db.get_all_posts()
    return res.status(200).send(allPosts)
  }
}