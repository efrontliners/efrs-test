import React,{useState,useEffect} from 'react'
import '../../styles/stylesMain.css'
import Jobs from '../../assets/images/jobs.png'
import Add from '../../assets/images/add.png'
import {Link,Redirect,withRouter} from 'react-router-dom'
import { useAuth } from '../../service/authContext'


function HomeRc(){
    
    const{loginStateRc}=useAuth()
    
    return loginStateRc? (
        
        <div className="main">

            <div className="rchome">
            <Link to="/recruiter/jobs">
               <div className="rcSelect">
                   <img src={Jobs}/>
                   <h3>JOBS</h3>
               </div>
            </Link>
            
            <Link to='/recruiter/jobs/add'>
               <div className="rcSelect">
                   <img src={Add} />
                   <h3>ADD JOB</h3>
               </div>
            </Link>
            </div>
        </div>
    ) 
    :
    (<Redirect to="/recruiter/login" />)
}

export default  withRouter(HomeRc)