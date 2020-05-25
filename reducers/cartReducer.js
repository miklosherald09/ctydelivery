import { 
  ADD_TO_CART, 
  PUNCH_ITEM, 
  SAVE_CART_ITEMS_SUCCESS, 
  CLEAR_CART_SUCCESS, 
  DELIVER_ACTION_HALT,
  ADDRESS_DIALOG_VISIBLE,
  MOBILE_DIALOG_VISIBLE,
  PENDING_TO_RECEIVED_BEGIN,
  PENDING_TO_RECEIVED_SUCCESS,
  DELIVERY_STATUS_PENDING,
  SAVE_CART_ITEMS_BEGIN,
  GET_ACTIVE_CART_BEGIN,
  GET_ACTIVE_CART_SUCCESS,
  DELIVERY_STATUS_RECEIVED,
  CANCEL_DELIVERY_BEGIN,
  CANCEL_DELIVERY_SUCCESS,
  CLEAR_CART,
  PUNCH_ITEM_BEGIN,
  PUNCH_ITEM_SUCCESS,
  REMOVE_CART_ITEM,
  SET_SAVE_CART_TIMEOUT
 } from '../constants'

const initialState = {
  addressDialogVisible: false,
  mobileDialogVisible: false,
  deliverActionHalted: false,
  savingCartItems: false,
  activeCart: {
    id: null,
    items: [],
    deliveryStatus: "",
    total: 0
  },
  pendingToReceivedProgress: false,
  cancelDeliverProgress: false,
  initializedActiveCart: false,
  punchItemProgress: false,
  timeout: 0
}


const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case ADD_TO_CART: {

      found = state.activeCart.items.find(item => item.id == action.item.id)
      if(!found){
        newItem = action.item
        newItem.count = action.counter
        state.activeCart.items.push(newItem)
      }
      else{
        state.activeCart.items.map(item => {
          if(item.id == action.item.id){
            item.count = action.counter
          }
        })
      }

      return {
        ...state
      }
    }
    
    case PUNCH_ITEM: {

      if(state.activeCart.items.find((i) => i.id == action.item.id)){
        items = state.activeCart.items.map((i) => {
          if(i.id == action.item.id){
            i.count += 1
          }
          return i
        })
      }
      else{
        action.item.count = 1
        items = [...state.activeCart.items, action.item]
      }

      return {
        ...state,
        activeCart: {
          ...state.activeCart,
          items: items,
          total: state.activeCart.total + parseInt(action.item.price)
        },
      }
      
    }

    case SAVE_CART_ITEMS_BEGIN: {
      return {
        ...state,
        savingCartItems: true
      }
    }

    case SAVE_CART_ITEMS_SUCCESS: {
      return {
        ...state,
        savingCartItems: false
      }
    }

    case CLEAR_CART_SUCCESS: {
      return {
        ...state,
        activeCart: {
          ...state.activeCart,
          items: [],
          total: 0
        }
      }
    }

    case CLEAR_CART: {
      return {
        ...state,
        activeCart: {
          id: null,
          items: [],
          deliveryStatus: "",
          total: 0
        },
      }
    }

    case ADDRESS_DIALOG_VISIBLE: {
      return {
        ...state,
        addressDialogVisible: action.visible
      }
    }

    case MOBILE_DIALOG_VISIBLE: {
      return {
        ...state,
        mobileDialogVisible: action.visible
      }
    }

    case DELIVER_ACTION_HALT: {
      return {
        ...state,
        deliverActionHalted: action.halt
      }
    }
    
    case PENDING_TO_RECEIVED_BEGIN: {
      return {
        ...state,
        pendingToReceivedProgress: true
      }
    }

    case PENDING_TO_RECEIVED_SUCCESS: {
      return {
        ...state,
        pendingToReceivedProgress: false,
        activeCart: {
          ...state.activeCart,
          deliveryStatus:  DELIVERY_STATUS_RECEIVED
        }
      }
    }

    case CANCEL_DELIVERY_BEGIN: {
      return {
        ...state,
        cancelDeliverProgress: true
      }
    }

    case CANCEL_DELIVERY_SUCCESS: {
      return {
        ...state,
        cancelDeliverProgress: false,
        activeCart: {
          ...state.activeCart,
          deliveryStatus: DELIVERY_STATUS_PENDING
        }
      }
    }

    case GET_ACTIVE_CART_BEGIN: {
      return {
        ...state
      }
    }

    case GET_ACTIVE_CART_SUCCESS: {
      return {
        ...state,
        activeCart: action.activeCart,
        initializedActiveCart: true
      }
    }
    
    case PUNCH_ITEM_BEGIN: {
      return {
        ...state,
        punchItemProgress: true
      }
    }

    case PUNCH_ITEM_SUCCESS: {
      return {
        ...state,
        punchItemProgress: false
      }
    }

    case REMOVE_CART_ITEM: {

      filtered = state.activeCart.items.filter(item => {
        return item.id != action.item.id
      })

      return {
        ...state,
        activeCart: {
          ...state.activeCart,
          items: filtered,
        }
      }
    }

    case SET_SAVE_CART_TIMEOUT: {
      return {
        ...state,
        timeout: action.timeout
      }
    }

    default:
      return state;
  }

}
export default cartReducer;