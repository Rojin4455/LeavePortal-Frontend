import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import userReducer from '../slices/userSlice'
import AdminReducer from '../slices/adminContent'
import ManagerReducer from '../slices/managerContentSlice'
import UserContentReducer from '../slices/userContentSlice'


const rootReducer = combineReducers({
    user:userReducer,
    adminContent:AdminReducer,
    managerContent:ManagerReducer,
    userContent:UserContentReducer,
})


const persistConfig = {
    key: 'root',
    storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
});



const persistor = persistStore(store);


export {store, persistor};