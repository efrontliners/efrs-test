import React from 'react';
import styled from 'styled-components';
import{CompanyStore} from '../../service/companyStore'
import {useAuth} from '../../service/authContext'
import { Link } from 'react-router-dom'
import Img from '../../assets/images/image.png'
import Logout from '../../assets/images/logout.png'
import Edit from '../../assets/images/edit.png'

const Div = styled.div`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    z-index:999;  
    flex-flow: column nowrap;
    background-color: #ffff;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const RightNav = ({ open }) => {
    const{logoutCp,loginStateCp,baseUrl} = useAuth()
    const{company,imgUrl,responsive} = CompanyStore()

  return (
    <Div className="profile" open={open}>
        
    <img src={(company.photo === null || company.photo === undefined)? Img : `${baseUrl}/${imgUrl}`} className="profilePic"/>
       
    

    <h3 className="name">{(company.name === undefined)? null : company.name}</h3>
  
        <Link to="/company/profile">
           <button className="button">
           <img src={Edit} className="jobIcon"/>
            Edit Profile
            </button>
        </Link>

        <button className="button red" onClick={logoutCp}>
        <img src={Logout} className="jobIcon"/>
        Sign Out</button>
  </Div>
  )
}

export default RightNav