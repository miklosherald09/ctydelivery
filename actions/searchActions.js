import { SEARCH_MODAL_VISIBLE, SEARCH_ITEMS_SUCCESS, SET_SEARCH_TEXT } from '../constants'

export function searchModalVisible(visible) {
  return {
    type: SEARCH_MODAL_VISIBLE,
    visible: visible
  }
}

export function initSearchItems(){
  return (dispatch, getState) => {

    const { algolia, search } = getState()

    algolia.itemsIndex.search("*").then(results => {
      dispatch({type: SEARCH_ITEMS_SUCCESS, items: results.hits})
    })
    
  }
}

export function searchItems(){
  return (dispatch, getState) => {

    const { algolia, search } = getState()

    algolia.itemsIndex.search(search.searchText).then(results => {
      dispatch({type: SEARCH_ITEMS_SUCCESS, items: results.hits})
    })
    
  }
}

export function setSearchText(text){
  return (dispatch, getState) => {
    dispatch({type: SET_SEARCH_TEXT, text: text})
  }
}

export function selectSearchItem(){
  return (dispatch, getState) => {
    
    const { user } = getState()
    if(!user.userInfo.uid){
      alert("SHIT!")
    }
    else{
      alert("SHITa ags!")
    }
  }
}