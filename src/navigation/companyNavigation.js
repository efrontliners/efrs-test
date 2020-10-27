
import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect,withRouter } from "react-router-dom";

//Company central Data Store
import {CompanyProvider} from '../service/companyStore'
import {AuthProviderCp} from '../service/authContextCp'

import HomeCp from '../screens/company/homeCp'
import LoginCp from '../screens/company/loginCp'
import NavbarCp from '../components/navbarCp'
import JobsViewCp from '../screens/company/jobs'
import Recruiters from '../screens/company/recruiters'
import EditInfoCp from '../screens/company/profileCp'
import AddRecruiter from '../screens/company/addRecruiter'
import NavbarCpMobile from '../components/NavBar/nav'
import SignUpCp from '../screens/company/signUp'

const RouterCp = ()=>{
    const[responsive,setResponsive] = useState(false)
    useEffect(()=>{
      if(window.innerWidth <= 700) setResponsive(true)
    })
    return (
      <>

        <CompanyProvider>    
        {/* <NavbarCp/>   */}
        {responsive?<NavbarCpMobile/>:<NavbarCp/>}
        <Switch>  
         <Route exact path='/company/login' component={LoginCp}/> 
         <Route exact path='/company/jobs' component={JobsViewCp}/>
         <Route exact path='/company/profile' component={EditInfoCp}/>
         <Route exact path='/company/recruiters' component={Recruiters}/>
         <Route exact path='/company/recruiters/add' component={AddRecruiter}/>
         <Route exact path='/company/signup' component={SignUpCp}/>
         <Route exact path='/company' component={HomeCp}/>
        </Switch>
        </CompanyProvider>
 
      </>
  ) 
}
export default withRouter(RouterCp)