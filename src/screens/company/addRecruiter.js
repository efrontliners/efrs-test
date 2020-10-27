
import React,{useState,useEffect} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import { useAuth } from '../../service/authContext'
import{Formik,Form,useField, isFunction, validateYupSchema,Field} from 'formik'
import * as yup from 'yup'
import '../../styles/addRc.css'
import Photo from '../../assets/images/image.png'
import axios from 'axios'
import history from '../../components/history'
import Add from '../../assets/images/addPhoto.png'

const MyTextInput = ({label,...props})=>{
  const[field,meta] = useField(props);
  const {loginStateCp} = useAuth()
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

const validationSchema = yup.object({
  fname:yup.string()
  .min(2,"Minimum of 2 Characters allowed")
  .max(250,"Maximum of 250 characters allowed").required("First Name is required"),
  mname:yup.string().min(2,"Minimum of 2 characters allowed")
  .max(250,"Maximum of 250 characters allowed"),
  lname:yup.string().min(2,"Minimum of 2 characters allowed")
  .max(250,"Maximum of 250 characters allowed"),
  email:yup.string().email().min(6,"Please enter a valid email")
  .max(250,"Email too long").required("Email is required"),
  password:yup.string().min(8,"Password must be minimum 8 characters")
  .max(250,"Password must be less than 250 characters").required("Password is required"),
  confirmPassword:yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  number:yup.string().max(20,"Number should not exceed more than 20 characters").required("Number is required"),
  post:yup.string().max(250,"Maximum of 250 characters allowed").required("Designation is required")
})


function AddRecruiter(){
    const[company,setCompany] = useState('')
    const[recruiter,setRecruiter] = useState('')
    const[image,setImage] = useState()
    const[upload,setUpload]= useState(false)
    

    const{loginStateCp} = useAuth()

    useEffect(()=>{
      getData()
    },[])
    const getData = ()=>{
        setCompany(localStorage.getItem('cp'))
    }
    const addRc = async(data)=>{
      try{
        let userData = {
          email: data.email,
          fname: data.fname,
          mname:data.mname,
          lname: data.lname,
          number: data.number,
          password: data.password,
          post: data.post
        }
        let req = await axios.post(`/cp/add/${company}`,userData)
          .then(res=>{
            if(res.status === 200 || res.status === 'OK'){
              setRecruiter(res.data.Recruiter)
              console.log(res.data)
              setUpload(true)
            }else{
              alert(res.data)
            }
          })
      }catch(e){

      }
    }
    
    const fileChangedHandler = async(event)=>{

      const img = event.target.files[0]
      const imgUrl = URL.createObjectURL(img)
      setImage(img)
      console.log(imgUrl)
      const data = new FormData()
      data.append('photoRc',img)
      let req = await axios.post(`/cp/img/recruiters/${recruiter}`,data)
        .then(res=>{
          
            console.log("Bhejdiye",res.data)
            return history.push('/company/recruiters')
          
          }).catch(e=>{
            return history.push('/company/recruiters')
          })
    }

    return loginStateCp? (
      !upload? <div className="main">
          <div className='login-P'>
            <Formik
              initialValues={{
                email:'',
                password:'',
                confirmPassword:'',
                fname:'',
                mname:'',
                lname:'',
                number:'',
                post:''
              }} 

              validationSchema={validationSchema}
              onSubmit={(values)=>{
                addRc(values)
              }}
            >
             
             <Form>
               <div className="row">
                 <h4>Profile</h4>
               </div>

                 <MyTextInput 
                 label="First Name"
                 name="fname"
                 type="text"
                 placeholder="Enter First Name"
                 />


                 <MyTextInput 
                 label="Middle Name"
                 name="mname"
                 type="text"
                 placeholder="Enter Middle Name"
                 />

                 <MyTextInput 
                 label="Last Name"
                 name="lname"
                 type="text"
                 placeholder="Enter Last Name"
                 />


                 <MyTextInput 
                 label="Designation"
                 name="post"
                 type="text"
                 placeholder="Enter Employee Designation"
                 />

                 <MyTextInput 
                 label="Number"
                 name="number"
                 type="text"
                 placeholder="Enter Contact Number"
                 />

               <div className="row">
                 <h4>Login Credentials</h4>
               </div>
                 <MyTextInput 
                 label="Email"
                 name="email"
                 type="text"
                 placeholder="Enter Email"
                 />

                 <MyTextInput 
                 label="Password"
                 name="password"
                 type="text"
                 placeholder="Enter Password"
                 />
            
          
                 <MyTextInput 
                 label="Confirm Password"
                 name="confirmPassword"
                 type="text"
                 placeholder="Re-Enter the Password"
                 />

               <button className="button" type="submit">ADD</button>               
             </Form>
            </Formik>
          </div>
      </div>
      : <div className="main">
        <div className="login-Pic">
              <img src={image === ''||image ===undefined?Photo:`data:image/jpeg;base64,${image}`} className="logo"/>
              <div className="row">
                <input type="file" name="file" id="file" onChange={fileChangedHandler} placeholder="Choose Image" accept="image/*"/>
                <div className="label">  
                <label htmlFor="file" className="file-upload">
                  <img src={Add} className="jobIcon"/>
                  PROFILE PICTURE
                </label>
                </div>

              </div>
        </div>
      </div>
    ) : (< Redirect to="/company" />)
}

export default withRouter(AddRecruiter)