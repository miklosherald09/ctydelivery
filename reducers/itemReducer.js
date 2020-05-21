import {
  AUTO_INCREMENT_ITEM_COUNT,
  STOP_AUTO_INCREMENT_ITEM_COUNT,
  ITEM_MODAL_VISIBLE,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_BEGIN,
  ADD_ITEM_COUNT,
  SELECT_ITEM, 
  CHANGE_ITEM_COUNT, 
  UPDATE_PUNCH_COUNT_DISPLAY, 
  SNYC_ITEMS_CSV_SUCCESS } from '../constants'

const initialState = {
  itemModalVisible: false,
  selectedItem: {},
  itemCounter: 1,
  startAutoInc: false
};

const itemReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case ITEM_MODAL_VISIBLE: {
      return {
        ...state,
        itemModalVisible: action.visible
      }
    }

    case SELECT_ITEM: {
      return {
        ...state,
        selectedItem: action.item,
        itemCounter: action.itemCounter
      }
    }

    case FETCH_ITEMS_SUCCESS: {
      return {
        ...state,
        sections: action.items
      }
    }

    case ADD_ITEM_COUNT: {
      return {
        ...state,
        itemCounter: parseInt(state.itemCounter) + action.count
      }
    }
    
    case FETCH_ITEMS_BEGIN: {
      return {
        ...state,
      }
    }

    case CHANGE_ITEM_COUNT: {
      return {
        ...state,
        itemCounter: action.count
      }
    }

    case UPDATE_PUNCH_COUNT_DISPLAY: {

      // REKTA GAMING, for fast update
      state.sections.find(section => {
        found = section.items.find((item) => item.id == action.item.id)
        if(found){
          if(found.punchCount)
            found.punchCount += 1
          else
            found.punchCount = 1
          
            return true
        }
        else{
          return false
        }
      });


      return {
        ...state,
        // sections: sections
      }
    }

    case SNYC_ITEMS_CSV_SUCCESS: {
      return {
        ...state,
      }
    }

    case AUTO_INCREMENT_ITEM_COUNT: {
      return {
        ...state,
        startAutoInc: true
      }
    }
    
    case STOP_AUTO_INCREMENT_ITEM_COUNT: {
      return {
        ...state,
        startAutoInc: false
      }
    }

    default:
      return state;
  }
}

export default itemReducer;