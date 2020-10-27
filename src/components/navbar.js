import React, { useState } from 'react'
import './componentStyles.css'
import Logo from '../assets/images/logosplash.png'
import Img from '../assets/images/image.png'

function NavBarCp(props){

    return(
        <div className="navbar">
            <div className="profile">
              <img src={(props.profileImg === null || props.profileImg === undefined)? Img : props.profileImg} className="profilePic"/>
              <h3 className="name">{(props.companyName === undefined)? 'Company Name' : props.companyName}</h3>
            </div>
            <img src={Logo} className="logoMain"/>
            <ul className="links">
                <li className="linkNav">Recruiters</li>
                <li className="linkNav">Jobs</li>
            </ul>
           
        </div>
    )
}
export default NavBarCp


