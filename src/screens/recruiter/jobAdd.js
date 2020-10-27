import React,{useState,useEffect} from 'react'
import '../../styles/jobAdd.css'
import {withRouter,Redirect} from 'react-router-dom'
import axios from 'axios'
import history from '../../components/history'
import {useAuth} from '../../service/authContext'
import {RecruiterStore} from '../../service/recruiterStore'
import { Formik,Form,useField, isFunction, validateYupSchema,Field } from 'formik'
import * as yup from 'yup'

// //****TODO***//
// //DATA VALIDATION TO BE DONE USING react-hook-form
// //CURRENTLY THE FORM DATA IS JUST BEING HANDLES BY IT


const MyTextInput = ({label,...props})=>{
    const[field,meta] = useField(props);

    return(
      <>
     <div className="row"> 
      <label htmlFor={props.id||props.name}>{label}</label>
      <input className="text-input input-P" {...field} {...props} />
     </div> 
    
     <div className="row-error"> 
      {meta.touched && meta.error ? (
       <p className="error">*{meta.error}</p>
      ):null}
     </div> 
      </>
    );
  };
  
  const MyTextArea = ({label,...props})=>{
    const[field,meta] = useField(props);

    return(
      <>
     <div className="row"> 
      <textarea className="jobAbt" {...field} {...props}>
      
      </textarea>
     </div> 
    
     <div className="row-error"> 
      {meta.touched && meta.error ? (
       <p className="error">*{meta.error}</p>
      ):null}
     </div> 
      </>
    );
  };

  const validationSchema = yup.object({
    title:yup.string()
    .min(3,"Minimum of 2 Characters allowed")
    .max(250,"Maximum of 250 characters allowed").required("Job Title is required"),
    industry:yup.string().min(2,"Minimum of 2 characters allowed")
    .max(250,"Maximum of 250 characters allowed").required("Industry is required"),
    profession:yup.string().min(2,"Minimum of 2 characters allowed")
    .max(250,"Maximum of 250 characters allowed").required("Job Profession is required"),
    pay:yup.string().max(15,"Please enter a valid Pay"),
    location:yup.string().min(2,"Minimum of 2 Characters required")
    .max(250,"Maximum 250 characters").required("Job Location is required"),
    about:yup.string().max(4500,"Maximum of 4500 characters allowed, Please enter a shorter description").required("Job Description is required"),
  })

function JobAdd(props){
  const[rec,setRec] = useState('')
  const[cp,setCp] = useState('')
  const{loginStateRc,recruiter} = useAuth()
  const{addJob} = RecruiterStore()

  useEffect(()=>{
    getData()
  },[])

  const getData = ()=>{
    setRec(localStorage.getItem('rc'))
    setCp(recruiter.Company)
  }




  const postJob = (data)=>{

     let userData = {
        title:data.title,
        industry:data.industry,
        profession:data.profession,
        pay:data.pay,
        location:data.location,
        about:data.about
     }
     
     addJob(userData)
  }

  return loginStateRc? (
      <>
      <div className="main">

        <div className="login-P">

        
         <Formik 
         initialValues={{
           title:'',
           industry:'',
           profession:'',
           pay:'',
           location:'',
           about:''
         }}

         validationSchema={validationSchema}
         onSubmit={(values)=>{
           console.log(values)
           postJob(values)}}>
         
         
          

         <Form>
            
           <MyTextInput 
             label="Title"
             name="title"
             type="text"
             placeholder="Enter Job Title"
           />

           <MyTextInput 
             label="Industry"
             name="industry"
             type="text"
             placeholder="Enter Industry"
           />

           <MyTextInput 
             label="Profession"
             name="profession"
             type="text"
             placeholder="Enter Job Profession"
           />

           <MyTextInput 
             label="Salary"
             name="pay"
             type="text"
             placeholder="Enter Salary Offered"
           />

           <MyTextInput 
             label="Location"
             name="location"
             type="text"
             placeholder="Enter Job Location"
           />
          
          <div className="row"> 
            <label htmlFor='about'>Job Description</label>
          </div>
     
           <MyTextArea 
           name="about"
           type="text"
           placeholder="Enter Job Description"
           />
           <button type="submit" className="button">ADD JOB</button>
         </Form>
          
         </Formik>
         </div>
      </div>
      </>
  ) : (<Redirect to="/recruiter/login" />)

}

export default withRouter(JobAdd)