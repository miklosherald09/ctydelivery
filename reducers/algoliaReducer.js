import { INIT_ALGOLIA_SUCCESS } from '../constants'

const initialState = {
  searchClient: null,
  itemsIndex: null
};

const algoliaReducer = (state = initialState, action) => {
  switch(action.type) {

    case INIT_ALGOLIA_SUCCESS: {
      const itemsIndex = action.searchClient.initIndex('items')
      return {
        ...state,
        searchClient: action.searchClient,
        itemsIndex: itemsIndex
      }
    }

    default:
      return state;
  }
}

export default algoliaReducer;