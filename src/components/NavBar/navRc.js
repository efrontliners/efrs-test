import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BurgerRc from './burgerRc';
import '../../styles/responsive.css'
import Logo from '../../assets/images/logosplash.png'
import {Link} from 'react-router-dom'
import{RecruiterStore} from '../../service/recruiterStore'
import {useAuth} from '../../service/authContext'
import Img from '../../assets/images/image.png'
import Logout from '../../assets/images/logout.png'


const Nav = styled.nav`
  width: 100vw;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  z-index:1300;
  display: flex;
  background-color:#0b5dbd;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
  }
`

const NavbarRcMobile = () => {
    const{logoutRc,loginStateRc,baseUrl} = useAuth()
    const{recruiter,imgUrl} = RecruiterStore()
    const[responsive,setResponsive] = useState(false)
    useEffect(()=>{
      if(window.innerWidth <= 700) setResponsive(true)
    })

  return loginStateRc?(
    <Nav>
        {!responsive? <div className="profile">
               <img src={(recruiter.photo === null || recruiter.photo === undefined)? Img : `${baseUrl}/${imgUrl}`} className="profilePic"/>
               <Link to="/company/profile">
               <h3 className="name">{(recruiter.fname === undefined)? null : recruiter.fname}</h3>
               </Link>
        </div>:null}
      <Link to='/recruiter/'>
      <div className="logo">
        <img src={Logo} className="logoMain" />
      </div>
      </Link>

      {!responsive? <a className="logout" onClick={logoutRc}>
                <h3>Logout</h3>
                <img className="add" src={Logout}/>
            </a>:null}


      {responsive?<BurgerRc/>:null}
 
    </Nav>
  ):null
}

export default NavbarRcMobile