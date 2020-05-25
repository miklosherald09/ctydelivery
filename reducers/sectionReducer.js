import { SELECT_SECTION, GET_SECTION_ITEMS, INIT_SECTION_ITEMS, GET_SECTIONS_SUCCESS, GET_SECTION_ITEMS_BEGIN,  GET_SECTION_ITEMS_SUCCESS } from '../constants'
import { formatData } from '../functions'

const initialState = {
  activeSection: {google_product_category: 1},
  sectionItems: [],
  sections: [],
  sectionLastItem: [],
  lastQuerySnapShot: null,
  getSectionsItemsOnProgress: false
}

const sectionReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case SELECT_SECTION: {
      return {
        ...state,
        activeSection: action.section,
      }
    }

    case GET_SECTION_ITEMS:  {

      const gpc = action.section.google_product_category

      items = []
      if(!state.sectionItems[gpc]){
        items = action.items
      }
      else{
        items = [...state.sectionItems[gpc], ...action.items]
      }

      return {
        ...state,
        sectionItems: {
          ...state.sectionItems,
          [action.section.google_product_category]: formatData(items, 4)
        },
        lastQuerySnapShot: action.lastQuerySnapShot,
        sectionLastItem: {
          ...state.sectionLastItem,
          [gpc]: action.lastQuerySnapShot
        }
      }
    }

    case GET_SECTION_ITEMS_BEGIN: {
      return {
        ...state,
        getSectionsItemsOnProgress: true,
      }
    }

    case GET_SECTION_ITEMS_SUCCESS: {
      return {
        ...state,
        getSectionsItemsOnProgress: false,
      }
    }

    case INIT_SECTION_ITEMS: {
      return {
        ...state,
        sectionItems: {
          ...state.sectionItems,
          [action.section.google_product_category]: items
        }
      } 
    }

    case GET_SECTIONS_SUCCESS: {
      return {
        ...state,
        sections: action.sections
      }     
    }

    default:
      return state;
  }
}

export default sectionReducer;