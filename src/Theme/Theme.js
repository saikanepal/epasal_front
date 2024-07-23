// Theme.js
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // Import useParams
import useFetch from '../Hooks/useFetch';
import { AuthContext } from '../Hooks/AuthContext';
import Theme1 from './Theme1/Theme1';
import Theme2 from './Theme2/Theme2';
export default function Theme() {
  const [activeTheme, setActiveTheme] = useState(1);
  const [themeNumber, setThemeNumber] = useState(1);
  const { storeID } = useParams(); // Extract storeID using useParams
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const location = useLocation();
  console.log(location,"location")
  useEffect(()=>{
    const fetchStoreTheme=async()=>{
      if(!window.location.pathname.includes("/buildstore")){
      const response=await sendRequest(
        `store/getactiveTheme/${storeID}`,
        'GET',
        null,
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      console.log(response,"response ")
      setActiveTheme(response.activeTheme)
    }
    }
    fetchStoreTheme();
  },[])
  switch (activeTheme){
    case 1:
      return (
        <Theme1/>
      )
    case 2:
      return(
        <Theme2/>
      )
    default:
      return(
        <Theme1/>
      )
  }
}
