import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { magic } from './services/magic';
import { UserContext } from './services/UserContext';
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

function App() {
  const [user, setUser] = useState();

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, set it to {user: null}
  useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      return isLoggedIn
        ? magic.user.getMetadata().then((userData) => setUser(userData))
        : setUser({ user: null });
    });
  }, []);

  return (
    <Router>
      <UserContext.Provider value={[user, setUser]}>
        <Layout>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/signin' exact element={<SignIn />} />
            <Route path='/signup' exact element={<SignUp />} />
            <Route path='/dashboard' exact element={<Dashboard />} />
            <Route path='/transfers' exact element={<Transfers />} />
            <Route path='/operations' exact element={<Operations />} />
            <Route path='/beneficiaries' exact element={<Beneficiaries />} />
            <Route path='/assistance' exact element={<Assistance />} />
            <Route path='/profile' exact element={<Profile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </UserContext.Provider>
    </Router>
  );
}

export default App;