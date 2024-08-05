import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom'

import App from './components/App';

//import CSS
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhHwat3cuKXhEUcYBYoTtBdKjTCLidqbs",
  authDomain: "react-chat-3e6ca.firebaseapp.com",
  projectId: "react-chat-3e6ca",
  storageBucket: "react-chat-3e6ca.appspot.com",
  messagingSenderId: "326364609308",
  appId: "1:326364609308:web:096310f123e15f5a1e58d9"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);