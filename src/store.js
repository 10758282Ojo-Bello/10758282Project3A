import {createStore, combineReducers, applyMiddleware,compose} from 'redux'
import Cookie from "js-cookie"
import { userSigninReducer, userRegisterReducer, userUpdateReducer,  } from './reducers/userReducers';
import thunk from 'redux-thunk'
import { passwordListReducer, passwordSaveReducer,passwordDeleteReducer } from './reducers/passwordReducers';
const userInfo = Cookie.getJSON("userInfo") || null;
const userInfo2 = Cookie.getJSON("userInfo2") || null;

const initialState = {userSigninReducer:{userInfo}, userRegisterReducer:{userInfo2}}


const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    passwordList : passwordListReducer,
    passwordSave: passwordSaveReducer,
    passwordDelete:passwordDeleteReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))
export default store;
