import React from 'react';
import '../../styles/stylesMain.css'
import Company from '../../assets/images/company.png'
import Recruiter from '../../assets/images/recruiter.png'
import { Link, withRouter } from "react-router-dom";

function StartUp(){
    return(
        <div className="startup">
            <Link to='/company/login'>
              <div className="startupTab">
               <img src={Company}/>
               <h2>Company</h2>
             </div>
            </Link>

            <Link to="/recruiter/login">
              <div className="startupTab">
               <img src={Recruiter}/>
               <h2>Recruiter</h2>
              </div>           
            </Link>
        </div>
    )
}

export default withRouter(StartUp)