import React,{createContext,useEffect,useState} from 'react'
import history from '../components/history'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = (props) =>{

    const[loginStateCp,setLoginCp] = useState(false)
    const[tokenCp,setTokenCp] = useState('')
    const[company,setCompany] = useState({})
    const[signUp,setSignup] = useState(false)


    const[loginStateRc,setLoginRc] = useState(false)
    const[tokenRc,setTokenRc] = useState('')
    const[recruiter,setRecruiter] = useState({})

    const baseUrl = 'https://efrs-demo.herokuapp.com'


    // useEffect(()=>{
    //   getTokenCp();
    // },[])
    const loginRc = async (email,passwd)=>{

        //  e.preventDefaut()
         const req = await axios.post('https://efrs-demo.herokuapp.com/rc/login',{
           "email":email,
           "password":passwd
         }).then((res)=>{
           if(res.status === 200 || res.status === 'OK '){
            function setData(item){
              localStorage.setItem('rc',item.Recruiter)
              localStorage.setItem('tkRc',item.Access)
              localStorage.setItem('cpRc',item.Company)
             }
             localStorage.removeItem('cp')
             localStorage.removeItem('tkCp')
             setData(res.data)
             setLoginRc(true)
             setLoginCp(false)
             let object = {
               Name:res.data.Name?res.data.Name:'',
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
          setLoginCp(false)
      }
    }
    const logoutRc =()=>{

        localStorage.removeItem('rc')
        localStorage.removeItem('tkRc')
        localStorage.removeItem('cpRc')
        localStorage.removeItem('cp')
        localStorage.removeItem('tkCp')
        setTokenRc('')
        setLoginRc(false)
        setLoginCp(false)
        return history.push('/')
    }
    

    const signUpInfo = ()=>{
      //How to check if profile info updated or Not

    }
    const signUpCP = async (email,password)=>{
       try{
         const req = await axios.post('https://efrs-demo.herokuapp.com/cp/signup',{
           "email":email,
           "password":password
         }).then(res=>{
            if(res.status === 200 || res.status === 'OK '){
              function setData (item){
                localStorage.setItem('cp',item.Company)
                localStorage.setItem('tkCp',item.Access)

               }
               setData(res.data)
               localStorage.removeItem('rc')
               localStorage.removeItem('tkRc')
               localStorage.removeItem('cpRc')
               setLoginCp(true)
               setLoginRc(false)
               setSignup(true)
               return history.push('/company/profile')
            }
         }).catch(e=>console.log(e))

       }catch(e){

       }
    }
    const loginCp = async (email,passwd)=>{

        const req = await axios.post('https://efrs-demo.herokuapp.com/cp/login',{
          "email":email,
          "password":passwd
        }).then(async(res)=>{
          if(res.status === 200 || res.status === 'OK '){
           function setData (item){
             localStorage.setItem('cp',item.Company)
             localStorage.setItem('tkCp',item.Access)

            }
            await setData(res.data)
            let object = {
                Name:res.data.Name,
                Photo:res.data.Photo
              }
              setCompany(object)
            setLoginCp(true)
            setLoginRc(false)
            localStorage.removeItem('rc')
            localStorage.removeItem('tkRc')
            localStorage.removeItem('cpRc')

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
         setLoginRc(false)

       }
     }
     const logoutCp = ()=>{
       localStorage.removeItem('tkCp')
       localStorage.removeItem('rc')
       localStorage.removeItem('tkRc')
       localStorage.removeItem('cpRc')
       localStorage.removeItem('cp')
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
        baseUrl,


        loginStateRc,
        loginRc,
        logoutRc,
        tokenRc,
        recruiter,
    }

    return <AuthContext.Provider  value={authContextValue} {...props} />; 
}

const useAuth = ()=> React.useContext(AuthContext)

export {AuthProvider,useAuth}


