import { SET_USER } from '../types';

const initialState = {

}

function userReducer(state = initialState, action) {
  switch (action.type) {

    case SET_USER:

      return action.value

    default: return state
  }
}

export default userReducer;