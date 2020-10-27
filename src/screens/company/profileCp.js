//TODO: FETCH COMPANY PROFILE INFO FROM API, IF EXISTIT, USE AS PLACEHOLDER AND VALUE IN STATE, ELSE THE GENERTEXT
import React,{useState,useEffect} from 'react'
import {withRouter,Redirect} from 'react-router-dom'
import axios from 'axios'
import{Formik,Form,useField, isFunction, validateYupSchema,Field} from 'formik'
import '../../styles/basicInfo.css'
import * as Yup from 'yup'
import Photo from '../../assets/images/image.png'
import {useAuth} from '../../service/authContext'
import{CompanyStore} from '../../service/companyStore'
import Add from '../../assets/images/addPhoto.png'


const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>

      <label htmlFor={props.id || props.name}>{label}</label>
     
      <input className="text-input input-P" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
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



function EditInfoCp(){
    // const[companyInfo,setCompanyInfo] = useState({})
    // const[image,setImage] = useState()
    // const[edit,setEdit] = useState(false)


    const {company,editInfoCp,companyLogo,image,setEdit,edit,imgUrl} = CompanyStore()
    const {loginStateCp,baseUrl} = useAuth()
    const[responsive,setResponsive] = useState(false)

    const picChange = (event)=>{
      const img = event.target.files[0]
      const imgUrl = URL.createObjectURL(img)
      console.log(img)
      companyLogo(img)
    }

    useEffect(()=>{
      if(window.innerWidth <= 600) setResponsive(true)
    },[])


    return loginStateCp? ( !edit?
        <div className="main">
         
          <div className="basic-info">
          <div className="row">
            <div className="infoColumn">
             {responsive? 
             <div className="photoColumn">
    
              <img src={`${baseUrl}/${imgUrl}`} className="logo"/>
              <div className="row">
                <input type="file" name="file" id="file" onChange={picChange} placeholder="Choose Image" accept="image/*"/>
                <div className="label">  
                <label htmlFor="file" className="file-upload">
                  <img src={Add} className="jobIcon"/>
                  COMPANY LOGO
                </label>
                </div>

              </div>
        

           </div> : null} 
             <div className="row">
                <h4>Basic Information</h4>
             </div>
             <div className="row">
                <h5>Name</h5>
                <p>{company.name === ''? 'None' : company.name}</p>
            </div>
            <div className="row">
                <h5>Industry</h5>
                <p>{company.industry === ''? 'None' : company.industry}</p>
            </div>
            <div className="row">
                <h5>Number</h5>
                <p>{company.number === ''? 'None' : company.number}</p>
            </div>
            <div className="row">
                <h4>Address</h4>
             </div>
             <div className="row">
                <h5>Building</h5>
                <p>{company.building === ''? 'None' : company.building}</p>
            </div>
            <div className="row">
                <h5>Street</h5>
                <p>{company.street === ''? 'None' : company.street}</p>
            </div>
            <div className="row">
                <h5>City</h5>
                <p>{company.city === ''? 'None' : company.city}</p>
            </div>
            <div className="row">
                <h5>Zip</h5>
                <p>{company.zip === ''? 'None' : company.zip}</p>
            </div>
            </div>  
            {!responsive? 
            
            <div className="photoColumn"> 
             <img src={`${baseUrl}/${imgUrl}`} className="logo"/>
             <div className="row">
               <input type="file" name="file" id="file" onChange={picChange} placeholder="Choose Image" accept="image/*"/>
               <div className="label">  
               <label htmlFor="file" className="file-upload">
                 <img src={Add} className="jobIcon"/>
                 COMPANY LOGO
               </label>
               </div>

             </div>
       

          </div> 
            
            :null}

          </div>  

         <div className="row">
             <h4>About</h4>
         </div>
         <div className="row">
             <p>{company.about === ''? 'None' : company.about}</p>
         </div>
         <button className="button" onClick={()=>setEdit(true)}>Edit</button>
          </div>

        </div>
        :

        <div className="main">
        <div className="login-P">
        <Formik 
           initialValues={company}
           validationSchema={Yup.object({
            name: Yup.string()
              .max(150, "Maximum of 150 characters"),
            number: Yup.string()
              .max(15,"Please enter a valid number"),
            industry: Yup.string()
              .max(150, "Please Enter a valid industry"),
            about: Yup.string()
              .max(2000,"Please enter a shorter description"),
            building : Yup.string().max(150,"Please enter less than 150 characters"),
            street : Yup.string()
              .max(200,"Please enter less than 200 characters"),
            city : Yup.string().max(200,"Please enter less than 200 characters"),
            zip: Yup.string().max(30,"Please enter a zip code lesser than 30 characters")  
    
            })}

            onSubmit={(values)=>{
              alert(JSON.stringify(values, null, 2));
              const info = company
              const data = {
                name:values.name === undefined? info.name : values.name,
                number:values.number === undefined? info.number : values.number,
                about:values.about === undefined? info.about : values.about,
                industry:values.industry === undefined? info.industry : values.industry,
                building:values.building === undefined? info.building: values.building,
                street:values.street === undefined? info.street : values.street,
                city:values.city === undefined? info.city : values.city,
                zip:values.zip === undefined? info.zip: values.zip
              }
              editInfoCp(data)
            }}
        >

          <Form>

          <div className="row">
             <h4>Basic Information</h4>
         </div>
         <div className="row">

         <MyTextInput
         label="Name"
         name="name"
         type="text"
         placeholder={(company.name === '')? 'Enter Company Name' : company.name}
         />
         </div>

         <div className="row">
         <MyTextInput
         label="Industry"
         name="industry"
         type="text"
         placeholder={(company.industry === '')? 'Enter Industry' : company.industry}
         />
         </div>

         <div className="row">
         <MyTextInput
         label="Number"
         name="number"
         type="text"
         placeholder={(company.number === '')? 'Enter Number' : company.number}
         />
         </div>

         <div className="row">
             <h4>Address</h4>
         </div>
         <div className="row">
         <MyTextInput
         label="Building"
         name="building"
         type="text"
         placeholder={(company.building === '')? 'Enter Industry' : company.building}
         />
         </div>

         <div className="row">
         <MyTextInput
         label="Street"
         name="street"
         type="text"
         placeholder={(company.street === '')? 'Enter Street' : company.street}
         />
         </div>
         <div className="row">
         <MyTextInput
         label="City"
         name="city"
         type="text"
         placeholder={(company.city === '')? 'Enter City' : company.city}
         />
         </div>

         <div className="row">
         <MyTextInput
         label="Zip"
         name="zip"
         type="text"
         placeholder={(company.zip === '')? 'Enter Industry' : company.zip}
         />
         </div>
         <div className="row">
             <h4>About</h4>
         </div>
         <div className="row">
           {/* <Field 
           name="about"
           id="about"
           placeholder={(companyInfo.about === '')? '  About' : companyInfo.about}
           /> */}
           <MyTextArea 
           name="about"
           type="text"
           placeholder={(company.about === '')? '  About' : company.about}
           />
           {/* <textarea
           name="about"
           id="about"
          type="text"
           placeholder={(company.about === '')? '  About' : company.about}>
           {(company.about === '')? '  About' : company.about}
           </textarea> */}
         </div>
         <button className="button" type="submit">SAVE</button>

          </Form>
        </Formik>
        </div>
    </div>)
   : (< Redirect to="/company" />) 
    

}

export default withRouter(EditInfoCp)