import { 
  SEARCH_MODAL_VISIBLE,
  UPDATE_MOBILE_INPUT,
  ADD_TO_CART,
  PUNCH_ITEM,
  SAVE_CART_ITEMS_SUCCESS,
  UPDATE_USER_INFO_DIALOG_VISIBLE,
  DELIVERY_STATUS_LINED_UP,
  CLEAR_CART_SUCCESS,
  UPDATE_ADDRESS_INPUT,
  SAVE_ADDRESS_SUCCESS,
  SAVE_USER_INFO_SUCCESS,
  TOAST_MESSAGE_USER_INFO_SAVED_SUCCESS,
  INIT_USER_INFO_FIREBASE_SUCCESS } from '../constants'
import firestore from '@react-native-firebase/firestore'
import { ToastAndroid } from 'react-native'

export function updateAddressInput(text){
  return {
    type: UPDATE_ADDRESS_INPUT,
    text: text
  }
}

export function updateMobileInput(text){
  return {
    type: UPDATE_MOBILE_INPUT,
    text: text
  }
}

export function saveUserInfoFirebase(){

  return (dispatch, getState) => {

   const { user } = getState()

  dispatch({
    type: SAVE_USER_INFO_SUCCESS,
    userInfo: {
      address: user.input.address,
      phoneNumber: user.input.phoneNumber,
    }
  })

  firestore()
    .collection('users')
    .doc(user.userInfo.uid)
    .set({
      address: user.input.address,
      phoneNumber: user.input.phoneNumber,
    })
    .then((ref) => {
      console.log('user info saved!');
      ToastAndroid.showWithGravity(
        TOAST_MESSAGE_USER_INFO_SAVED_SUCCESS,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      )
    })
 }
}

export function updateUserInfoDialogVisible(visible){
  return {
    type: UPDATE_USER_INFO_DIALOG_VISIBLE,
    visible: visible
  }
}

export function initUserInfoFirebase(){
  return (dispatch, getState) => {

    const { user } = getState()

    firestore()
      .collection('users')
      .doc(user.userInfo.uid)
      .get()
      .then(doc => {
        let userInfo = doc.data()
        userInfo.id = doc.id

        dispatch({type: INIT_USER_INFO_FIREBASE_SUCCESS, userInfo: userInfo})

      })

  }
}