import React,{useState,useEffect} from 'react'
import '../../styles/stylesMain.css'
import Jobs from '../../assets/images/jobs.png'
import Office from '../../assets/images/office.png'
import {Link,Redirect,withRouter} from 'react-router-dom'
import { useAuth } from '../../service/authContext'




function HomeCp(){
    
  const{loginStateCp}=useAuth()
  
  return loginStateCp? (
      
      <div className="main">

          <div className="rchome">
          <Link to="/company/jobs">
             <div className="rcSelect">
                 <img src={Jobs}/>
                 <h3>JOBS</h3>
             </div>
          </Link>
          
          <Link to='/company/recruiters'>
             <div className="rcSelect">
                 <img src={Office} />
                 <h3>RECRUITERS</h3>
             </div>
          </Link>
          </div>
      </div>
  ) 
  :
  (<Redirect to="/company/login" />)
}

export default  withRouter(HomeCp)