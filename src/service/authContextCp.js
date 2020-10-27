import React,{createContext,useEffect,useState} from 'react'
import history from '../components/history'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const AuthContextCp = createContext()

const AuthProviderCp = (props) =>{

    const[loginStateCp,setLoginCp] = useState(false)
    const[tokenCp,setTokenCp] = useState('')
    const[company,setCompany] = useState({})
    const[signUp,setSignup] = useState(false)

    const baseUrl = 'http://localhost:5000'


    // useEffect(()=>{
    //   getTokenCp();
    // },[])

    const signUpInfo = ()=>{
      //How to check if profile info updated or Not

    }
    const signUpCP = async (email,password)=>{
       try{
         const req = await axios.post('cp/signup',{
           "email":email,
           "password":password
         }).then(res=>{
            if(res.status === 200 || res.status === 'OK '){
              function setData (item){
                localStorage.setItem('cp',item.Company)
                localStorage.setItem('tkCp',item.Access)

               }
               setData(res.data)
               setLoginCp(true)
               setSignup(true)
               return history.push('/company/profile')
            }
         }).catch(e=>console.log(e))

       }catch(e){

       }
    }
    const loginCp = async (email,passwd)=>{

        const req = await axios.post('/cp/login',{
          "email":email,
          "password":passwd
        }).then((res)=>{
          if(res.status === 200 || res.status === 'OK '){
           function setData (item){
             localStorage.setItem('cp',item.Company)
             localStorage.setItem('tkCp',item.Access)

            }
            setData(res.data)
            setLoginCp(true)
            let object = {
              Name:res.data.Name,
              Photo:res.data.Photo
            }
            setCompany(object)
            return history.push('/company/')
         }else{
           localStorage.removeItem('cp')
           localStorage.removeItem('tkCp')
         }
        }).catch(e=>console.log(e.message))
     }
 
     const getTokenCp = ()=>{
       let token = localStorage.getItem('tkCp')
       if(token){
         setTokenCp(token)
         setLoginCp(true)

       }
     }
     const logoutCp = ()=>{
       localStorage.removeItem('tkCp')
       setTokenCp('')
       setLoginCp(false)
       return history.push('/')
     }

    const authContextValue = {
        
        loginCp,
        loginStateCp,
        logoutCp,
        tokenCp,
        company,
        signUp,
        signUpCP,
        baseUrl
    }

    return <AuthContextCp.Provider  value={authContextValue} {...props} />; 
}

const useAuthCp = ()=> React.useContext(AuthContextCp)

export {AuthProviderCp,useAuthCp}


