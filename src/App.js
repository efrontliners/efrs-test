import React, { useEffect, useState } from 'react';
import './App.css';
import {  Route,withRouter} from 'react-router-dom'


import './styles/responsive.css'
import StartUp from './screens/startup/startup'
import RouterRc from './navigation/recruiterNavigation'
import RouterCp from './navigation/companyNavigation'
import Navbar from './components/NavBar/nav'
import ViewProfile from './screens/recruiter/viewProfile'

import { AuthProvider} from './service/authContext'

function App() {
  

  return (
      <div className="App">
        <AuthProvider>
          <Route exact path="/" component={StartUp}/>  
          <RouterCp/>
          <RouterRc/>
          </AuthProvider>
        
      </div>
  );
}

// export default App;
export default withRouter(App)
