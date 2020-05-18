import { 
  INIT_ALGOLIA_SUCCESS, 
  SEARCH_MODAL_VISIBLE, 
  INIT_SEARCH_ITEMS_SUCCESS, 
  SET_SEARCH_TEXT,
  SEARCH_ITEMS_SUCCESS } from '../constants'

const initialState = {
  searchModalVisible: false,
  searchItems: [],
  searchText: ""
};

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_MODAL_VISIBLE: {
      return {
        ...state,
        searchModalVisible: action.visible,
      }
    }

    case INIT_SEARCH_ITEMS_SUCCESS: {
      return {
        ...state,
        searchItems: action.items
      }
    }

    case INIT_ALGOLIA_SUCCESS: {
      return {
        ...state,
      }
    }

    case SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.text
      }
    }

    case SEARCH_ITEMS_SUCCESS: {
      return {
        ...state,
        searchItems: action.items
      }
    }

    default:
      return state;
  }
}

export default searchReducer;