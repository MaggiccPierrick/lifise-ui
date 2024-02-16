import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/home';
import Layout from './components/layout';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Dashboard from './pages/dashboard';
import Transfers from './pages/transfers';
import Operations from './pages/operations';
import Beneficiaries from './pages/beneficiaries';
import Assistance from './pages/assistance';
import Profile from './pages/Profile';
import AdminSignIn from './pages/admin/signin';
import AdminResetPswd from './pages/admin/resetpswd';
import AdminDashboard from './pages/admin/dashboard';
import AdminProfile from './pages/admin/profile';
import AdminUsers from './pages/admin/users';
import AdminUser from './pages/admin/user';
import { Magic } from 'magic-sdk';
import { ALCHEMY_NODE, CHAIN_ID, REACT_APP_MAGIC_PUBLISHABLE_KEY } from './constants';
import Decline from './pages/decline';

function App() {

  const magic = new Magic(REACT_APP_MAGIC_PUBLISHABLE_KEY, { 
    network: {rpcUrl: ALCHEMY_NODE, chainId: CHAIN_ID},
  });

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/signin' exact element={<SignIn magic={magic} />} />
          <Route path='/signup' exact element={<SignUp magic={magic} />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
          <Route path='/transfers' exact element={<Transfers magic={magic} />} />
          <Route path='/operations' exact element={<Operations />} />
          <Route path='/beneficiaries' exact element={<Beneficiaries />} />
          <Route path='/assistance' exact element={<Assistance />} />
          <Route path='/profile' exact element={<Profile />} />
          <Route path='/decline' exact element={<Decline />} />
          <Route path="*" element={<Home />} />
          {/*ADMIN ROUTES*/}
          <Route path='/admin/signin' exact element={<AdminSignIn />} />
          <Route path='/admin/reset' exact element={<AdminResetPswd />} />
          <Route path='/admin/dashboard' exact element={<AdminDashboard />} />
          <Route path='/admin/profile' exact element={<AdminProfile />} />
          <Route path='/admin/users' exact element={<AdminUsers/>} />
          <Route path='/admin/user/:user_uuid' exact element={<AdminUser />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;