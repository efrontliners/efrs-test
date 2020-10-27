import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Burger from './burger';
import Logo from '../../assets/images/logosplash.png'
import '../../styles/responsive.css'

import {Link} from 'react-router-dom'
import{CompanyStore} from '../../service/companyStore'
import {useAuth} from '../../service/authContext'
import Img from '../../assets/images/image.png'
import Logout from '../../assets/images/logout.png'


const Nav = styled.nav`
  width: 100vw;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  display: flex;
  background-color:#0b5dbd;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
  }
`

const NavbarCpMobile = () => {
    const{logoutCp,loginStateCp,baseUrl} = useAuth()
    const{company,imgUrl} = CompanyStore()
    const[responsive,setResponsive] = useState(false)
    useEffect(()=>{
      if(window.innerWidth <= 700) setResponsive(true)
    })

  return loginStateCp?(
    <Nav>
        {!responsive? <div className="profile">
               <img src={(company.photo === null || company.photo === undefined)? Img : `${baseUrl}/${imgUrl}`} className="profilePic"/>
               <Link to="/company/profile">
               <h3 className="name">{(company.name === undefined)? null : company.name}</h3>
               </Link>
        </div>:null}
      <Link to='/company/'>
      <div className="logo">
        <img src={Logo} className="logoMain" />
      </div>
      </Link>

      {!responsive?            <a className="logout" onClick={logoutCp}>
                <h3>Logout</h3>
                <img className="add" src={Logout}/>
            </a>:null}


      {responsive?<Burger/>:null}
 
    </Nav>
  ):null
}

export default NavbarCpMobile