import { 
  SEARCH_MODAL_VISIBLE, 
  ADD_TO_CART,
  PUNCH_ITEM,
  CLEAR_CART_SUCCESS,
  ADDRESS_DIALOG_VISIBLE,
  MOBILE_DIALOG_VISIBLE,
  AUTH_MODAL_VISIBLE,
  DELIVERY_STATUS_PENDING,
  DELIVERY_STATUS_DELIVERED,
  DELIVERY_STATUS_RECEIVED,
  DELIVERY_STATUS_PACKAGING,
  DELIVERY_STATUS_READY,
  ALERT_MESSAGE_DELIVER_ITEMS_TITLE,
  ALERT_MESSAGE_DELIVER_ITEMS_SUB,
  ALERT_MESSAGE_CANCEL_DELIVERY_TITLE,
  ALERT_MESSAGE_CANCEL_DELIVERY_SUB,
  PENDING_TO_RECEIVED_BEGIN,
  PENDING_TO_RECEIVED_SUCCESS,
  CANCEL_DELIVERY_BEGIN,
  CANCEL_DELIVERY_SUCCESS,
  GET_ACTIVE_CART_BEGIN,
  GET_ACTIVE_CART_SUCCESS,
  ALERT_MESSAGE_PUNCH_PACKAGING_TITLE,
  ALERT_MESSAGE_PUNCH_PACKAGING_SUBTITLE,
  ALERT_MESSAGE_PUNCH_READY_TITLE,
  ALERT_MESSAGE_PUNCH_READY_SUBTITLE,
  ALERT_MESSAGE_DELIVERED_TITLE,
  ALERT_MESSAGE_DELIVERED_SUBTITLE,
  CLEAR_CART,
  ALERT_MESSAGE_USER_INFO_INCOMPLETE_TITLE,
  ALERT_MESSAGE_USER_INFO_INCOMPLETE_SUBTITLE,
  PUNCH_ITEM_BEGIN,
  PUNCH_ITEM_SUCCESS,
  REMOVE_CART_ITEM,
  ALERT_MESSAGE_ITEM_OUT_OF_STOCK_TITLE,
  ALERT_MESSAGE_ITEM_OUT_OF_STOCK_SUBTITLE,
  ITEM_MODAL_VISIBLE,
  TOAST_MESSAGE_ITEM_ADD_TO_CART_SUCCESS,
  ALERT_MESSAGE_ORDER_IN_FREEZE_MODE_TITLE,
  ALERT_MESSAGE_ORDER_IN_FREEZE_MODE_SUBTITLE,
  SET_SAVE_CART_TIMEOUT
} from '../constants'
import { Alert, ToastAndroid } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import * as RootNavigation from '../RootNavigation.js'

export function searchModalVisible(visible) {
  return {
    type: SEARCH_MODAL_VISIBLE,
    visible: visible
  }
}

export function addToCart(item, counter){


  return (dispatch, getState) => {
    
    const { user, cart } = getState()

    const deliveredAlert = () => {
      Alert.alert(
        ALERT_MESSAGE_DELIVERED_TITLE,
        ALERT_MESSAGE_DELIVERED_SUBTITLE,
        [{ text: "Okay", onPress: () => { dispatch(addEmptyCart()) }}
        ],
        { cancelable: true }
      )
    }

    if(!user.userInfo.uid){
      dispatch({type: AUTH_MODAL_VISIBLE, visible: true})
    }
    else if(!parseInt(counter)){
      dispatch({type: ITEM_MODAL_VISIBLE, visible: false})
      dispatch(removeCartItem(item))
      dispatch(removeCartItemFbase(item))
    }
    else if(item.availability == 'out of stock' || item.availability != 'in stock'){
      Alert.alert(
        ALERT_MESSAGE_ITEM_OUT_OF_STOCK_TITLE,
        ALERT_MESSAGE_ITEM_OUT_OF_STOCK_SUBTITLE,
        [{title: 'Okay'}],
        {cancelable: true}
      )
    }
    else if([DELIVERY_STATUS_PACKAGING, DELIVERY_STATUS_READY].includes(cart.activeCart.deliveryStatus)){
      Alert.alert(
        ALERT_MESSAGE_ORDER_IN_FREEZE_MODE_TITLE,
        ALERT_MESSAGE_ORDER_IN_FREEZE_MODE_SUBTITLE,
        [{title: 'Okay'}],
        {cancelable: true}
      )
    }
    else if(cart.activeCart.deliveryStatus == DELIVERY_STATUS_DELIVERED){
      deliveredAlert()
    }
    else {
      dispatch({type: ITEM_MODAL_VISIBLE, visible: false})
      dispatch({ type: ADD_TO_CART, item: item, counter: counter  })
      dispatch(saveCart(item))
      ToastAndroid.showWithGravity(
        TOAST_MESSAGE_ITEM_ADD_TO_CART_SUCCESS,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      )
    }
  }
}

export function punchItem(item){

  return (dispatch, getState) => {

    const { cart, user } = getState()

    if(!user.userInfo.uid){
      dispatch({ type: AUTH_MODAL_VISIBLE, visible: true})
    }
    else if(item.availability == 'out of stock'){
      Alert.alert(
        "Aout Of Stock",
        "ofu of stkc",
        [{title: 'Okay'}],
        {cancelable: true}
      )
    }
    else{
      
      const packagingAlert = () => {
        Alert.alert(
          ALERT_MESSAGE_PUNCH_PACKAGING_TITLE,
          ALERT_MESSAGE_PUNCH_PACKAGING_SUBTITLE,
          [{ text: "Okay", onPress: () => console.log}],
          { cancelable: true }
        )
      }
      
      const readyAlert = () => {
        Alert.alert(
          ALERT_MESSAGE_PUNCH_READY_TITLE,
          ALERT_MESSAGE_PUNCH_READY_SUBTITLE,
          [{ text: "Okay", onPress: () => console.log}],
          { cancelable: true }
        )
      }

      const deliveredAlert = () => {
        Alert.alert(
          ALERT_MESSAGE_DELIVERED_TITLE,
          ALERT_MESSAGE_DELIVERED_SUBTITLE,
          [{ text: "Okay", onPress: () => { dispatch(addEmptyCart()) }}
          ],
          { cancelable: true }
        )
      }

      switch(cart.activeCart.deliveryStatus){
        case DELIVERY_STATUS_PENDING:
        case DELIVERY_STATUS_RECEIVED: {
          dispatch({ type: PUNCH_ITEM, item: item})
          dispatch(saveCart(item))
          break
        }
        case DELIVERY_STATUS_PACKAGING: {
          packagingAlert()
          break
        }
        case DELIVERY_STATUS_READY: {
          readyAlert()
          break
        }
        case DELIVERY_STATUS_DELIVERED: {
          deliveredAlert()
          break
        }
        default: {
          dispatch({ type: PUNCH_ITEM, item: item})
          dispatch(addNewCart())
        }
      }
    }
  }
}

export function addEmptyCart(){

  return (dispatch, getState) => {

    const { user, cart } = getState()

    let _cart = {
      uid: user.userInfo.uid,
      userInfo: {
        email: user.userInfo.email,
        uid: user.userInfo.uid,
        displayName: user.userInfo.displayName,
        photoURL: user.userInfo.photoURL,
        phoneNumber: user.userInfoFirebase.phoneNumber,
        address: user.userInfoFirebase.address
      },
      items: [],
      deliveryStatus: DELIVERY_STATUS_PENDING,
      total: 0,
      datetime: Date.now(),
    }

    firestore()
      .collection('carts')
      .add(_cart)
      .then((ref) => {
        _cart.id = ref.id
        dispatch({ type: GET_ACTIVE_CART_SUCCESS, activeCart: _cart })
        console.log('Cart added!')
      })
  }
}

export function addNewCart(){

  return (dispatch, getState) => {

    dispatch({type: PUNCH_ITEM_BEGIN})

    const { user, cart } = getState()

    let _cart = {
      uid: user.userInfo.uid,
      userInfo: {
        email: user.userInfo.email,
        uid: user.userInfo.uid,
        displayName: user.userInfo.displayName,
        photoURL: user.userInfo.photoURL,
        phoneNumber: user.userInfoFirebase.phoneNumber,
        address: user.userInfoFirebase.address
      },
      items: cart.activeCart.items,
      deliveryStatus: DELIVERY_STATUS_PENDING,
      total: cart.activeCart.total,
      datetime: Date.now(),
    }

    // console.log(_cart)

    firestore()
      .collection('carts')
      .add(_cart)
      .then((ref) => {
        _cart.id = ref.id
        dispatch({ type: GET_ACTIVE_CART_SUCCESS, activeCart: _cart })
        dispatch({ type: PUNCH_ITEM_SUCCESS })
        console.log('Cart added!')
      })
  }
}

export function saveCart(item){
  // update item
  return (dispatch, getState) => {

    dispatch({type: PUNCH_ITEM_BEGIN})
    
    const { user, cart } = getState()
    // make sure that the cart delivery 
    // status is pending & received only

    firestore()
      .collection('carts')
      .doc(cart.activeCart.id)
      .get()
      .then(doc => {

        canUpdate = [DELIVERY_STATUS_PENDING, DELIVERY_STATUS_RECEIVED].includes(doc.data().deliveryStatus)
        
        if(canUpdate){
          firestore()
          .collection('carts')
          .doc(cart.activeCart.id)
          .update({
            items: cart.activeCart.items,
            total: cart.activeCart.total
          })
          .then(() => {
            dispatch({ type: PUNCH_ITEM_SUCCESS })
          })
        }
        else{
           console.log('Save cart item failed')
        }
      })
  }
}

export function clearCartItems(){

  return (dispatch, getState) => {

    // dispatch({ type: CANCEL_DELIVERY_BEGIN })

    const { cart, user } = getState()

    if(user.userInfo.email){

      firestore()
        .collection('carts')
        .doc(cart.activeCart.id)
        .update({
          deliveryStatus: DELIVERY_STATUS_PENDING,
          items: [],
          total: 0
        })
        .then(() => {
          dispatch({ type: CLEAR_CART_SUCCESS })
        //   Alert.alert(
        //     ALERT_MESSAGE_CANCEL_DELIVERY_TITLE,
        //     ALERT_MESSAGE_CANCEL_DELIVERY_SUB,
        //     [{ text: "Okay", onPress: () => null}],
        //     { cancelable: false }
        //   )
        })
    }
    else{
      dispatch({ type: AUTH_MODAL_VISIBLE })
    }
  }
}

export function clearCart(){
  return {
    type: CLEAR_CART,
  }
}

export function addressDialogVisible(visible){
  return {
    type: ADDRESS_DIALOG_VISIBLE,
    visible: visible
  }
}

export function mobileDialogVisible(visible){
  return {
    type: MOBILE_DIALOG_VISIBLE,
    visible: visible
  }
}

export function getActiveCart(){

  return (dispatch, getState) => {

    dispatch({type: GET_ACTIVE_CART_BEGIN})
    const { user, cart } = getState()

    if(user.userInfo.uid){
      firestore()
        .collection('carts')
        .where('uid', '==', user.userInfo.uid)
        .orderBy('datetime', 'desc')
        .limit(1)
        .onSnapshot(onResult => {
          if(onResult){
            onResult.forEach((snap) => {
              doc = snap.data()
              doc.id = snap.id
              dispatch({
                type: GET_ACTIVE_CART_SUCCESS,
                activeCart: doc,
              })
            })
          }
        })
    }
  }
}

export function deliver(){

  return (dispatch, getState) => {

    const { cart, user } = getState()
    
    if(!user.userInfoFirebase.phoneNumber || !user.userInfoFirebase.address){
      Alert.alert(
        ALERT_MESSAGE_USER_INFO_INCOMPLETE_TITLE,
        ALERT_MESSAGE_USER_INFO_INCOMPLETE_SUBTITLE,
        [{ text: "Okay", onPress: () => {  RootNavigation.navigate('User', {}) }}
        ],
        { cancelable: true }
      )
    }
    else{
      dispatch({ type: PENDING_TO_RECEIVED_BEGIN })
      if(user.userInfo.email){
  
        firestore()
          .collection('carts')
          .doc(cart.activeCart.id)
          .update({deliveryStatus: DELIVERY_STATUS_RECEIVED})
          .then(() => {
            dispatch({ type: PENDING_TO_RECEIVED_SUCCESS })
            Alert.alert(
              ALERT_MESSAGE_DELIVER_ITEMS_TITLE,
              ALERT_MESSAGE_DELIVER_ITEMS_SUB,
              [{ text: "Okay", onPress: () => null}],
              { cancelable: true }
            )
          })
      }
    }
  }
}

export function cancelDeliver(){

  return (dispatch, getState) => {

    dispatch({ type: CANCEL_DELIVERY_BEGIN })

    const { cart, user } = getState()

    if(user.userInfo.email){

      firestore()
        .collection('carts')
        .doc(cart.activeCart.id)
        .update({deliveryStatus: DELIVERY_STATUS_PENDING})
        .then(() => {
          dispatch({ type: CANCEL_DELIVERY_SUCCESS })
          Alert.alert(
            ALERT_MESSAGE_CANCEL_DELIVERY_TITLE,
            ALERT_MESSAGE_CANCEL_DELIVERY_SUB,
            [{ text: "Okay", onPress: () => null}],
            { cancelable: false }
          )
        })
    }
    else{
      dispatch({ type: AUTH_MODAL_VISIBLE })
    }
  }
}

export function removeCartItem(item){
  console.log('removeing item')
  console.log(item)
  return { 
    type: REMOVE_CART_ITEM,
    item: item
  }
}

export function removeCartItemFbase(){
  return (dispatch, getState) => {

    const { cart } = getState()

    firestore()
      .collection('carts')
      .doc(cart.activeCart.id)
      .update({
        items: cart.activeCart.items
      })
      .then(() => {
        console.log('item removed')
      })

  }
}

export function saveCartRemarks(text){
  return (dispatch, getState) => {

    const { cart } = getState()

    clearTimeout(cart.timeout)

    timeout = setTimeout(function () {
      firestore()
        .collection('carts')
        .doc(cart.activeCart.id)
        .update({ remarks: text })
        .then(() => {
          console.log('cart remarks saved')
        })
    }, 500)

    dispatch({type: SET_SAVE_CART_TIMEOUT, timeout: timeout})

  }
}