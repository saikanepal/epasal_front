import React, { useEffect, useContext, useState } from "react";
import DashboardWrapper from "./DashboardWrapper";
import { SiderBarProvider } from "./SiderBarContext";
import useFetch from "../../Hooks/useFetch";
import { AuthContext } from "../../Hooks/AuthContext";
import Home from "./Dashboard/Home/Home";
import Employee from "./Dashboard/Employee";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditStore from './EditStore/EditStore.js';
import Order from './Dashboard/Order/Order.js';
import Product from "./Product/Product.js";
import General from "./General/General.js";
import Shop from "./Shop/Shop.js";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading"


const Dashboard = () => {
  const auth = useContext(AuthContext);
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let page = searchParams.get('page');
  const date=new Date();
  console.log(date,"page")
  const [dashboardState, setDashboardState] = useState(page ||'General');
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const [store, setStore] = useState(null); // Initialize store as null
  const { storeName } = useParams();
  const [role, setRole] = useState(null);
  const {hasOrder,setHasOrder}=useContext(AuthContext)
  const navigate=useNavigate();

  useEffect(() => {
    if (window.location.pathname.includes("/adminpanel/")) {
      abc();
    }
}, [window.location.pathname]);


  const fetchStore = async () => {


    try {
      const responseData = await sendRequest(
        'store/getStore/' + storeName,
        'GET',
        null,
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token,
        }
      );
      // Handle response data as needed
      toast(responseData?.message)
      setStore(responseData.store);
    } catch (error) {

      // Handle error if needed
      toast(error?.message)


    }
  };

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/login')
    }
    fetchStore();
  }, []);


  useEffect(() => {
    const fetchUserRole = async () => {

      try {
        const userResponse = await sendRequest('users/getLoggedInUser', 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token,
        });
        const userRole = userResponse.user.roles[0].role;

        setRole(userRole);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();


  }, []);

  const renderDashboardContent = (store) => {
    switch (dashboardState) {
      case 'Home':
        if (role === 'Admin' || role === 'Owner' || role === 'Staff') {

          return <Home data={store} />;
        } else {
          return <Order store={store}></Order>
        }

      case 'Employee':
        if (role === 'Admin' || role === 'Owner') {

          return <Employee store={store} />;
        } else {
          return <Home data={store} />;
        }
      case 'Edit Store':
        if (role === 'Admin' || role === 'Owner') {

          return <EditStore store={store} />;
        } else {
          return <Home data={store} />;
        }
      case 'Order':
        return <Order store={store}></Order>
      case 'Product':
        if (role === 'Admin' || role === 'Owner' || role === 'Staff') {

          return <Product store={store}></Product>
        } else {
          return <Home data={store} />;
        }
      case 'General':
        if (role === 'Admin' || role === 'Owner' || role === 'Staff') {

          return <General store={store} setDashboardState={setDashboardState}></General>
        } else {
          return <Order store={store} />;
        }

      case 'Shop':
        return <Shop store={store} ></Shop>
      default:
        if (role === 'Admin' || role === 'Owner' || role === 'Staff') {

          return <Home data={store} />;
        } else {
          return <Order store={store}></Order>
        }

    }
  };

  return (
    isLoading ? <Loading /> :
      <>
        {store && role && (
          <div className=""> {/* Apply overflow styling here */}
            <SiderBarProvider className="overflow-hidden">
              <DashboardWrapper setDashboardState={setDashboardState} store={store} role={role} hasNotification={hasOrder} setHasNotification={setHasOrder}>
                <div className="text-black p-2 py-4 mt-8 overflow-hidden">
                  {renderDashboardContent(store)}
                </div>
              </DashboardWrapper>
            </SiderBarProvider>
          </div >
        )}
      </>
  );
};

export default Dashboard;
function abc(liveChatSource) {
  var s1 = document.createElement('script'),
    s0 = document.getElementsByTagName('script')[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/66827eb5eaf3bd8d4d16c22f/1i1mrtts8';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
}

