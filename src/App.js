
import React, { Suspense, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "./HomePage/HomePage";
import Navbar from "./HomePage/Navbar"
import SignInPage from "./Login/SignInPage";
import { AuthContext } from "./Hooks/AuthContext";
import { useAuth } from "./Hooks/useAuth";
import Theme from "./Theme/Theme";
import GetUserLocation from "./Components/Geolocaiton/GetUserLocation";
import Dashboard from "./Components/AdminPanel/Dashboard";
import GoogleOAuth from "./Components/Google-OAuth/GoogleOAuth";
import GoogleOAuthCustom from "./Components/Google-OAuth/GoogleOAuthCustom";
import { PrimeReactProvider } from 'primereact/api';
import ProductForm from "./Theme/Theme1/SubProduct/ProductForm";
import Home from "./Components/AdminPanel/Dashboard/Home/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectLanding1 from "./Components/ProductLanding/ProductLanding1";
import { StoreProvider } from "./Theme/Theme1/T1Context";

function App() {
  const { token, login, logout, userID } = useAuth();
  const auth = useContext(AuthContext);
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<HomePage />} />
        <Route path="/store/:storeID" element={<Theme />} />
        <Route path="/location" element={<GetUserLocation />} />
        <Route path="/buildstore" element={<Theme />} />
        <Route path="/adminpanel/:storeName" element={<Dashboard />} />
        <Route path="/googleoauth" element={<GoogleOAuth />} />
        <Route path="/productform" element={<ProductForm />} />
        <Route path="/store/edit/:storeID" element={<Theme />} />
        <Route path="/googleoauthv1" element={<GoogleOAuthCustom />} />

        {/* Delete this route later */}
        <Route path="/adminhome" element={<Home />} />
        <Route path="/productlanding" element={<ProjectLanding1 />} />

      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInPage />}></Route>

      </React.Fragment>
    );
  }

  return (
    // DELETE STORE PROVIDER LATER
    <StoreProvider >
      <PrimeReactProvider>
        <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userID: userID, login: login, logout: logout }}>
          <div className="App">
            <Router>
              <Routes>
                {routes}
              </Routes>
            </Router>
            <ToastContainer />
          </div>
        </AuthContext.Provider>
      </PrimeReactProvider>
    </StoreProvider>

  );
}

export default App;
