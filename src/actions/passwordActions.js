
import Axios from 'axios'

import { PASSWORD_LIST_REQUEST, PASSWORD_LIST_SUCCESS, PASSWORD_LIST_FAIL, PASSWORD_UPDATE_REQUEST, PASSWORD_UPDATE_SUCCESS, PASSWORD_UPDATE_FAIL, PASSWORD_SAVE_REQUEST, PASSWORD_SAVE_SUCCESS, PASSWORD_SAVE_FAIL, PASSWORD_DELETE_REQUEST, PASSWORD_DELETE_SUCCESS, PASSWORD_DELETE_FAIL } from "../constants/passwordConstants.js";

const listPasswords = (activeUser) => async (dispatch, getState) => {
    try{
        dispatch({type:PASSWORD_LIST_REQUEST,payload:{activeUser}});
        const {data} = await Axios.get('https://projectserver10758282.herokuapp.com/pass/'+activeUser._id,{
            headers:{
                Authorization:'Bearer ' +activeUser.token
            }
        } );
        dispatch({type: PASSWORD_LIST_SUCCESS, payload:data})
    } catch(error){
        dispatch({type: PASSWORD_LIST_FAIL, payload:error.message})
    }
}

const storePassword = (title,activeUser,password,id) => async(dispatch,getState) => {
    try{
        if(!id){
            console.log(title,activeUser,password,id);
            dispatch({type:PASSWORD_SAVE_REQUEST, payload:{title,activeUser,password,id}});
            console.log("post")
            const {data} = await Axios.post("https://projectserver10758282.herokuapp.com/pass",{title,activeUser,password,
                headers:{
                    Authorization:'Bearer ' +activeUser.token
                }
            });
            dispatch({type:PASSWORD_SAVE_SUCCESS, payload:data})
        } else{
            console.log(title,activeUser,password,id);
            dispatch({type:PASSWORD_SAVE_REQUEST, payload:{title,activeUser,password,id}});
            console.log("put")
            const {data} = await Axios.put("https://projectserver10758282.herokuapp.com/pass/"+id ,{title,activeUser,password,
                headers:{
                    Authorization:'Bearer ' + activeUser.token
                }
            });
            dispatch({type:PASSWORD_SAVE_SUCCESS, payload:data})
        }
    } catch(error){
        dispatch({type:PASSWORD_SAVE_FAIL, payload:error.message})
    }
}

const deletePassword = (password,activeUser) => async(dispatch) => {
    try{
        dispatch({type:PASSWORD_DELETE_REQUEST, payload: password._id});
        const {data} = await Axios.delete("https://projectserver10758282.herokuapp.com/pass/"+ password._id,{
            headers:{
                'Authorization':'Bearer ' + activeUser.token
            }
        });
        dispatch({type:PASSWORD_DELETE_SUCCESS, payload: data,success:true})
    } catch(error){
        dispatch({type:PASSWORD_DELETE_FAIL, payload: error.message})
    }
}
export {listPasswords, storePassword, deletePassword}