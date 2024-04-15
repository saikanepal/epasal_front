
import React, { Suspense, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "./HomePage/HomePage";
import Navbar from "./HomePage/Navbar"
import SignInPage from "./Login/SignInPage";
import { AuthContext } from "./Hooks/AuthContext";
import { useAuth } from "./Hooks/useAuth";
import EStore from "./Estore/EStore";
function App() {
  const { token, login, logout, userID } = useAuth();
  const auth = useContext(AuthContext);
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<HomePage />} />
        <Route path="/buildstore" element={<EStore />} />

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
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userID: userID, login: login, logout: logout }}>
      <div className="App">
        <Router>
          <Routes>
            {routes}
          </Routes>
        </Router>

      </div>
    </AuthContext.Provider>
  );
}

export default App;
