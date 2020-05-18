import { SELECT_SECTION, GET_SECTION_ITEMS, INIT_SECTION_ITEMS, GET_SECTIONS_SUCCESS } from '../constants'
import { formatData, findWithAttr } from '../functions'

const initialState = {
  activeSection: {google_product_category: 1},
  sectionItems: [],
  sections: [],
  sectionLastItem: [],
  lastQuerySnapShot: null
}

const sectionReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case SELECT_SECTION: {
      return {
        ...state,
        activeSection: action.section
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