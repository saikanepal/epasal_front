import React, { useEffect, useContext, useState } from "react";
import DashboardWrapper from "./DashboardWrapper";
import { SiderBarProvider } from "./SiderBarContext";
import useFetch from "../../Hooks/useFetch";
import { AuthContext } from "../../Hooks/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Home from "./Dashboard/Home/Home";
import Stores from "./Stores/Stores";
import Employee from "./Dashboard/Employee";

import TransactionLogs from "./TransactionLogs/TransactionLogs";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import StoreList from "./StoreList/StoreList";

const AdminDashboard = () => {
  const auth = useContext(AuthContext);
  const [dashboardState, setDashboardState] = useState('Home');
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const [banau, setBanau] = useState(null); // Initialize store as null
  const { storeName } = useParams();
  const [role, setRole] = useState(null);
  const userData = localStorage.getItem('userData');

  let token = auth.token || JSON.parse(userData)?.token;
  const fetchbanau = async () => {
    try {

      const responseData = await sendRequest(
        'banau/getbanau',
        'GET',
        null,
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }
      );
      // Handle response data as needed

      setBanau(responseData.banau);
    } catch (error) {
      // Handle error if needed

      toast.error('Access denied')
      return navigate('/');
    }
  };




  useEffect(() => {
    if (token) {
      fetchbanau();
    }
    else {
      navigate('/login');
    }
  }, []);





  const renderDashboardContent = (store) => {
    switch (dashboardState) {
      case 'Home':
        return <Home />;
      case 'Stores':
        return <Stores />;
      case 'Analytics':
        return <StoreList />;
      case 'Logs':
        return <TransactionLogs />;
      case 'Employee':
        return <Employee banau={store} />;


      // if (role === 'Admin' || role === 'Owner') {

      //   return <Employee store={store} />;
      // } else {
      //   return <Home data={store} />;
      // }
      default:
        return <Home />;
    }
  };

  return (
    isLoading ? <Loading /> :

      <>
        {auth?.token && (
          <div className=""> {/* Apply overflow styling here */}
            <SiderBarProvider className="overflow-hidden">
              <DashboardWrapper setDashboardState={setDashboardState} store={banau}>
                <div className="text-black py-2 px-4 overflow-hidden">
                  {renderDashboardContent(banau)}
                </div>
              </DashboardWrapper>
            </SiderBarProvider>
          </div >
        )}
      </>
  );
};

export default AdminDashboard;
