import React, {useEffect,useState} from 'react'
import { Link } from "react-router-dom"
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard , faKey, faSearch, faClipboard} from '@fortawesome/free-solid-svg-icons'
import '../App.css'
import { listPasswords, storePassword, deletePassword} from '../actions/passwordActions';
function Homescreen(props) {
    const [counter,setCounter]=useState(0)
    const [title, setTitle] = useState('')
    const [password, setPassword] = useState('')
    const [search, setSearch] = useState('')
    const [id, setId]=useState('')
    const passwordList=useSelector((state)=> state.passwordList)
    const userSignin = useSelector(state=>state.userSignin);
    const userRegister = useSelector(state => state.userRegister);
const {userInfo} = userSignin;
const {userInfo2} = userRegister;
const dispatch = useDispatch();
const handleLogout = () => {
    dispatch(logout());
    props.history.push("/")
    window.location.reload(false);
    
  }

let activeUser;
let userId;
if (userInfo!== {}&& userInfo){
    activeUser = userInfo
    userId = activeUser._id
} else if(userInfo2!=={}&&userInfo2){
    activeUser = userInfo2
    userId = activeUser._id
}


const {passwords, loading,error} = passwordList;
const submitHandler = (e) => {
    e.preventDefault();
    const dispatchTitle = title;
    const dispatchPassword = password;
    setTitle('');
    setPassword('');
    dispatch(storePassword(dispatchTitle,activeUser,dispatchPassword))
    setCounter(counter+1)
    
    
  }
  const autoGenPass = () =>{
    const randomstring = Math.random().toString(36).slice(-11);
    setPassword(randomstring);
  }
  const editHandler=(e)=>{
    e.preventDefault();
    const dispatchTitle = title;
    const dispatchPassword = password;
    setTitle('');
    setPassword('');
    dispatch(storePassword(dispatchTitle,activeUser,dispatchPassword,id));
    setCounter(counter+1);
    createPassword();
      

  }
  const deleteHandler = (password) => {
    dispatch(deletePassword(password, activeUser));
    setCounter(counter+1);
  }
  const editPassword = (password)=>{
    document.querySelector("#createForm").classList.add("hidden")
    document.querySelector("#editForm").classList.remove("hidden")
    setId(password._id)
    setTitle(password.title)
    setPassword(password.password)
    window.scrollTo(0,0)
  }
  const createPassword=()=>{
    document.querySelector("#createForm").classList.remove("hidden")
    document.querySelector("#editForm").classList.add("hidden")
    setId("")
    setTitle('')
    setPassword('')
  }
  const copyToClipboard = (passwordId) => {
      const copyText = document.querySelector("#ID"+passwordId)
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand("copy");
      alert("Password has been copied to clipboard")
  }
  useEffect(() => {
      dispatch(listPasswords(activeUser))
      setCounter(0);
      return () => {
         //
      }
  }, [activeUser,counter,search])
    return (
        <div className="homepagenav">
            {
                activeUser? <h1 className="homepagenav">Welcome {activeUser.name}</h1>:
                <h1><Link to="/login">sign in</Link> or <Link to="register">register</Link></h1>
            }
            {
                activeUser? <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>:
                <text>Sign in if you have an account, or register if you dont</text>
            
        }
        {
            activeUser?<div> 
                <div className="form">
                    <form onSubmit={submitHandler} id="createForm">
                        <ul className="form-container">
                            <li>
                                <h3>Store a new password</h3>
                            </li>
                            <li>
                                <div className="input">
                                    <span><FontAwesomeIcon icon={faAddressCard}/></span><input value={title} placeholder="What is this password/pin for?" type="text" name="title" id="title" onChange={(e)=>setTitle(e.target.value)} />
                                </div>
                            </li>
                            <li>
                                <div className="input">
                                    <span><FontAwesomeIcon icon={faKey}/></span><input value={password} placeholder="Password to store" type="text" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} />
                                </div>
                            </li>
                            <li>
                                <button type="submit"className="signInButton formsubmitbutton" >Store Password</button>
                            </li>
                            <li>
                                <button type="button" classname="createButton" onClick={autoGenPass}>Auto generate a strong password</button>
                            </li>
                        </ul>
                    </form>
                    <form className="hidden" id="editForm" onSubmit={editHandler}>
                        <ul className="form-container">
                            <li>
                                <h3>Edit password</h3>
                            </li>
                            <li>
                                <div className="input">
                                    <span><FontAwesomeIcon icon={faAddressCard}/></span><input value={title} placeholder="What is this password/pin for?" type="text" name="title" id="title" onChange={(e)=>setTitle(e.target.value)} />
                                </div>
                            </li>
                            <li>
                                <div className="input">
                                    <span><FontAwesomeIcon icon={faKey}/></span><input value={password} placeholder="Password to store" type="text" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} />
                                </div>
                            </li>
                            
                            <li>
                                <button type="submit"className="signInButton formsubmitbutton" >Update Password</button>
                            </li>
                            <li>
                                <button type="button" classname="createButton" onClick={createPassword}>Create new password</button>
                            </li>
                            <li>
                                <button type="button" classname="createButton" onClick={autoGenPass}>Auto generate a strong password</button>
                            </li>

                        </ul>
                    </form>
                </div>
                
                
                <h1 className="homepagenav">These are your stored passwords</h1>
                <div className="bar">
                            <div className="input">
                                <span ><FontAwesomeIcon icon={faSearch}/></span><input value={search} placeholder="Search for a password" type="text" name="search" id="password" onChange={(e)=>setSearch(e.target.value)} />
                                <button><span ><FontAwesomeIcon icon={faSearch}/></span></button>
                            </div>
                        </div>
                {
                    loading?<div>loading...</div>:
                    error?<div>{error}</div>:
                    <div className="row">
                        
                        
                        <ul className="storedPasswords">
                            {
                                passwords.map((password)=>
                                {if(!search){
                                    return(<li className="row" id={password._id} key={password._id}>
                                    <div className="password">
                                        <h1>For: {password.title}</h1>
                                        <h3>Password:<span className="spanPassword">{password.password}</span><textarea className="dontSee" value={password.password} id={"ID"+password._id}></textarea></h3>
                                        <div  className="passwordInteractions"><button onClick={()=>editPassword(password)} className="passwordbutton">Edit</button><button onClick={()=>deleteHandler(password)} className="passwordbutton">Delete</button> <button className="copyToClip passwordbutton" onClick={()=>copyToClipboard(password._id)}><FontAwesomeIcon icon={faClipboard}/><span className="tooltip">Copy To Clipboard</span></button> </div>
                                    </div>
                                </li>)
                                
                                } else{
                                    if(password.title.includes(search)){
                                        return(<li className="row" id={password._id} key={password._id}>
                                    <div className="password">
                                        <h1>For: {password.title}</h1>
                                        <h3>Password: <span className="spanPassword">{password.password}</span><textarea className="dontSee" value={password.password} id={"ID"+password._id}></textarea></h3>
                                        <div  className="passwordInteractions"><button onClick={()=>editPassword(password)} className="passwordbutton">Edit</button><button onClick={()=>deleteHandler(password)} className="passwordbutton">Delete</button> <button className="copyToClip passwordbutton" onClick={()=>copyToClipboard(password._id)}><FontAwesomeIcon icon={faClipboard}/><span className="tooltip">Copy to cliboard</span></button> </div>
                                    </div>
                                </li>)
                                    }
                                }}
                                )
                            
                            }
                        </ul>
                    </div>
                }
                </div>:
            <text></text>
        }</div>
    )
}

export default Homescreen
