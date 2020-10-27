import React,{createContext,useEffect,useState} from 'react'
import history from '../components/history'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const AuthContextRc = createContext()

const AuthProviderRc = (props) =>{
    const[loginStateRc,setLoginRc] = useState(false)
    const[tokenRc,setTokenRc] = useState('')
    const[recruiter,setRecruiter] = useState({})

    const baseUrl = 'http://localhost:5000'


    // useEffect(()=>{

    //   getTokenRc();
    // },[])


    //RECRUITER DATA
    const loginRc = async (email,passwd)=>{

        //  e.preventDefaut()
         const req = await axios.post('/rc/login',{
           "email":email,
           "password":passwd
         }).then((res)=>{
           if(res.status === 200 || res.status === 'OK '){
            function setData(item){
              localStorage.setItem('rc',item.Recruiter)
              localStorage.setItem('tkRc',item.Access)
              localStorage.setItem('cpRc',item.Company)

             }
             setData(res.data)
             setLoginRc(true)
             let object = {
               Name:res.data.Name,
               Photo:res.data.Photo,
               Company:res.data.Company
             }
             setRecruiter(object)
             return history.push('/recruiter/')
           }else{
            localStorage.removeItem('rc')
            localStorage.removeItem('tkRc')
            localStorage.removeItem('cpRc')
           }
         }).catch(e=>console.log(e.message))
    }

    const getTokenRc = ()=>{
      let token =  localStorage.getItem('tkRc')
      if(token){
          setTokenRc(token)
          setLoginRc(true)
      }
    }
    const logoutRc =()=>{

        localStorage.removeItem('rc')
        localStorage.removeItem('tkRc')
        localStorage.removeItem('cpRc')
        setTokenRc('')
        setLoginRc(false)
        return history.push('/')
    }
    


    const authContextValue = {

        baseUrl,
        loginStateRc,
        loginRc,
        logoutRc,
        tokenRc,
        recruiter,
    }

    return <AuthContextRc.Provider  value={authContextValue} {...props} />; 
}

const useAuthRc = ()=> React.useContext(AuthContextRc)

export {AuthProviderRc,useAuthRc}


