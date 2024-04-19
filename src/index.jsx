import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Route, 
        createBrowserRouter, 
        createRoutesFromElements, 
        RouterProvider } from 'react-router-dom';

import Header from "./page/Header"
import Home from './page/Home';
import Weather from './page/Weather'



const route= createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Header />}>
    <Route index element={<Home />}/>
    <Route path="weather" element={<Weather />} />

  </Route>
))

function App(){
  return(
    <RouterProvider router={route}/>
  )

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
