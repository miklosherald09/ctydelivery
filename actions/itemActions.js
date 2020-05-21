import { Alert, ToastAndroid } from 'react-native'
import { 
  SELECT_ITEM, 
  ITEM_MODAL_VISIBLE, 
  FETCH_ITEMS_SUCCESS, 
  ADD_ITEM_COUNT, 
  CHANGE_ITEM_COUNT, 
  SNYC_ITEM_COUNT, 
  UPDATE_PUNCH_COUNT_DISPLAY,
  AUTO_INCREMENT_ITEM_COUNT,
  STOP_AUTO_INCREMENT_ITEM_COUNT,
  SNYC_ITEMS_CSV_SUCCESS,
  AUTH_MODAL_VISIBLE,
  TOAST_MESSAGE_INVALID_ITEM_COUNTER_INPUT,
} from '../constants'
import firestore from '@react-native-firebase/firestore'
import { csvJSON, findWithAttr } from '../functions'
import { removeCartItem, removeCartItemFbase } from './cartActions'



export function itemModalVisible(visible) {
  return {
    type: ITEM_MODAL_VISIBLE,
    visible: visible
  }
}

export function selectItem(itemParam){

  return (dispatch, getState) => {
    
    const { item, cart, user } = getState()

    if(user.userInfo.uid){
      found = cart.activeCart.items.find(i => i.id == itemParam.id)
      itemCounter = found?found.count:1

      dispatch({type: ITEM_MODAL_VISIBLE, visible: true})
      dispatch({
        type: SELECT_ITEM,
        item: itemParam,
        itemCounter: itemCounter
      })
    }
    else{
      dispatch({type: AUTH_MODAL_VISIBLE, visible: true})
    }

  }
}

export function addItemCount(count){

  return (dispatch, getState) => {

    //console.log('count: '+count)
    const { item } = getState()

    currCounter = item.itemCounter + count

    if(currCounter == 0){
      dispatch(removeCartItem(item.selectedItem))
      dispatch(removeCartItemFbase())
      dispatch(itemModalVisible(false))
    }

    dispatch({
      type: ADD_ITEM_COUNT,
      count: count
    })
  }
}

export function changeItemCount(count){

  return (dispatch, getState) => {

    const { item } = getState()

    if(isNaN(count)){
      ToastAndroid.showWithGravity(
        TOAST_MESSAGE_INVALID_ITEM_COUNTER_INPUT,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
      dispatch({
        type: CHANGE_ITEM_COUNT,
        count: item.itemCounter
      })
    }
    else{
      dispatch({
        type: CHANGE_ITEM_COUNT,
        count: count
      })
    }
  }
}

export function getItems(){

  return dispatch => {

    firestore()
    .collection('items')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);
      
      sections = []
      querySnapshot.forEach(item => {
        item = item.data()
        found = findWithAttr(sections, 'google_product_category', item.google_product_category)
        if(found > -1){
          sections[found].items.push(item)
        }
        else{
          sections.push({
            category: item.category,
            google_product_category: item.google_product_category,
            items: [item],
          })
        }
      });

      dispatch({ type: FETCH_ITEMS_SUCCESS, items: sections })

    });

  }

}

export function syncItemCount(){
  return {
    type: SNYC_ITEM_COUNT,
  }
}

export function updatePunchCountDisplay(item){

  return {
    type: UPDATE_PUNCH_COUNT_DISPLAY,
    item: item
  }
}

export function syncItemsCsv(){

  // Get user document with an ID of ABC
  return (dispatch) => {
    
    Alert.alert(
      "SYNC ITEMS & ITEM SECTIONS STARTED",
      "This update all items info and item sections",
      [
        {
          text: "Ok",
          onPress: () => console.log('okay pressed')
        }
      ],
      { cancelable: false }
    )
    
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSRag1ttKQ1OOeKKI3BeQzdvA9TfEsDImpgMm7dcp17j97qkMcVTbKEtrt31fAhsL7_CxCfGPjXNPqS/pub?gid=0&single=true&output=csv", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/csv'
      }
    })
    .then((response) => {
      return response.text()
    })
    .then((text) => {
      csvArray = csvJSON(text)
      items = JSON.parse(csvArray)
      itemsIdArr = []
      sectionsIdArr = []
  
      // categorize items
      sections = []
      items.forEach((item, i) => {
        itemsIdArr.push(item.id)
        item.item_order = parseInt(item.item_order)

        if(item && item.id){
          firestore()
            .collection('items')
            .doc(item.id)
            .set(item)
            .then(() => {
              console.log('item added!');
            });
        }
        
        found = sections.find((s) => s.google_product_category == item.google_product_category)
        
        section = {
          title: item.category,
          google_product_category: parseInt(item.google_product_category),
          order: parseInt(item.section_order)
        }

        sections.push(section)

        if(!sectionsIdArr.includes(item.google_product_category))
          sectionsIdArr.push(item.google_product_category)

        if(!found){
          if(item.google_product_category){
            firestore()
              .collection('sections')
              .doc(item.google_product_category)
              .set(section)
              .then(() => {
                console.log('section added!')
              })
          }
          else{
            console.log('add section failed!')
          }
        }
      })

      // delete all uneccessary items online
      console.log('deleting all unused items in firebase')
      firestore()
        .collection('items')
        .get()
        .then((querySnapshot) => {

          querySnapshot.docs.map((doc) => {
            
            let item = doc.data()
            
            if(!itemsIdArr.includes(item.id)){
              firestore()
                .collection('items')
                .doc(item.id)
                .delete()
              console.log("item " +item.id + " is deleted")
            }
          })
        })

      // delete all uneccessary items online
      console.log('deleting all unused sections in firebase')
      firestore()
        .collection('sections')
        .get()
        .then((querySnapshot) => {

          querySnapshot.docs.map((doc) => {
            
            if(!sectionsIdArr.includes(doc.id) && doc.id !=  1){
              firestore()
                .collection('sections')
                .doc(doc.id)
                .delete()
              console.log("Section " +doc.id + " is deleted")
            }
          })
        })

      dispatch({ type: SNYC_ITEMS_CSV_SUCCESS })

    })
    .catch((error) => {
      console.log(error)
    });
  }
}

export function autoIncItemCount(){


  return (dispatch, getState) => {
    
    const { item } = getState()

    dispatch({type: AUTO_INCREMENT_ITEM_COUNT})


    const alterate = (n) => {

      dispatch({type: ADD_ITEM_COUNT, count: item.itemCounter + n})
      
      n++
    const timeout = setTimeout((n) => {
        if(n > 10){
          clearTimeout(timeout)
        }
        alterate(n)
      }, 300)
    }
    
    alterate(1)
  }

}

export function stopAutoIncItemCount(){
  return {
    type: STOP_AUTO_INCREMENT_ITEM_COUNT,
  }
}