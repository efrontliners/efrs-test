import React,{createContext,useEffect,useState} from 'react'
import history from '../components/history'
import axios from 'axios'

const RecruiterData = createContext()

const RecruiterProvider = (props)=>{
    const recruiterId = localStorage.getItem('rc')
    // const token = localStorage.getItem('tkrc')
    // const company = localStorage.getItem('cpRc')
    
    //Recruiter Profile
    const[recruiter,setRecruiter] = useState()
    const[imgUrl,setUrl] = useState()
    const[applicant,setApplicant]= useState()
    const[docs,setDocs] = useState([])



    //Recruiter Jobs
    const[jobs,setJobs] = useState([])

    useEffect(()=>{
      if(recruiterId !== null || recruiterId !== undefined){
        fetchProfile()
      }  
  
    },[])
    
    //Fetch Recruiter Profile
    const fetchProfile = async()=>{
        try{
            let recruiterId = await localStorage.getItem('rc')
            let token = await localStorage.getItem('tkRc')

            let req = await axios.get(`https://efrs-demo.herokuapp.com/rc/profile/${recruiterId}`,{
                headers:{
                  "Content-Type":'applicantion/json',
                  'Authorization':`Bearer ${token}` 
                }
            }).then(res=>{
                if(res.status === 200 || res.status === 'OK'){
                    setRecruiter(res.data)
                    setUrl(res.data.photo)
                    console.log("RC Profile",res.data)
                }
            })
          

        }catch(e){
           console.log(e)
        }
    }

    //Fetch jobs posted by the Recruiter
    const fetchJobs = async ()=>{
        try{
            let recruiterId = await localStorage.getItem('rc')
            let token = await localStorage.getItem('tkRc')

            let req = await axios.get(`https://efrs-demo.herokuapp.com/rc/${recruiterId}/jobs`,{
                headers:{
                    "Content-Type":'applicantion/json',
                    'Authorization':`Bearer ${token}` 
                }
            }).then(res=>{
                if(res.status === 200 || res.status === 'OK'){
                    setJobs(res.data)
                }
            }).catch(e=>{
                alert("Something has went wrong, Please try after some time")  
                // return history.push('/company/home')
            })

        }catch(e){
            alert("Something has went wrong, Please try after some time")  
            // return history.push('/recruiter/')
        }
    }
    
    //Get Applicant's Profile
    const getProfile = async(id)=>{

        try{

            let token = await localStorage.getItem('tkRc')
  
          let req =await axios.get(`https://efrs-demo.herokuapp.com/rc/view/${id}`,{
            headers:{
                "Content-Type":'applicantion/json',
                'Authorization':`Bearer ${token}` 
            }
        }).then(res=>{
              setApplicant(res.data)
          })
          // let two = axios.get(`/rc/view/docs/${id}`)
          
          // const req = await axios.all([one,two]).then(axios.spread((...responses)=>{
          //     let resOne = responses[0]
          //     let resTwo = responses[1]
  
          //     setApplicant(resOne.data)
          //     setDocs(resTwo.data)
          //     console.log(resTwo.data)
          // })).catch(e=>console.log(e))
          
  
        }catch(e){
  
        }
    
      }
      
    //Get Applicant's Documents
      const getDocs =async (id)=>{

        let token = await localStorage.getItem('tkRc')

        let req =  axios.get(`https://efrs-demo.herokuapp.com/rc/view/docs/${id}`,{
            headers:{
                "Content-Type":'applicantion/json',
                'Authorization':`Bearer ${token}` 
            }
        }).then(res=>{
            setDocs(res.data)
            console.log("Docs",res.data)
        })
    }
    

    //Add Job Listing
    const addJob = async(data)=>{
        try{
            let recruiterId = await localStorage.getItem('rc')
            let token = await localStorage.getItem('tkRc')
            let company = await localStorage.getItem('cpRc')

          let jobData = data
         
          const req = await axios.post(`https://efrs-demo.herokuapp.com/rc/add/${recruiterId}/${company}`,jobData,{
            headers:{
                "Content-Type":'application/json',
                'Authorization':`Bearer ${token}` 
            }
        }).then(res=>{
              if(res.status === 200){
                alert("Job successfully added")
                return history.push('/recruiter/')
              }
          }).catch(e=>{
              alert("Something has went wrong, Please try again")
          })
        }catch(e){
            alert("Something has went wrong, Please try again")
        }
    }
    

    const values = {
        jobs,
        fetchJobs,
        recruiter,
        imgUrl,
        getProfile,
        getDocs,
        applicant,
        docs,
        addJob
    }
    return <RecruiterData.Provider value={values} {...props} />;
}

const RecruiterStore = () => React.useContext(RecruiterData)
export {RecruiterProvider,RecruiterStore}