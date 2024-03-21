import React from "react";
import Login from "./pages/Login"
import TypeofUser from "./pages/TypeofUser";
// import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpEmployer from "./pages/SignUpEmployer";
import SignUpJobSeeker from "./pages/SignUpJobSeeker";
import JobSeekerHomePage from "./pages/JobSeekerNavBar";

const App = () => {
  return (
    // <Router>
    //   <div className="container mx-auto">
    //     <>
    //       <Switch>
    //         <Route path="/signup">
    //           <TypeofUser />
    //         </Route>

    //         <Route path="/">
    //           <Login />
    //         </Route>
    //       </Switch>
    //     </>
    //   </div>
    // </Router>

    <BrowserRouter>
      <div className="container mx-auto">
        <Routes>
          <Route path="/signup" element={<TypeofUser />} />
          <Route exact path="/" element={<Login />} />
          <Route path="/signup-employer" element={<SignUpEmployer />} />
          <Route path="/signup-jobseeker"element={<SignUpJobSeeker />} />
          <Route path="/jobseeker-home-page" element= {<JobSeekerHomePage/>} />
        </Routes>
      </div>
    </BrowserRouter>

    // <div className="text-red-500">
    //   <p>Hello World</p>
    // </div>
    // <Login/>
    // </>

  )
};

export default App