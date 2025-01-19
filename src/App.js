import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import GovernmentPage from './pages/government/GovernmentPage';
import RequestDetail from './pages/government/RequestDetail';
import 'bootstrap/dist/css/bootstrap.min.css';


import MediatorPage from './pages/mediator/MediatorPage';

import UserPage from './pages/user/UserPage';
import ApplySubsidy from './pages/user/ApplySubsidy';
import SubsidyForm from './pages/user/SubsidyForm';
import TrackSubsidy from './pages/user/TrackSubsidy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login/:role" element={<LoginPage />} />
        <Route path="/government" element={<GovernmentPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/mediator" element={<MediatorPage />} />
        <Route path="/apply-subsidy" element={<ApplySubsidy />} />
        <Route path="/apply-subsidy/form/:type" element={<SubsidyForm />} />
        <Route path="/track-subsidy" element={<TrackSubsidy />} />
        <Route path="/request/:id" element={<RequestDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
