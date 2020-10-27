import React,{useState,useEffect} from 'react'
import '../../styles/jobView.css'
import '../../styles/responsive.css'
import Jobs from '../../assets/images/jobs.png'
import Add from '../../assets/images/add.png'
import Next from '../../assets/images/next.png'
import Close from '../../assets/images/close.png'
import Right from '../../assets/images/right-arrow.png'
import Profession from '../../assets/images/profession.png'
import Location from '../../assets/images/location.png'
import axios from 'axios'
import { Redirect,Link,withRouter } from "react-router-dom";
import {useAuth} from '../../service/authContext'
import Modal from 'react-modal'
import { useTheme } from 'styled-components'


function JobsView(props){
    const[jobs,setjobs] = useState([])
    const[showDetails,setDetails] = useState()
    const [width, setWidth] = React.useState(window.innerWidth);

    const[resp,setResp] = useState(false)
    const[img,setImg] = useState()
    const[modalIsOpen,setModalIsOpen] = useState(false)
    const[responsive,setResponsive] = useState(false)

    useEffect(()=>{
      if(window.innerWidth <= 600) setResponsive(true)
      console.log(window.innerWidth)
      fetchJobs()
    },[])
    
    const {loginStateRc} = useAuth()

    const fetchJobs =async ()=>{
        const token = await localStorage.getItem('tkRc')
        const recruiter =await localStorage.getItem('rc')
        let req = await axios.get(`/rc/${recruiter}/jobs`,{
            headers:{
                "Content-Type":'applicantion/json',
                'authorization':`Bearer ${token}`
            }
        }).then(Response=>{
            if(Response.status === 200){
              setTimeout(()=>{
                setjobs(Response.data)
                setResp(true)     
              },3000)
            }

        })
    }
    const jobDescription = (item)=>{
      return <div className="ll">
      <div className="jobRow">
      {responsive?      <button onClick={()=>setModalIsOpen(false)}>
        <img src={Close} className="jobIcon"/>  
      </button> : null}  
 
      <Link
          to={{
              //Path to applications page
              pathname: '/recruiter/jobs/applications',
              //Job data is passed so it can be displayed on the application's page
              state: {
                Job: item,
              },
          }}>
          <a className="application">VIEW JOB APPLICATIONS<img src={Right} className="jobIcon"/></a>
      </Link>
      
      </div>  

      <div className="jobContainer">
      <div className="jobRow">
          <h4 className="jobTitle">{item.title}</h4>
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


    const showJobDetails = (item) =>{
      setDetails(item)
      if(responsive) setModalIsOpen(true)
 
    }

    const showJobs = (value)=>{
        const data = value
        return data.map((item)=>{

            return <a className="listContainer" onClick={()=>showJobDetails(item) }>
                <div className="listHeading">
                    <div className="listSelect listRow-J">
                      <h4>{item.title.substring(0,40)}..</h4>
                      <img src={Next} className="jobIcon"/>
                    </div>
                    <div className="listRow-J">
                      <div className="row">
                        <img src={Profession} className="jobIcon"/>
                        <p>{item.profession}</p> 
                      </div>
                    </div>
                </div>
            </a>
        })
    }

    return loginStateRc?(
        <div>
           <div className="main">

             <div className="mainContainer">

             <div className="container">

                {(jobs !== null || jobs !== undefined)?showJobs(jobs):<p>Loading</p>}

             </div>

             <div className="jobDetails">

                {(showDetails)?jobDescription(showDetails):null}


             </div>
             <Modal isOpen={modalIsOpen}>
                {(showDetails !== undefined)?jobDescription(showDetails):null}
                {/* {jobDescription(showDetails)} */}
              </Modal>
             </div>

           </div>
        </div>

    ):<Redirect to='/recruiter/login'/>
}

export default withRouter(JobsView)
