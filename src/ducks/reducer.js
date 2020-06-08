import { SET_USER } from './constraints'

const initialState = {
  username: '',
  userId: null,
  profilePicture: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    // return {
    //   username: action.payload.username,
    //   userId: action.payload.Id,
    //   profilePicture: action.payload.profilePicture
    // }
    default:
      return state;
  }
}


