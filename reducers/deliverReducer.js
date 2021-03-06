import { 
  GET_DELIVERIES_BEGIN,
  GET_DELIVERIES_SUCCESS,
  REFRESH_GET_DELIVERIES,
  SELECT_DELIVERY,
  TOGGLE_ITEM_CHECK,
  REFRESH_SELECTED_DELIVERY,
  DELIVERY_STATUS_PACKAGING,
  DELIVERY_STATUS_RECEIVED,
  DELIVERY_STATUS_READY,
  DELIVERY_STATUS_DELIVERED,
  RECEIVED_TO_PACKAGING_SUCCESS,
  PACKAGING_TO_RECEIVED_SUCCESS,
  PACKAGING_TO_READY_BEGIN,
  PACKAGING_TO_READY_SUCCESS,
  READY_TO_DELIVERED_BEGIN,
  READY_TO_DELIVERED_SUCCESS,
  DELETE_DELIVERY_SUCCESS
 } from '../constants'

const initialState = {
  deliveries: [],
  getDeliveriesOnProgress: false,
  docSize: 0,
  activeStatus: '',
  selectedDelivery: {
    id: '',
    items: []
  }
}

const deliverReducer = (state = initialState, action) => {
  switch(action.type) {

    case GET_DELIVERIES_BEGIN: {
      return {
        ...state,
        getDeliveriesOnProgress: true
      }
    }
    
    case GET_DELIVERIES_SUCCESS: {
      return {
        ...state,
        deliveries: action.deliveries,
        getDeliveriesOnProgress: false,
        docSize: action.docSize
      }
    }

    case REFRESH_GET_DELIVERIES: {
      return {
        ...state,
        deliveries: [],
        docSize: 0
      }
    }

    case SELECT_DELIVERY: {
      return {
        ...state,
        selectedDelivery: action.delivery
      }
    }

    case TOGGLE_ITEM_CHECK: {

      for(i = 0; i < state.selectedDelivery.items.length; i++){
        item = state.selectedDelivery.items[i]
        if(item.id == action.itemId){
          item.checked = !item.checked
          break
        }
        
      }
      // state.selectedDelivery.items.forEach((item) => {
      //   if(item.id == action.itemId){
      //     item.checked = !item.checked
      //   }
      // })

      return {
        ...state
      }
    }

    case REFRESH_SELECTED_DELIVERY: {
      return {
        ...state,
        selectedDelivery: action.delivery
      }
    }

    case RECEIVED_TO_PACKAGING_SUCCESS: {
      
      state.deliveries.map(delivery => {
        if(delivery.id == action.cartId)
          delivery.deliveryStatus = DELIVERY_STATUS_PACKAGING
      })

      state.selectedDelivery.deliveryStatus = DELIVERY_STATUS_PACKAGING
      
      return {
        ...state,
      }
    }

    case PACKAGING_TO_RECEIVED_SUCCESS: {
      
      state.deliveries.map(delivery => {
        if(delivery.id == action.cartId)
          delivery.deliveryStatus = DELIVERY_STATUS_RECEIVED
      })

      state.selectedDelivery.deliveryStatus = DELIVERY_STATUS_RECEIVED
      
      return {
        ...state,
      }
    }

    case PACKAGING_TO_READY_BEGIN: {
      return {
        ...state,
      }
    }

    case PACKAGING_TO_READY_SUCCESS: {
      
      state.deliveries.map(delivery => {
        if(delivery.id == action.cartId)
          delivery.deliveryStatus = DELIVERY_STATUS_READY
      })

      state.selectedDelivery.deliveryStatus = DELIVERY_STATUS_READY
      
      return {
        ...state,
      }
    }

    case READY_TO_DELIVERED_BEGIN: {
      return {
        ...state,
      }
    }

    case READY_TO_DELIVERED_SUCCESS: {
      
      state.deliveries.map(delivery => {
        if(delivery.id == action.cartId)
          delivery.deliveryStatus = DELIVERY_STATUS_DELIVERED
      })

      state.selectedDelivery.deliveryStatus = DELIVERY_STATUS_DELIVERED
      
      return {
        ...state,
      }
    }

    case DELETE_DELIVERY_SUCCESS: {

      deliveries = state.deliveries.filter((d) => {
        d.id != action.deliverId
      })

      return {
        ...state,
        selectedDelivery: {
          id: '',
          items: [],
          userInfo: {}
        },
      }
    }

    default:
      return state;
  }

}
export default deliverReducer;