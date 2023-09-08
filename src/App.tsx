import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import reqInstance, { setAccessToken } from './axioswrapper';
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom"
import OutlinedCard from './Card';
import ResponsiveDrawer from './Sidebar';
import { Accounts } from './Accounts';
import { Transactions } from './Transactions';
import { Transfer } from './Transfer';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { user } from './user';
import ProgressSpinner from './Progress';
import { Login } from './Login';

function App() {

  const [accounts, setAccounts]: any = useState([]);
  
  const [selectedAccount, setSelectedAccount] = useState();

  const [transferAmount, setTransferAmount] = useState();
  const [toAccount, setToAccount]: any = useState({});
  const [message, setMessage]: any = useState("");

  const [inprogress, setInprogress] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();


  const getAccounts = async () => {
    // const accessToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmNlZWFmNy0yYzZhLTQ0YTgtOWJhYS03ZDQ4MmYwMWI5M2MiLCJjbGllbnRJZCI6ImFpaWF0ZXN0LTdlY2IzZGMwLTMxMWYtNDY0NS05Y2FhLWNlYmVmMGZiMzQ4MCIsInJvbGUiOiJDbGllbnRVc2VyIiwic2Vzc2lvbklkIjoiZTNhMTU1ZWQtODJjMS00NzQ1LWEzOWYtNDAwNWY0MzJjMGYwIiwic2NvcGVzIjoiYWNjb3VudHMgb2ZmbGluZV9hY2Nlc3MgcGF5bWVudHM6aW5ib3VuZCBwYXltZW50czpvdXRib3VuZCIsIm5iZiI6MTY5MzkxODAyNiwiZXhwIjoxNjkzOTIxNjI2LCJpYXQiOjE2OTM5MTgwMjZ9.UEz_TRadW54hwb8GIcGxmBG4G6H4rd5FflcrIblNYbI";
    setAccessToken(user.data.access_token);
    setInprogress(true);
    reqInstance.get("accounts").then(res => {
      console.log(res);
      setInprogress(false);
      setAccounts(res.data.accounts);
    });
  }


  const login = (code: any) => {
    const requestBody = {

      "redirect_uri": "http://localhost:3000/accounts",
      "grant_type": "authorization_code",
      code

    }
    setInprogress(true);
    axios.post(`http://localhost:3002/login`, requestBody).then((res: any) => {
      console.log(res);
      user.data = res.data;
      sessionStorage.setItem("user", JSON.stringify(res.data));
      setMessage("User Logged in Successfully");
      setTimeout(() => {
        setMessage("");
      }, 2500);
      getAccounts();
      setInprogress(false);
      setIsLoggedIn(true);
      navigate("/accounts");
    })
  }

  useEffect(() => {
    let url = window.location.href;

    if (url.indexOf("authorizationId") !== -1) {
      setMessage("Transaction Succeeded");
      setTimeout(() => {
        setMessage("");
      }, 2500);
    } else if (url.indexOf("code") !== -1) {
      const params: any = new URLSearchParams(url.split("?")[1]).entries();
      let codeObj: any = {};
      for (let param of params) {
        codeObj[param[0]] = param[1];
      }
      login(codeObj.code);
    }

    let userData: any = sessionStorage.getItem("user");
    userData = JSON.parse(userData);
    if (userData) {
      user.data = userData;
      getAccounts();
      setIsLoggedIn(true)
      if(!window.location.href.split("/")[3]) {
        navigate("/accounts");
      }
     
    }else {
      setIsLoggedIn(false)
    }

  }, []);

  return (
    <div className="App">
      {message && <Alert className='success-alert' severity="success">
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>}

      {
        (!inprogress && !isLoggedIn) && <Login />
      }
     
      {(isLoggedIn) ? <ResponsiveDrawer accounts={accounts}></ResponsiveDrawer> : ""}
      {
                inprogress && (<ProgressSpinner></ProgressSpinner>)
            }

    </div>
  );
}

export default App;
