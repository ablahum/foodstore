import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import myReducer from './myReducer/reducer'
import cartReducer from './cart/reducer'
import paginationReducer from './pagination/reducer'
import userReducer from './user/reducer'

const persistConfig = {
  key: 'persist-key',
  storage
}

const rootReducer = combineReducers({
  my: myReducer,
  cart: cartReducer,

  user: userReducer,
  pagination: paginationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)))
const persistor = persistStore(store)

export { store, persistor }
