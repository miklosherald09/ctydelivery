import { SELECT_SECTION, GET_SECTIONS_SUCCESS, GET_SECTION_ITEMS, INIT_SECTION_ITEMS, ITEM_FETCH_LIMIT } from '../constants'
import { formatData, filterBox, findWithAttr } from '../functions'
import firestore from '@react-native-firebase/firestore'

export function getSections(){

  return dispatch => {

    firestore()
    .collection('sections')
    .orderBy('order', 'asc')
    .get()
    .then(querySnapshot => {

      // console.log('Total users: ', querySnapshot.size)
      sections = []
      querySnapshot.forEach(item => {
        section = item.data()
        section.startAfter = null
        sections.push(section)
      });

      dispatch({ type: GET_SECTIONS_SUCCESS, sections: sections })
      dispatch(getSectionItems({google_product_category: 1}))

    });
  }
}

export function selectSection(section) {
  return {
    type: SELECT_SECTION,
    section: section
  }
}

export function initSectionItems(_section){

  return (dispatch, getState) => {
    
    const { section } = getState()  

    if(!section.sectionItems[parseInt(_section.google_product_category)]){
      if(section.google_product_category == 1){
         firestore()
          .collection('items')
          .orderBy('title', 'asc')
          .limit(24)
          .get()
          .then(querySnapshot => {
            items = []
            querySnapshot.forEach(item => {
              item = item.data()
              items.push(item)
            });

            dispatch({
              type: GET_SECTION_ITEMS,
              section: {google_product_category: 1},
              items: formatData(items, 4)
            })
          })
      }
      else{
        firestore()
        .collection('items')
        .where('google_product_category', '==', _section.google_product_category)
        .limit(24)
        .get()
        .then(querySnapshot => {
          items = []
          querySnapshot.forEach(item => {
            item = item.data()
            items.push(item)
          });

          dispatch({
            type: INIT_SECTION_ITEMS,
            section: _section,
            items: formatData(items, 4)
          })
        })
      }
    }
    else{
      // console.log('dfidjfl')
    }
  }
}

export function getSectionItems(_paramSection){

  return (dispatch, getState) => {

    const { section } = getState()

    const _gpc = _paramSection.google_product_category
    const _section = findWithAttr(section.sections, 'google_product_category', _gpc)

    startAfter = section.sectionLastItem[_gpc]?section.sectionLastItem[_gpc]:null

    if(_gpc == 1){
      firestore()
        .collection('items')
        .orderBy('item_order', 'asc')
        .limit(24)
        .startAfter(startAfter)
        .get()
        .then(querySnapShot => {
          // console.log('querySnapshot.size: ', querySnapShot.size);
          items = []
          lastItem = null
          querySnapShot.forEach((doc, i) => {
            item = doc.data()
            items.push(item)

            if(i + 1 == querySnapShot.size)
              lastDoc = doc
          });

          dispatch({
            type: GET_SECTION_ITEMS,
            section: _paramSection,
            items: items,
            gpc: _gpc,
            lastQuerySnapShot: lastDoc
          })
      })
    }
    else{
      // console.log('other sections')
      firestore()
      .collection('items')
      .where('google_product_category', '==', String(_gpc))
      .orderBy('item_order', 'asc')
      .limit(24)
      .startAfter(startAfter)
      .get()
      .then(querySnapShot => {
        items = []
        querySnapShot.forEach((doc, i) => {
          item = doc.data()
          items.push(item)

          if(i + 1 == querySnapShot.size)
            lastItem = doc
        });

        dispatch({
          type: GET_SECTION_ITEMS,
          section: _paramSection,
          items: items,
          gpc: _gpc,
          lastQuerySnapShot: lastItem
        })
    })
    }
  }
}