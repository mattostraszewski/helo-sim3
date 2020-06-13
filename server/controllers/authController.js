const bcrypt = require('bcrypt')

module.exports = {
  // Register takes in username and password off the req.body. These values were updated in my Auth.js via input boxes that the user can enter data into which then updates state.
  // I then create a variable in which its value is accessing my DB. I also declare a variable profilePicture that accesses an outside ?API? that generates a random avatar depending on characters entered, these characters are determined by the username that the user enters.
  // I use an SQL file that takes in the username as a parameter to check if the username already exists in my DB. If it exists I send a status 409.
  // Using bcrypt I create a salt and set it to a variable called salt. I then use bcrypt to hash both the entered password and the salt that we just generated.
  // I use another SQL file passing in username, hash, and profilePicture to be saved into my database as a new user.
  // I set up my req.session.user to contain the newly created username, the auto-assigned id, and the profilePicture and send that data back to my frontend!
  register: async (req, res) => {
    const { username, password } = req.body
    const db = req.app.get('db')
    const profilePicture = `https://robohash.org/${username}.png`

    const existingUser = await db.get_user_by_username(username)

    if (existingUser[0]) {
      return res.status(409).send('User already exists')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = await db.register_user([username, hash, profilePicture])
    const user = newUser[0]

    req.session.user = {
      username: user.username,
      id: user.id,
      profilePicture: user.profilepicture
    }

    res.status(200).send(req.session.user)
  },

  // Register takes in username and password off the req.body. These values were updated in my Auth.js via input boxes that the user can enter data into which then updates state.
  // I then create a variable in which its value is accessing my DB.
  // I use an SQL file that takes in the username as a parameter to check if the username already exists in my DB. If the user doesn't exist I send a status 404.
  // A variable named authenticated is created thats holds the value of bcrypt comparing the entered password to the users password that was found via username in my database.
  // If authenticated does not exist i send back a status 403.
  // If it does match I proceed to set my req.session.user to the username, id, and profile obtained from database and send it as my data to the front end. 
  login: async (req, res) => {

    const { username, password } = req.body
    const db = req.app.get('db')

    const existingUser = await db.get_user_by_username(username)

    const user = existingUser[0]

    if (!user) {
      return res.status(404).send('User does not exist')
    }

    const authenticated = bcrypt.compareSync(password, user.password)

    if (!authenticated) {
      return res.status(403).send('Incorrect password')
    }

    req.session.user = {
      username: user.username,
      id: user.id,
      profilePicture: user.profilepicture
    }

    res.status(200).send(req.session.user)
  }
}