import React,{useState,useEffect} from 'react'
import '../../styles/recruiters.css'
import '../../styles/applications.css'

import Jobs from '../../assets/images/jobs.png'
import Add from '../../assets/images/add.png'
import Delete from '../../assets/images/delete.png'
import Next from '../../assets/images/next.png'
import Right from '../../assets/images/right-arrow.png'
import Profession from '../../assets/images/designation.png'
import Email from '../../assets/images/email.png'
import Phone from '../../assets/images/phone.png'
import Location from '../../assets/images/location.png'
import axios from 'axios'
import { Redirect,Link,withRouter } from "react-router-dom";

import {CompanyStore}  from '../../service/companyStore'
import {useAuth} from '../../service/authContext'
import Img from '../../assets/images/image.png'




function Recruiters(props){
    const[showDetails,setDetails] = useState()
    const[resp,setResp] = useState(false)
    const[img,setImg] = useState()
    const[reload,setReload]= useState(false)
    
  
    useEffect(()=>{
      fetchRecruiters()
    },[])
    const{loginStateCp} = useAuth()
    const{fetchRecruiters,deleteRecruiter,recruiters} = CompanyStore()
    

    const showRecruiters = (value)=>{
        console.log(value)
        const data = value
        return data.map((item)=>{

            return <div className="profileContainer">
                <div className="listHeading-R">
                    <div className="listRow-Dp">
                        <img className="profile-R" src={(item.photo === undefined)? Img : `http://localhost:3500/${item.photo}`}/>
                    </div>
                    <div className="listRow-R">
                      <h4>{item.name}</h4>
                      {/* <img src={Next} className="jobIcon"/> */}
                    </div>
                    <div className="listRow-R">
                      <div className="row">
                        <img src={Profession} className="jobIcon-R"/>
                        <p>{item.designation}</p> 
                      </div>
                    </div>
                    <div className="listRow-R">
                      <div className="row">
                        <img src={Email} className="jobIcon-R"/>
                        <p>{item.email}</p> 
                      </div>
                    </div>
                    <div className="listRow-R">
                      <div className="row">
                        <img src={Phone} className="jobIcon-R"/>
                        <p>{item.number}</p> 
                      </div>
                    </div>
                    <div className="listRow-R">
                      <button id="remove" onClick={()=>deleteRecruiter(item.id)} className="remove">
                        <img src={Delete} className="jobIcon-R" />
                      </button>
                    </div>
                </div>
            </div>
        })
    }

    return loginStateCp? (
        <div>
           <div className="main">

             <div className="mainContainer-R">
             {(recruiters !== null || recruiters !== undefined)?showRecruiters(recruiters):<p>Loading</p>}
             {(recruiters.length <=4)?
             <Link to="/company/recruiters/add">
             <div className="profileContainer add">
               <img className="add-Img" src={Add}/>
               <div className="row">
                 <h3 className="add-H">ADD RECRUITER</h3>
               </div>
             </div>
             </Link> 
             : null }
             </div>

           </div>
        </div>

    ) : (< Redirect to="/company" />)
    
}

export default withRouter(Recruiters)
