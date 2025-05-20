// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// // import NewApp from './NewApp';
// import App from './App'
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import App from './App';
import NewApp from './NewApp';
import AboutPage from './AboutPage';
import ClassesPage from './ClassesPage';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/classes" element={<ClassesPage />} />
      <Route path="/App" element={<App />} />
      <Route path="/NewApp" element={<NewApp />} />
    </Routes>
  </BrowserRouter>
);


