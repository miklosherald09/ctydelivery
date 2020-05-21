import { Alert } from 'react-native'
import { AUTH_MODAL_VISIBLE, AUTH_SUCCESS, SET_CONFIRMATION, SET_USER_INFO } from '../constants'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import * as RootNavigation from '../RootNavigation.js'
import { getActiveCart, clearCart } from './cartActions'
import { initUserInfoFirebase } from './userActions'


export function authListenerInit(){
  return (dispatch, getState) => {

      const { cart, user } = getState()

      auth().onAuthStateChanged(function(userInfo) {
      if(userInfo) {
        // if(user.userInfo){
          dispatch({type: SET_USER_INFO, userInfo: userInfo})
          dispatch({type: AUTH_MODAL_VISIBLE, visible: false })
        
          dispatch(getActiveCart())
          // dispatch(getDeliveries())
          dispatch(initUserInfoFirebase())
      }
      else{
        dispatch({type: SET_USER_INFO, userInfo: {uid: null}})
        RootNavigation.navigate('Welcome', {});
        console.log('No user is signed in.')
      }
    })
  }
}

export function authModalVisible(visible) {
  return {
    type: AUTH_MODAL_VISIBLE,
    visible: visible
  }
}

export function initializeAuth(){

  return (dispatch, getState) => {

    (async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently()
        dispatch({ type: AUTH_SUCCESS, account: userInfo })
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          // user has not signed in yet
          console.log(error)
        } else {
          // some other error
          console.log(error)
        }
      }
    })()
  }
}

export function googleSignIn(){
  return (dispatch) => {
    (async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
        auth().signInWithCredential(googleCredential);

        dispatch({
          type: AUTH_SUCCESS, 
          authMethod: 'GOOGLE_SIGN_IN',
          userInfo: userInfo
        })
      
      } catch (error) {
       
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          // console.log('1')
          
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          // console.log('2')
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          // console.log('3')
        } else {
          // console.log('4')
          // console.log(error)
          // some other error happened
        }
      }
    })()
  }
}

export function getCurrentUserGoogle(){
  return (dispatch) => {
    (async () => {
      await GoogleSignin.hasPlayServices()
      const currentUser = await GoogleSignin.getCurrentUser()
    
      dispatch({
        type: 1, 
        authMethod: 'GOOGLE_SIGN_IN',
        userInfo: currentUser
      })
    })()
  }
}

export function facebookSignIn(){

  return (dispatch) => {

    (async () => {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      else{
        dispatch({
          type: AUTH_SUCCESS, 
          authMethod: 'FACEBOOK_SIGN_IN',
          userInfo: data
        })

        dispatch({ type: AUTH_MODAL_VISIBLE, visible: false })
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    })()
  }
}

export function setConfirmation(confirmation){
  return {
    type: SET_CONFIRMATION,
    confirmation: confirmation
  }
}

export function authenticationGuard(){

  return (dispatch, getState) => {
    
    const { user } = getState()

    if(!user.userInfo){
      dispatch({type: AUTH_MODAL_VISIBLE, visible: true})
    }
  }
}

export function signOut(){
  
  return (dispatch) => {

    const signOutAction = () => {
      dispatch(clearCart())
      auth().signOut()
      console.log('sign out')
      RootNavigation.navigate('Home', {})
    }
    
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "No", onPress: () => { console.log }},
        { text: "Yes", onPress: () => { signOutAction() }}
      ],
      { cancelable: true }
    )
  }
}