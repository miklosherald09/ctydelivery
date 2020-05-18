import { AUTH_MODAL_VISIBLE, AUTH_SUCCESS, SET_CONFIRMATION } from '../constants'

const initialState = {
  authModalVisible: false,
  authMethod: '',
  userInfo: '',
  confirmation: false
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case AUTH_MODAL_VISIBLE: {
      return {
        ...state,
        authModalVisible: action.visible
      }
    }

    case AUTH_SUCCESS: {
      return {
        ...state,
        authMethod: action.authMethod,
        userInfo: action.userInfo
      }
    }

    case SET_CONFIRMATION: {
      return {
        ...state,
        confirmation: action.confirmation
      }
    }

    default:
      return state;
  }
}

export default authReducer;