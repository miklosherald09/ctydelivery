import { 
  UPDATE_ADDRESS_INPUT,
  UPDATE_MOBILE_INPUT,
  SET_USER_INFO,
  UPDATE_USER_INFO_DIALOG_VISIBLE,
  SAVE_USER_INFO_SUCCESS,
  INIT_USER_INFO_FIREBASE_SUCCESS } from '../constants'

const initialState = {
  userInfo: {
    uid: null,
  },
  userInfoFirebase: {
    uid: null,
    address: null,
    phoneNumber: null
  },
  input: {},
  updateUserInfoDialogVisible: false,
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {

    case UPDATE_ADDRESS_INPUT: {
      return {
        ...state,
        input: {
          ...state.input,
          address: action.text
        }
      }
    }

    case UPDATE_MOBILE_INPUT: {
      return {
        ...state,
        input: {
          ...state.input,
          phoneNumber: action.text
        }
      }
    }

    case SET_USER_INFO: {
      return {
        ...state,
        userInfo: action.userInfo
      }
    }
    
    case UPDATE_USER_INFO_DIALOG_VISIBLE: {
      return {
        ...state,
        updateUserInfoDialogVisible: action.visible
      }
    }
    
    case SAVE_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfoFirebase: {
          ...state.userInfoFirebase,
          address: action.userInfo.address,
          phoneNumber: action.userInfo.phoneNumber 
        },
        updateUserInfoDialogVisible: false
      }
    }

    case INIT_USER_INFO_FIREBASE_SUCCESS: {
      
      // state.userInfo.address = action.userInfo.address,
      // state.userInfo.phoneNumber = action.userInfo.phoneNumber

      return {
        ...state,
        userInfoFirebase: {
          ...state.userInfoFirebase,
          address: action.userInfo.address,
          phoneNumber: action.userInfo.phoneNumber
        },
        input: {
          ...state,
          address: action.userInfo.address,
          phoneNumber: action.userInfo.phoneNumber
        }
      }
    }

    default:
      return state;
  }
}

export default userReducer