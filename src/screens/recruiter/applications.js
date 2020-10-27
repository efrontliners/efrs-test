import React,{useState,useEffect} from 'react'
import '../../styles/applications.css'
import '../../styles/responsive.css'
import Nationality from '../../assets/images/nationality.png'
import Phone from '../../assets/images/phone.png'
import axios from 'axios'
import {Redirect, withRouter,Link} from 'react-router-dom'
import {useAuth} from '../../service/authContext'
import {RecruiterStore} from '../../service/recruiterStore'



//****TODO****//
//NEED TO CREATE A MODAL WHICH WOULD DISPLAY APPLICANT'S DOCUMENTS ON A BUTTON'S CLICK
//url: http://localhost:3500/view/docs/:ad where :ad is the applicant's ID

function ViewApplications(props){
    const[job,setJob] = useState()
    const[jobId,setJobId]=useState()
    const[id,setId] = useState('')
    const[applicant,setApplicant]= useState()
    const[users,setUsers] = useState([])
    const[resp,setResp] = useState(false)
    const[img,setImg] = useState()

    const[modalIsOpen,setModalIsOpen] = useState(false)
    const[responsive,setResponsive] = useState(false)
    
    const {loginStateRc,baseUrl} = useAuth()



    useEffect(()=>{
      if(window.innerWidth <= 600) setResponsive(true)
        //The job id is being fetched from the jobview page on button click
        setJob(props.location.state.Job)
        setJobId(props.location.state.Job.id)
        getApplicants()
    },[])

    const getApplicants = async ()=>{
        console.log('Baigan ki Job',jobId)
        console.log('Jobbb',job)
        //Need to use the id from localstorage actually
        let token = await localStorage.getItem('tkRc')
     
          let req = await axios.get(`/rc/jobs/${props.location.state.Job.id}/applications`,{
            headers:{
                "Content-Type":'applicantion/json',
                'authorization':`Bearer ${token}`
            }
        }).then(Response=>{
            setUsers(Response.data)
            setResp(true)  

        })
        

        // let getPic = await axios.get('http://localhost:3500/img/a/p/profileAp-1b8ec6f0-c1e5-445d-b276-59541ba2e8cf.jpg',{
        //   headers:{
        //     'Content-Type':'image/jpeg'
        //   }
        // }).then(response=>console.log(response))

    }
    
    // const getProfile = async(id)=>{

    //   try{
    //     await setId(id)
    //     let req = await axios.get(`/rc/view/${id}`,{
    //       headers:{
    //           "Content-Type":'applicantion/json'
    //       }
    //     }).then(Response=>{
    //       setApplicant(Response.data)
    //       console.log("applicant",Response.data) 
    //     }).catch(e=>console.log(e))

    //   }catch(e){

    //   }
  
    // }


    const showApplicants = (value)=>{
        let data = value
        console.log(data)
        return data.map((item)=>{
            return <Link
            to={{
              pathname:'/recruiter/jobs/applications/profile',
              state:{
                Applicant : item
              }
            }}>
           <div className="profileTab">
                <div className="listHeading">
                    <div className="listRow">
                      <div className="picContainer">
                      {/* Need to change the Image url according to user data received */}
                        <img src={`${baseUrl}/${item.photo}`} className="dp"/>
                      </div>

                      <div className="listRow">
                        <div className="containerRows">
                        <div className="listRow">
                        <div className="row">
                        <h3>{item.name}</h3>                        
                        </div>  
                        </div>
                        <div className="listRow">
                          <div className="row">
                            <img src={Nationality}/>
                            <p>{item.nationality}</p>
                          </div>
                          <div className="row">
                            <img src={Phone}/>
                            <p>{item.number}</p>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            </Link>
        })
      

    }

    const showJob = (job)=>{
    return !responsive? <div className="jobAbout">
      <div className="listRow">
       <h4>{job.title}</h4>
      </div>
      <div className="listRow">
       <h5>Industry :</h5> 
       <p> {job.industry}</p>
      </div>
      <div className="listRow">
      <h5>Profession :</h5> 
       <p> {job.profession}</p>
      </div>
      <div className="listRow">
      <h5>Salary :</h5> 
       <p>{job.pay}</p>
      </div>
      <div className="listRow">
      <h5>Location :</h5> 
       <p>{job.location}</p>
      </div>
      <div className="listRow">
      <h5>About :</h5> 
      </div>
      <div className="listRow">
      <p>{job.about}</p>
      </div>

    </div>
    : <div className="jobAbout">
        <div className="listRow">
          <h4>{job.title}</h4>
        </div>
        <div className="listRow">
          <div className="listRow"> 
          <h5>Location :</h5> 
         <p>{job.location}</p>
          </div>
        </div>
        <div className="listRow">
      <h5>Profession :</h5> 
       <p> {job.profession}</p>
      </div> 

    </div>
    }

  //   const showApplicant =  (value)=>{

  //     let getPic = axios.get(`ap/img/profile/${id}`,{
  //       headers:{
  //         'Content-Type':'image/jpeg'
  //       }
  //     }).then(response=>{
  //       setImg(response.data)
  //     }).catch(e=>console.log(e))

  //     const item = value

  //     return <div className="apView">
  //             <div className="listHeading">

  //                   <div className="picContainer">
  //                     <img src={`data:image/jpg;base64,${img}`} className="dpL"/>
  //                   </div>
               
  //                 <div className="containerRows">

  //                     <div className="listRow">
  //                      <h3>{item.name}</h3>                   
  //                     </div>  

  //                     <div className="row">
  //                       <h4 className="title">Gender :</h4>
  //                       <p>{item.gender}</p>
  //                     </div>  
  //                     <div className="row">
  //                       <h4 className="title">Profession :</h4>
  //                       <p>{item.profession}</p>
  //                     </div>
  //                     <div className="row">
  //                       <h4 className="title">Nationality :</h4>
  //                       <p>{item.nationality}</p>
  //                     </div>
  //                     <div className="row">
  //                       <h4 className="title">Email :</h4>
  //                       <p>{item.email}</p>
  //                     </div>
  //                     <div className="row">
  //                       <h4 className="title">Contact :</h4>
  //                       <p>{item.number}</p>
  //                     </div>
  //                     <div className="row">
  //                       <h4 className="title">Date of Birth :</h4>
  //                       <p>{item.dob.substring(0,10)}</p>
  //                     </div>
  //                     <div className="row">
  //                       <h4 className="title">Address :</h4>
  //                       <p>{`${item.address.building}, ${item.address.street}`}</p>
  //                     </div>
  //                     <div className="row">
  //                       <h4 className="title">City :</h4>
  //                       <p>{item.address.city}</p>
  //                     </div>
  //                   </div>
  //             </div>
  //         </div>
   
  // }
    return loginStateRc? (
      props.location.state.Job? <div>

           <div className="main">
             <div className="mainContainer">
             <div className="aboutJob">
              {(job)?showJob(job):null}
             </div>

              <div className="scrollContainer">
                <div className="profileList">

                {(users !== 'No Applications')?showApplicants(users):<p>Loading</p>}

                </div>
              </div>
              {/* {!responsive? <div className="profileView">
                {(applicant)?showApplicant(applicant):null}
              </div> : null} */}


             </div>
           </div>
        </div> : <Redirect to='/recruiter/jobs'/>

    ):(<Redirect to="/recruiter/login"/>)
}

export default withRouter(ViewApplications)

