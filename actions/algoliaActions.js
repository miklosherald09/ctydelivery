import { INIT_ALGOLIA_SUCCESS } from '../constants'
import algoliasearch from 'algoliasearch/lite'

export function initAlgolia(){
  return (dispatch, getState) => {
    
    searchClient = algoliasearch(
      'OVZZL4TMYL',
      '1b69b0a57b2229cafbf14cc232492cc8'
    )

    dispatch({type: INIT_ALGOLIA_SUCCESS, searchClient: searchClient})

  }
}
