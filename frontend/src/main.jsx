import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter}  from "react-router-dom" ;
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from './context/socketContext.jsx';
import GoBackContext from './context/GoBackContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
      <BrowserRouter>
      <AuthContextProvider>
         <SocketContextProvider>
            <GoBackContext>
               <App />
            </GoBackContext>
         </SocketContextProvider>
      </AuthContextProvider>
      </BrowserRouter>
)
