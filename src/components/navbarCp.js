import React, { useEffect } from 'react'
import './componentStyles.css'
import Logo from '../assets/images/logosplash.png'
import Img from '../assets/images/image.png'
import Logout from '../assets/images/logout.png'
import history from '../components/history'
import{CompanyStore} from '../service/companyStore'
import {useAuth} from '../service/authContext'
import {Link } from 'react-router-dom'



function NavBarCp(props){
    const{logoutCp,loginStateCp,baseUrl,company} = useAuth()
    const{imgUrl} = CompanyStore()
    
    useEffect(()=>{
       setTimeout(()=>{
        console.log(company)

       },1500) 
    },[])
    return loginStateCp? (
        <nav className="navbar">
       
              <div className="profile">
               <img src={(company.Photo === null || company.Photo === undefined)? Img : `${baseUrl}/${company.Photo}`} className="profilePic"/>
               <Link to="/company/profile">
               <h3 className="name">{(company.name)? company.Name :"Edit Profile"}</h3>
               </Link>
             </div>
   

            <Link to="/company">
              <img src={Logo} className="logoMain"/>
            </Link>

            <div className="navMenu">
            
       
            <a className="logout" onClick={logoutCp}>
                <h3>Logout</h3>
                <img className="add" src={Logout}/>
            </a>
      
            </div>
           
        </nav>
    ) : (<div></div>)
}
export default NavBarCp