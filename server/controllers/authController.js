const bcrypt = require('bcrypt')

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body
    const db = req.app.get('db')

    const existingUser = await db.get_user_by_username(username)

    if (existingUser[0]) {
      return res.status(409).send('User already exists')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = await db.register_user([username, hash])
    const user = newUser[0]

    req.session.user = {
      username: user.username,
      id: user.id
    }

    res.status(200).send(user)
  },

  login: async (req, res) => {
    if (req.session.attemptCount >= 5) {
      req.session.attemptCount++
      return res.status(403).send('Too many attempts')
    }

    const { usernameInput, passwordInput } = req.body
    const db = req.app.get('db')

    const existingUser = await db.get_user_by_username(usernameInput)

    if (existingUser[0]) {
      return res.status(404).send('User does not exist')
    }

    const authenticated = bcrypt.compareSync(password, existingUser[0].hash)

    if (!authenticated) {
      if (!req.session.attemptCount) {
        req.session.attemptCount = 1
      } else {
        req.session.attemptCount++
      }
      return res.status(403).send('Incorrect password')
    }

    delete existingUser[0].hash

    eq.session.user = existingUser[0]

    res.status(200).send(req.session)
  }
}