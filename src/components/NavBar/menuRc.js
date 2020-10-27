import React from 'react';
import styled from 'styled-components';
import{RecruiterStore} from '../../service/recruiterStore'
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

const RightNavRc = ({ open }) => {
    const{logoutRc,loginStateRc,baseUrl} = useAuth()
    const{recruiter,imgUrl,responsive} = RecruiterStore()

  return (
    <Div className="profile" open={open}>
        
    <img src={(imgUrl === undefined)?Img : `${baseUrl}/${imgUrl}`  } className="profilePic"/>
       
    

    <h3 className="name">{(recruiter)? recruiter.Name : null}</h3>
  
           {/* <button className="button">
           <img src={Edit} className="jobIcon"/>
            Edit Profile
            </button> */}
      

        <button className="button red" onClick={logoutRc}>
        <img src={Logout} className="jobIcon"/>
        Sign Out</button>
  </Div>
  )
}

export default RightNavRc