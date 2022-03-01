import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

import Member from "./pages/Member"
import Paket from "./pages/Paket"
import User from "./pages/User"
import Login from "./pages/Login"
import Header from './header';
import NotFound from './notfound';
import Transaksi from './pages/Transaksi';
import FormTransaksi from './pages/FormTransaksi'

const routing = (
  <BrowserRouter>
  
  <div>

    <Header/>
    <hr/>

    <Routes>
      <Route exact path="/" component={App} />
      <Route path="./pages/Login" component={Login} />
      <Route path="./pages/Member" component={Member} />
      <Route path="./pages/Paket" component={Paket} />
      <Route path="./pages/User" component={User} />
      <Route path="./pages/Transaksi" component={Transaksi} />
      <Route path="./pages/FormTransaksi" component={FormTransaksi} />
      <Route component={NotFound} />
    </Routes>

  </div>

  </BrowserRouter>
)

ReactDOM.render(

  

  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
