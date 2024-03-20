import React from "react";
import Login from "./pages/Login"
import TypeofUser from "./pages/TypeofUser";
// import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";

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