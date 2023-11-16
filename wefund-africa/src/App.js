import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Process from "./components/Process/Process";
import { Provider } from "./components/utils/AppContext";
import LoginPage from "./components/Login/Login";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import Dashboard from "./components/LoginDashboard/Dashboard";
import ApplyNow from "./components/RegisterUser/RegisterUser"
import UserProfile from "./components/UserProfile/UserProfile";
import Lender from "./components/Lenders/Lender";
import Products from "./components/Products/Product";


function App() {
  return (

  <Provider>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lenders" element={<Lender />} />
        <Route path="/products" element={<Products />} />
        <Route path="/process" element={<Process />} />
        <Route path="/register" element={<ApplyNow />} />
        {/* Define your public routes */}
        <Route path="/login" element={<LoginPage />} />

        
        <Route element={ <PrivateRoutes /> } >
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />

        </Route>
        {/* <PrivateRoutes /> */}
      </Routes>
    </div>
  </Provider>
    
  );
}

export default App;
