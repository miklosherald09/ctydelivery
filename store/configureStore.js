import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import countReducer from '../reducers/countReducer'
import itemReducer from '../reducers/itemReducer'
import searchReducer from '../reducers/searchReducer'
import cartReducer from '../reducers/cartReducer'
import authReducer from '../reducers/authReducer'
import sectionReducer from '../reducers/sectionReducer'
import userReducer from '../reducers/userReducer'
import algoliaReducer from '../reducers/algoliaReducer'
import deliverReducer from '../reducers/deliverReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers(
	{
		count: countReducer,
		item: itemReducer,
    search: searchReducer,
    cart: cartReducer,
    auth: authReducer,
    section: sectionReducer,
    user: userReducer,
    algolia: algoliaReducer,
    deliver: deliverReducer
	}
)

const configureStore = () => {
	return createStore(rootReducer, composeEnhancers(
		applyMiddleware(thunk)
	));
}
export default configureStore;