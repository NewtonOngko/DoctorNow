import { configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import viewidReducer from './viewSlice'
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from 'redux'

const reducers = combineReducers({
    userReducer,
    viewidReducer
})
const persistConfig = {
    key:'root',
    storage,
    timeout: null,
    whitelist:['userReducer','viewidReducer']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
  })

const persistor = persistStore(store)

  export {
    store,
    persistor,
  };