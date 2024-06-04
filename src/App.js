import React, { Suspense, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Navbar from "./HomePage/Navbar";
import SignInPage from "./Login/SignInPage";
import { AuthContext } from "./Hooks/AuthContext";
import { useAuth } from "./Hooks/useAuth";
import Theme from "./Theme/Theme";
function App() {
  const { token, login, logout, userID } = useAuth();
  const auth = useContext(AuthContext);
  let routes;
  if (true) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<HomePage />} />
        <Route path="/store/:storeID" element={<Theme />} />
        <Route path="/buildstore" element={<Theme />} />
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
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userID: userID,
        login: login,
        logout: logout,
      }}
    >
      <div className="App">
        <Router>
          <Routes>{routes}</Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
