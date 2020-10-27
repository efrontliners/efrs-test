import React,{useState,useEffect} from 'react'
import axios from 'axios'
import history from '../../components/history'
import {withRouter,Redirect} from 'react-router-dom'
import {useAuth} from '../../service/authContext'

//***TODO****//
//TESTING NEEDS TO BE DONE FOR THE USER AUTHENTICATION AND REDIRECT TO HOME PAGE
//ONLY AFTER TOKEN IS SAVED

function LoginRc(props){
 const[email,setEmail] = useState('')
 const[password,setPassword] = useState('')
 const {loginStateRc,loginRc} = useAuth(); 

 const onChangeEmail = (e)=>{
   setEmail(e.target.value)
 }
 const onChangePassword = (e)=>{
   setPassword(e.target.value)
 }


 return !loginStateRc ? (
     <div className="main">
       <div className="login">
        <div className="containerLogin">
          <div className="row">
            <h3>Email</h3>  
          </div>   
          <div className="row">
           <input 
           className="input"
           name="email"
           placeholder="  Enter your email"
           color={'#d3d3d3'}
           value={email}
           onChange={onChangeEmail}/>
          </div>
          <div className="row">
           <h3>Password</h3>
          </div>
          <div className="row">
           <input 
           className="input"
           placeholder="  Enter your password"
           name="password"
           type="password"
           value={password}
           onChange={onChangePassword}
           />
          </div>
          <div className="row">
          <button onClick={(e)=>loginRc(email,password)}>LOGIN</button>
          </div>
        </div>
       </div>  
     </div>
 ) : ( <Redirect to='/recruiter'/> )
}

export default withRouter(LoginRc)