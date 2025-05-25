import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import filterReducer from './filter/reducers'
import cartReducer from './cart/reducer'
import paginationReducer from './pagination/reducers'
import userReducer from './user/reducers'

const persistConfig = {
  key: 'persist-key',
  storage
}

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  filter: filterReducer,
  pagination: paginationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)))
const persistor = persistStore(store)

export { store, persistor }
