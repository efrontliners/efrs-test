import React, { useEffect } from 'react'
import './componentStyles.css'
import Logo from '../assets/images/logosplash.png'
import Img from '../assets/images/image.png'
import Logout from '../assets/images/logout.png'
import history from '../components/history'
import {useAuth} from '../service/authContext'
import {RecruiterStore} from '../service/recruiterStore'
import {Link } from 'react-router-dom'


function NavBarRc(props){
    const{logoutRc,loginStateRc,baseUrl,recruiter} = useAuth()
    const{imgUrl} = RecruiterStore()
    // const logout =async ()=>{
    //     try{
    //      console.log("out")
    //      await localStorage.removeItem('rc')
    //      await localStorage.removeItem('tkRc')
    //      await localStorage.removeItem('cpRc')
    //      const tk = localStorage.getItem('tkRc')
    //      if(!tk){
    //      history.push('/recruiter/login')
    //      }         
    //     }catch(e){
    //       console.log(e)
    //     } 
    // }

    return loginStateRc? (
        <nav className="navbar">
       
              <div className="profile">
               <img src={imgUrl === undefined?Img:`${baseUrl}/${imgUrl}`} className="profilePic"/>
               <h3 className="name">{recruiter.fname}</h3>
             </div>
   

            <Link to="/recruiter">
              <img src={Logo} className="logoMain"/>
            </Link>

            <div className="navMenu">
            
       
            <a className="logout" onClick={logoutRc}>
                <h3>Logout</h3>
                <img className="add" src={Logout}/>
            </a>
      
            </div>
           
        </nav>
    ) : (null)
}
export default NavBarRc