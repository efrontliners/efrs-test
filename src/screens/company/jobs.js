import React,{useState,useEffect} from 'react'
import '../../styles/jobView.css'
import '../../styles/responsive.css'
import Jobs from '../../assets/images/jobs.png'
import Add from '../../assets/images/add.png'
import Next from '../../assets/images/next.png'
import Right from '../../assets/images/right-arrow.png'
import Profession from '../../assets/images/profession.png'
import Close from '../../assets/images/close.png'
import Location from '../../assets/images/location.png'
import axios from 'axios'
import Modal from 'react-modal'
import { Redirect,Link,withRouter } from "react-router-dom";
import {useAuth} from '../../service/authContext'
import {CompanyStore} from '../../service/companyStore'



function JobsViewCp(props){

    const[showDetails,setDetails] = useState()
    const[selected,setSelected] = useState()
    const[responsive,setResponsive] = useState(false)
    const[modalIsOpen,setModalIsOpen] = useState(false)


    useEffect(()=>{
      if(window.innerWidth <= 600) setResponsive(true)
      fetchJobs()
    },[])
    const{loginStateCp} = useAuth()
    const{jobs,fetchJobs} = CompanyStore()

    const jobDescription = (item)=>{
      return <div className="ll">
      <div className="jobContainer">
      {responsive?      <button onClick={()=>setModalIsOpen(false)}>
        <img src={Close} className="jobIcon-R"/>  
      </button> : null}    
      <div className="jobRow">
          <h4 className="certHeading jobTitle">{item.title}</h4>
        </div>
        <div className="jobRow">
          <h4 className="certHeading">Listed :</h4>
          <p className="certPara">{item.created}</p>
        </div>
        <div className="jobRow">
          <h4 className="certHeading">Profession :</h4>
          <p className="certPara">{item.profession}</p>
        </div>
        <div className="jobRow">
          <h4 className="certHeading">Industry :</h4>
          <p className="certPara">{item.industry}</p>
        </div>
        <div className="jobRow">
          <h4 className="certHeading">Salary :</h4>
          <p className="certPara">{item.pay}</p>
        </div>
        <div className="jobRow">
          <h4 className="certHeading">Location :</h4>
          <p className="certPara">{item.location}</p>
        </div>
        <div className="jobRow">
          <h4 className="certHeading">About :</h4>
        </div>
        <div className="jobRow">
          <p className="certPara">{item.about}</p>
        </div>

     </div>
     <div>
     </div>
     </div>
     
    }
    const showWindow = (item)=>{
      setDetails(item)
      setModalIsOpen(true)
   }

    const showJobs = (value)=>{

        const data = value
        const showJobDetails = (item) =>{
          setDetails(item)
        }

        return data.map((item)=>{

            return <div className="listContainer" onClick={()=>!responsive? showJobDetails(item):showWindow(item)}>
                <div className="listHeading">
                    <div className="listSelect listRow-Cp">
                      <h4>{item.title.substring(0,40)}..</h4>
                      <img src={Next} className="jobIcon"/>
                    </div>
                    <div className="listRow-Cp">
                      <div className="row">
                        <img src={Profession} className="jobIcon"/>
                        <p>{item.profession}</p> 
                      </div>
                      <div className="row">
                        <img src={Location} className="jobIcon"/>
                        <p>{item.location}</p> 
                      </div>
                    </div>
                </div>
            </div>
        })
    }

    return loginStateCp? (
        <div>
           <div className="main">

             <div className="mainContainer">

             <div className="container">
                {(jobs !== null || jobs !== undefined )?showJobs(jobs):<p>Loading</p>}
             </div>

             <div className="jobDetails">
                {(showDetails)?jobDescription(showDetails):null}
             </div>
             <Modal isOpen={modalIsOpen}>
                {(showDetails)?jobDescription(showDetails):null}
                {/* {jobDescription(showDetails)} */}
              </Modal>
             </div>

           </div>
        </div>

    )
    : (<Redirect to="/company"/>)
}

export default withRouter(JobsViewCp)
