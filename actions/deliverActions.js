import { 
  GET_DELIVERIES_BEGIN,
  GET_DELIVERIES_SUCCESS,
  SELECT_DELIVERY,
  TOGGLE_ITEM_CHECK,
  REFRESH_SELECTED_DELIVERY,
  DELIVERY_STATUS_PACKAGING,
  DELIVERY_STATUS_RECEIVED,
  DELIVERY_STATUS_READY,
  DELIVERY_STATUS_DELIVERED,
  ALERT_MESSAGE_PACKAGING_TITLE,
  ALERT_MESSAGE_PACKAGING_SUBTITLE,
  ALERT_MESSAGE_CANCEL_PACKAGING_TITLE,
  ALERT_MESSAGE_CANCEL_PACKAGING_SUBTITLE,
  ALERT_MESSAGE_PACKAGING_TO_READY_TITLE,
  ALERT_MESSAGE_PACKAGING_TO_READY_SUBTITLE,
  ALERT_MESSAGE_READY_TO_DELIVERED_TITLE,
  ALERT_MESSAGE_READY_TO_DELIVERED_SUBTITLE,
  RECEIVED_TO_PACKAGING_BEGIN,
  RECEIVED_TO_PACKAGING_SUCCESS,
  PACKAGING_TO_READY_BEGIN,
  PACKAGING_TO_READY_SUCCESS,
  READY_TO_DELIVERED_BEGIN,
  READY_TO_DELIVERED_SUCCESS,
  PACKAGING_TO_RECEIVED_BEGIN,
  PACKAGING_TO_RECEIVED_SUCCESS,
  TOAST_MESSAGE_RECEIVED_TO_PACKAGING_SUCCESS,
  TOAST_MESSAGE_PACKAGING_TO_RECEIVED_SUCCESS,
  TOAST_MESSAGE_READY_TO_DELIVERED_SUCCESS,
  TOAST_MESSAGE_PACKAGING_TO_READY_SUCCESS,
  REFRESH_GET_DELIVERIES,
  DELIVERY_LIST_OFFSET
} from '../constants'
import { Alert, ToastAndroid } from 'react-native'
import firestore from '@react-native-firebase/firestore'


export function getDeliveries(){

  return (dispatch, getState) => {

    const { deliver } = getState()

    if(!deliver.getDeliveriesOnProgress){

      dispatch({type: GET_DELIVERIES_BEGIN})
      // console.log(querySnapshot.size)
      
      const firestoreQuery = firestore()
        .collection('carts')
        .orderBy('datetime', 'desc')
        .limit(deliver.docSize + DELIVERY_LIST_OFFSET)
        .onSnapshot(querySnapshot => {

          deliveries = []
          lastDeliveryDoc = null

          if(querySnapshot.size > 0){
            querySnapshot.forEach((doc, i) => {
              snapDeliver = doc.data()
              snapDeliver.id = doc.id
              deliveries.push(snapDeliver)
            })
            dispatch({
              type: GET_DELIVERIES_SUCCESS,
              deliveries: deliveries,
              docSize: querySnapshot.size
            })
          }
      })
      return () => firestoreQuery();
    }
  }
}

export function refreshDeliveries(){
  return (dispatch, getState) => {
    dispatch({type: REFRESH_GET_DELIVERIES})
    dispatch(getDeliveries())
  }
}

export function selectDelivery(deliveryParams){
  return (dispatch, getState) => {

    dispatch({type: SELECT_DELIVERY, delivery: deliveryParams})

    firestore()
      .collection('carts')
      .doc(deliveryParams.id)
      .onSnapshot(doc => {
        deliveryParams = doc.data()
        deliveryParams.id = doc.id
        dispatch({type: SELECT_DELIVERY, delivery: deliveryParams})
      })
  }
}

export function toggleItemCheck(itemId){
  return (dispatch, getState) => {
    
    const { deliver } = getState()
    
    dispatch({type: TOGGLE_ITEM_CHECK, itemId: itemId})
    
    firestore()
      .collection('carts')
      .doc(deliver.selectedDelivery.id)
      .update({
        items: deliver.selectedDelivery.items,
      })
      .then(() => {
        console.log('Cart updated')
      })
  }
}

export function refreshSelectedDelivery(){
  return (dispatch, getState) => {

  const { deliver } = getState()

  ToastAndroid.showWithGravity(
    "Refreshing Items",
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM
  )

  firestore()
    .collection('carts')
    .doc(deliver.selectedDelivery.id)
    .get()
    .then((doc) => {
      let delivery =  doc.data()
      delivery.id = doc.id
      dispatch({type: REFRESH_SELECTED_DELIVERY, delivery: delivery })
      ToastAndroid.showWithGravity( 
        "Done!", 
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM 
      )
    })
  }
}

export function packaging(){

  return (dispatch, getState) => {

    const { deliver } = getState()

    const receivedToPackaging = () => {

      dispatch({type: RECEIVED_TO_PACKAGING_BEGIN})

      firestore()
        .collection('carts')
        .doc(deliver.selectedDelivery.id)
        .update({deliveryStatus: DELIVERY_STATUS_PACKAGING})
        .then(() => {
          dispatch({ type: RECEIVED_TO_PACKAGING_SUCCESS, cartId: deliver.selectedDelivery.id })
          ToastAndroid.showWithGravity(
            TOAST_MESSAGE_RECEIVED_TO_PACKAGING_SUCCESS,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          )
        })
        .catch(console.log)
    }

    Alert.alert(
      ALERT_MESSAGE_PACKAGING_TITLE,
      ALERT_MESSAGE_PACKAGING_SUBTITLE,
      [
        { text: "Cancel", onPress: () => console.log, style: "cancel"},
        { text: "Yes", onPress: () => receivedToPackaging()}
      ],
      { cancelable: true }
    )
  }
}

export function cancelPackaging(){

  return (dispatch, getState) => {

    const { deliver } = getState()

    const packagingToReceived = () => {

      dispatch({type: PACKAGING_TO_RECEIVED_BEGIN })

      firestore()
        .collection('carts')
        .doc(deliver.selectedDelivery.id)
        .update({deliveryStatus: DELIVERY_STATUS_RECEIVED})
        .then(() => {
          dispatch({ type: PACKAGING_TO_RECEIVED_SUCCESS, cartId: deliver.selectedDelivery.id })
          ToastAndroid.showWithGravity(
            TOAST_MESSAGE_PACKAGING_TO_RECEIVED_SUCCESS,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          )
        })
        .catch(console.log)
    }

    Alert.alert(
      ALERT_MESSAGE_CANCEL_PACKAGING_TITLE,
      ALERT_MESSAGE_CANCEL_PACKAGING_SUBTITLE,
      [
        { text: "Cancel", onPress: () => console.log},
        { text: "Yes", onPress: () => packagingToReceived()}
      ],
      { cancelable: false }
    )
  }
}

export function ready(){
  return (dispatch, getState) => {

    const { deliver } = getState()

    const packagingToReceived = () => {

      dispatch({type: PACKAGING_TO_READY_BEGIN })

      firestore()
        .collection('carts')
        .doc(deliver.selectedDelivery.id)
        .update({deliveryStatus: DELIVERY_STATUS_READY})
        .then(() => {
          dispatch({ type: PACKAGING_TO_READY_SUCCESS, cartId: deliver.selectedDelivery.id })
          ToastAndroid.showWithGravity(
            TOAST_MESSAGE_PACKAGING_TO_READY_SUCCESS,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          )
        })
        .catch(console.log)
    }

    Alert.alert(
      ALERT_MESSAGE_PACKAGING_TO_READY_TITLE,
      ALERT_MESSAGE_PACKAGING_TO_READY_SUBTITLE,
      [
        { text: "Cancel", onPress: () => console.log},
        { text: "Ok", onPress: () => packagingToReceived()}
      ],
      { cancelable: false }
    )
  }
}

export function delivered(){

  return (dispatch, getState) => {

    const { deliver } = getState()

    const packagingToDelivered = () => {

      dispatch({type: READY_TO_DELIVERED_BEGIN })

      firestore()
        .collection('carts')
        .doc(deliver.selectedDelivery.id)
        .update({deliveryStatus: DELIVERY_STATUS_DELIVERED})
        .then(() => {
          dispatch({ type: READY_TO_DELIVERED_SUCCESS, cartId: deliver.selectedDelivery.id })
          ToastAndroid.showWithGravity(
            TOAST_MESSAGE_READY_TO_DELIVERED_SUCCESS,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          )
        })
        .catch(console.log)
    }

    Alert.alert(
      ALERT_MESSAGE_READY_TO_DELIVERED_TITLE,
      ALERT_MESSAGE_READY_TO_DELIVERED_SUBTITLE,
      [
        { text: "Cancel", onPress: () => console.log},
        { text: "Yes, order is delivered", onPress: () => packagingToDelivered()}
      ],
      { cancelable: false }
    )
  }
}