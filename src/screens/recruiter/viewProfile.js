import React,{useState,useEffect} from 'react'
import '../../styles/viewProfile.css'
import {Redirect, withRouter} from 'react-router-dom'
import {useAuth} from '../../service/authContext'
import {RecruiterStore} from '../../service/recruiterStore'
import Modal from 'react-modal'

import Img from '../../assets/images/image.png'

import Profession from '../../assets/images/profession.png'
import Email from '../../assets/images/email.png'
import Phone from '../../assets/images/phone.png'
import Nationality from '../../assets/images/nationality.png'
import Location from '../../assets/images/location.png'
import Gender from '../../assets/images/gender.png'

//****TODO****//
//NEED TO CREATE A MODAL WHICH WOULD DISPLAY APPLICANT'S DOCUMENTS ON A BUTTON'S CLICK
//url: http://localhost:3500/view/docs/:ad where :ad is the applicant's ID

function ViewProfile(props){

    // const[id,setId] = useState('')


    // const[modalIsOpen,setModalIsOpen] = useState(false)
    // const[responsive,setResponsive] = useState(false)
    const[showDetails,setDetails] = useState()

    const {loginStateRc,baseUrl} = useAuth()
    const{getProfile,getDocs,applicant,docs} = RecruiterStore()

    useEffect(()=>{
       getProfile(props.location.state.Applicant.id)
       getDocs(props.location.state.Applicant.id)
    },[])


    // const getProfile = async(id)=>{

    //   try{

    //     let req =await axios.get(`/rc/view/${id}`).then(res=>{
    //         setApplicant(res.data)
    //     })
    //     // let two = axios.get(`/rc/view/docs/${id}`)
        
    //     // const req = await axios.all([one,two]).then(axios.spread((...responses)=>{
    //     //     let resOne = responses[0]
    //     //     let resTwo = responses[1]

    //     //     setApplicant(resOne.data)
    //     //     setDocs(resTwo.data)
    //     //     console.log(resTwo.data)
    //     // })).catch(e=>console.log(e))
        

    //   }catch(e){

    //   }
  
    // }
    // const getDocs = (id)=>{
    //     let req =  axios.get(`/rc/view/docs/${id}`).then(res=>{
    //         setDocs(res.data)
    //         console.log("Docs",res.data)
    //     })
    // }
    const showDocs = (data)=>{

        function showCerts(data){
            return data.map((item)=>{
            return <div className="listRow-R">
              <div className="rowApp">
                  <img src={`${baseUrl}${item.photo}`} />
              </div>
              <div className="rowApp">
                  <h4>Course : </h4>
                 <h3>{item.course}</h3>
              </div>
              <div className="rowApp">
              <h4>Completed : </h4>
                 <h3>{item.complete}</h3>
              </div>
              <div className="rowApp">
              <h4>Institute : </h4>
                 <h3>{item.institute}</h3>
              </div>
              <div className="rowApp">
              <h4>Location : </h4>
                 <h3>{item.location}</h3>
              </div>

            </div>
        })
       }

       function showExp(data){
        return data.map((item)=>{
            return <div className="listRow-R">
              <div className="rowApp">
                  <img src={`${baseUrl}${item.photo}`} />
              </div>
              <div className="rowApp">
                  <h4>Company : </h4>
                 <h3>{item.company}</h3>
              </div>
              <div className="rowApp">
              <h4>Designation : </h4>
                 <h3>{item.designation}</h3>
              </div>
              <div className="rowApp">
              <h4>Location : </h4>
                 <h3>{item.location}</h3>
              </div>

            </div>
         })
        }

        return <div>
            {showCerts(data.Certificates)}
            {showExp(data.Experience)}
        </div>
    }

    const showCertificates = (item)=>{
        setDetails(item)
   
    }


    return loginStateRc? (
      applicant? <div>

        <div className="profileApp">
                <div className="listHeading-R">
                    <div className="listRow-Dp">
                        <img className="profile-R" src={(applicant.photo === undefined)? Img : `${baseUrl}/${applicant.photo}`}/>
                    </div>
                    <div className="listRow-R">
                      <h4>{applicant.name}</h4>
                      {/* <img src={Next} className="jobIcon"/> */}
                    </div>

                    <div className="listRow-R">
                      <div className="row">
                        <img src={Email} className="jobIcon-R"/>
                        <p>{applicant.email}</p> 
                      </div>
                    </div>

                    <div className="listRow-R">
                      <div className="row">
                        <img src={Gender} className="jobIcon-R"/>
                        <p>{applicant.gender}</p> 
                      </div>
                    </div>

                    <div className="listRow-R">
                      <div className="row">
                        <img src={Phone} className="jobIcon-R"/>
                        <p>{applicant.number}</p> 
                      </div>
                    </div>

                    <div className="listRow-R">
                      <div className="row">
                        <img src={Profession} className="jobIcon-R"/>
                        <p>{applicant.profession}</p> 
                      </div>
                    </div>


                    <div className="listRow-R">
                      <div className="row">
                        <img src={Nationality} className="jobIcon-R"/>
                        <p>{applicant.nationality}</p> 
                      </div>
                    </div>
                    <div className="listRow-R">
                      <div className="row">
                        <img src={Location} className="jobIcon-R"/>
                        <p>{`${applicant.address.building},${applicant.address.street?applicant.address.street:null},${applicant.address.city}`}</p> 
                      </div>
                    </div>
                    <button className="button" onClick={()=>showCertificates(docs)}>
                      View Certificates
                    </button>
                </div>



            </div>
            <div className="appDocs">
              {showDetails?showDocs(showDetails):<p>Loading</p>}
            </div>
        </div> : <p>Loading</p>

        

    ):(<Redirect to="/recruiter/login"/>)
}

export default withRouter(ViewProfile)

