// import services from './services'
import { SET_USER } from './constraints'

export function setUser(userId, username, profilePicture) {
  return {
    type: SET_USER,
    payload: {
      userId: userId,
      username: username,
      profilePicture: profilePicture
    }
  }
}