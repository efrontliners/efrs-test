
import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect,withRouter } from "react-router-dom";

import NavbarRcMobile from '../components/NavBar/navRc'
import NavbarRc from '../components/navbarRc'
import HomeRc from '../screens/recruiter/home'
import LoginRc from '../screens/recruiter/loginRc'
import JobAdd from '../screens/recruiter/jobAdd'
import JobView from '../screens/recruiter/jobView'
import ViewApplications from '../screens/recruiter/applications'
import ViewProfile from '../screens/recruiter/viewProfile'
// import ViewApplicant from '../screens/recruiter/viewApplicant'
import {AuthProviderRc} from '../service/authContextRc'
import {RecruiterProvider} from '../service/recruiterStore'



const RouterRc = ()=>{

    
  const[responsive,setResponsive] = useState(false)
  useEffect(()=>{
    if(window.innerWidth <= 700) setResponsive(true)
  })

    // return loginStateRc ? (
    //     <>
          
    //       <NacbarRc/>  
    //       <Switch>  
    //        <Route exact path='/recruiter/jobs'><JobView/></Route>
    //        <Route exact path='/recruiter/jobs/add'><JobAdd/></Route> 
    //        <Route exact path="/recruiter/jobs/applications" component={ViewApplications}/>
    //        <Route exact path='/recruiter' component={HomeRc}/>
    //       </Switch>

    //     </>
    // ) : ( 
    // <>  
    // <Route exact path='/recruiter/login' component={LoginRc}/>  
    // {/* <Redirect to="/recruiter/login" />  */}
    // </>
    // )

    return (
      <>

       <RecruiterProvider>
         {responsive?<NavbarRcMobile/>:<NavbarRc/>}
     
        <Switch>  
         <Route exact path='/recruiter/login' component={LoginRc}/> 
         <Route exact path='/recruiter' component={HomeRc}/>
         <Route exact path='/recruiter/jobs'><JobView/></Route>
         <Route exact path='/recruiter/jobs/add'><JobAdd/></Route> 
         <Route exact path='/recruiter/jobs/applications/profile'><ViewProfile/></Route> 
         <Route exact path="/recruiter/jobs/applications" component={ViewApplications}/>
        </Switch>
        </RecruiterProvider>   
      
      </>
  ) 
}
export default withRouter(RouterRc)