import { SET_USER, GET_POSTS } from './constraints'

const initialState = {
  username: '',
  userId: null,
  profilePicture: "",
  posts: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.payload);
    // return {
    //   username: action.payload.username,
    //   userId: action.payload.Id,
    //   profilePicture: action.payload.profilePicture
    // }
    case GET_POSTS:
      // console.log(action.payload, 'payload reducer')
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}


