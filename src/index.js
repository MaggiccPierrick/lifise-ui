import './assets/fonts/Raleway-Black.ttf';
import './assets/fonts/Raleway-BlackItalic.ttf';
import './assets/fonts/Raleway-Bold.ttf';
import './assets/fonts/Raleway-BoldItalic.ttf';
import './assets/fonts/Raleway-ExtraBold.ttf';
import './assets/fonts/Raleway-ExtraBoldItalic.ttf';
import './assets/fonts/Raleway-ExtraLight.ttf';
import './assets/fonts/Raleway-ExtraLightItalic.ttf';
import './assets/fonts/Raleway-Italic.ttf';
import './assets/fonts/Raleway-Light.ttf';
import './assets/fonts/Raleway-LightItalic.ttf';
import './assets/fonts/Raleway-Medium.ttf';
import './assets/fonts/Raleway-MediumItalic.ttf';
import './assets/fonts/Raleway-Regular.ttf';
import './assets/fonts/Raleway-SemiBold.ttf';
import './assets/fonts/Raleway-SemiBoldItalic.ttf';
import './assets/fonts/Raleway-Thin.ttf';
import './assets/fonts/Raleway-ThinItalic.ttf';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./i18nextInit";
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();