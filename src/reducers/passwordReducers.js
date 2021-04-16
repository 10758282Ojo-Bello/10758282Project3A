import { PASSWORD_LIST_REQUEST, PASSWORD_LIST_SUCCESS, PASSWORD_LIST_FAIL, PASSWORD_UPDATE_REQUEST, PASSWORD_UPDATE_SUCCESS, PASSWORD_UPDATE_FAIL, PASSWORD_SAVE_REQUEST, PASSWORD_SAVE_SUCCESS, PASSWORD_SAVE_FAIL, PASSWORD_DELETE_REQUEST, PASSWORD_DELETE_SUCCESS, PASSWORD_DELETE_FAIL } from "../constants/passwordConstants.js";

function passwordListReducer(
    state={passwords:[]}, action
){
    switch (action.type){
        case PASSWORD_LIST_REQUEST:
            return {loading:true, passwords:[]};
        case PASSWORD_LIST_SUCCESS:
            return {loading:false, passwords:action.payload};
        case PASSWORD_LIST_FAIL:
            return{loading:false, error:action.payload};
        default:
            return state

    }
};

function passwordSaveReducer(
    state = { password: {}},action
){
    switch(action.type){
        case PASSWORD_SAVE_REQUEST:
            return {loading:true};
        case PASSWORD_SAVE_SUCCESS:
            return{loading:false,success:true, password:action.payload};
        case PASSWORD_SAVE_FAIL:
            return{ loading:false, error:action.payload};
            default:
                return state

    }
};

function passwordDeleteReducer(
    state = { password: {}},action
){
    switch(action.type){
        case PASSWORD_DELETE_REQUEST:
            return {loading:true};
        case PASSWORD_DELETE_SUCCESS:
            return{loading:false,success:true, product:action.payload};
        case PASSWORD_DELETE_FAIL:
            return{ loading:false, error:action.payload};
            default:
                return state

    }
}

export {passwordListReducer, passwordSaveReducer, passwordDeleteReducer}