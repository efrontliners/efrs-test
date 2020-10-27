import React,{createContext,useEffect,useState} from 'react'
import history from '../components/history'
import axios from 'axios'

const CompanyData = createContext()

const CompanyProvider = (props)=>{
    const companyId = localStorage.getItem('cp')
    // const token = localStorage.getItem('tkCp')

    //Company Jobs
    const[jobs,setjobs] = useState([])
    //Company Recruiters    
    const[recruiters,setRecruiters] = useState([])
    const[recruiter,setRecruiter] = useState('')
    //Company Profile
    const[edit,setEdit] = useState(false)
    const[company,setCompany] = useState({})
    const[image,setImage] = useState()
    const[imgUrl,setUrl] = useState()
    const[responsive,setResponsive] = useState(false)



    useEffect(()=>{
      if(window.innerWidth <= 700) setResponsive(true)   

      if(companyId !== null || companyId !== undefined){
          fetchCompanyProfile()
      }
    },[])

    //Fetching Company Profile
    const fetchCompanyProfile = async()=>{
        try{
           let companyId = await localStorage.getItem('cp')
           let token = await localStorage.getItem('tkCp') 

           const req = await axios.get(`https://efrs-demo.herokuapp.com/cp/profile/${companyId}`,{
            headers:{
                "Content-Type":'applicantion/json',
                'Authorization':`Bearer ${token}` 
            }
        }).then(res=>{
               if(res.status === 200){
                   setUrl(res.data.photo)
                   setCompany(res.data)
               }
           })
        }catch(e){
  
        }
    }

    //Editing Company Information
    const editInfoCp = async (data)=>{
        try{
            let companyId = await localStorage.getItem('cp')
            let token = await localStorage.getItem('tkCp') 

            const req = await axios.patch(`https://efrs-demo.herokuapp.com/cp/profile/${companyId}`,data,{
                headers:{
                    "Content-Type":'applicantion/json',
                    'Authorization':`Bearer ${token}` 
                }
            })
            .then(res=>{
              if(res.status === 200 || res.status === 'OK'){
                setCompany(data)
                setEdit(false)
              }else if(res.status === 400 || res.status === 500){
                alert("Something has went wrong, Please try after some time")  
              }
            })
        }catch(e){
            alert("Something has went wrong, Please try after some time")  
        }
    }
    
    //Company's Logo 
    const companyLogo = async (data)=>{
        try{
            let companyId = await localStorage.getItem('cp')
            let token = await localStorage.getItem('tkCp') 

            const reqData = new FormData()
            reqData.append('logo',data)
            let req = await axios.post(`https://efrs-demo.herokuapp.com/cp/img/profile/${companyId}`,reqData,{
                headers:{
                    "Content-Type":'applicantion/json',
                    'Authorization':`Bearer ${token}` 
                }
            })
             .then(res=>setUrl(res.data)) 
        }catch(e){

            alert("Something has went wrong, Please try after some time") 

        }
    }

    //Fetching all the jobs in the Company's name
    const fetchJobs =async ()=>{
        let companyId = await localStorage.getItem('cp')
        let token = await localStorage.getItem('tkCp') 

        let req = await axios.get(`https://efrs-demo.herokuapp.com/cp/jobs/${companyId}`,{
            headers:{
                "Content-Type":'applicantion/json',
                'Authorization':`Bearer ${token}` 
            }
        }).then(Response=>{
            // console.log(Response.data)
            setjobs(Response.data)  
        })
    }

    //Fetching all the recuiters in the Company's profile
    const fetchRecruiters = async ()=>{
        try{
            let companyId = await localStorage.getItem('cp')
            let token = await localStorage.getItem('tkCp') 

          let req = await axios.get(`https://efrs-demo.herokuapp.com/cp/recruiters/${companyId}`,{
            headers:{
                "Content-Type":'applicantion/json',
                'Authorization':`Bearer ${token}` 
            }
        }).then(res=>{
             if(res.status === 200 || res.status === 'OK'){
                setRecruiters(res.data)
             } 
          })
            
        }catch(e){
            alert("Something has went wrong, Please try after some time") 
        }
    }
    
    

    //Delete a recruiter from Company's profile
    const deleteRecruiter = async (recruiter)=>{
        try{
            let companyId = await localStorage.getItem('cp')
            let token = await localStorage.getItem('tkCp') 
            
           let req = await axios.delete(`https://efrs-demo.herokuapp.com/cp/${companyId}/recruiters/${recruiter}`,{
            headers:{
                "Content-Type":'applicantion/json',
                'Authorization':`Bearer ${token}` 
            }
        }).then(res=>{
            //  setReload(true)
            window.location.reload(false)
           })
        }catch(e){
    
        }
    }

    const values = {
        company,
        jobs,
        fetchJobs,
        fetchRecruiters,
        deleteRecruiter,
        recruiters,
        recruiter,
        editInfoCp,
        companyLogo,
        image,
        imgUrl,
        edit,
        setEdit,
        responsive
    }
    return <CompanyData.Provider value={values} {...props} />;
}

const CompanyStore = ()=> React.useContext(CompanyData)
export {CompanyProvider,CompanyStore}