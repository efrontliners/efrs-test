import React,{useState,useEffect} from 'react'


import {withRouter,Redirect} from 'react-router-dom'
import {useAuth} from '../../service/authContext'

//***TODO****//
//TESTING NEEDS TO BE DONE FOR THE USER AUTHENTICATION AND REDIRECT TO HOME PAGE
//ONLY AFTER TOKEN IS SAVED

function SignUpCp(props){
 const[email,setEmail] = useState('')
 const[password,setPassword] = useState('')
 const {loginStateCp,signUpCP} = useAuth(); 

 const onChangeEmail = (e)=>{
   setEmail(e.target.value)
 }
 const onChangePassword = (e)=>{
   setPassword(e.target.value)
 }


 return !loginStateCp ? (
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
           type='password'
           name="password"
           value={password}
           onChange={onChangePassword}
           />
          </div>
          <div className="row">
          <button onClick={(e)=>signUpCP(email,password)}>REGISER</button>
          </div>
        </div>
       </div>  
     </div>
 ) : ( <Redirect to='/company'/> )
}

export default withRouter(SignUpCp)