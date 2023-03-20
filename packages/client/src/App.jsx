import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SiteWrapper } from './components';
import { DashboardBulletin } from './pages/Dashboard/DashboardBulletin';
import { NewAssessment } from './pages/Assessments/NewAssessment.jsx';
import { Login } from './pages/Assessments/login.jsx';
import { AssessmentList } from './pages/Assessments/AssessmentList';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    element: <DashboardBulletin />,
    path: `/`,
  },
  {
    element: <NewAssessment />,
    path: `/assessment/new`,
  },
  {
    element: <AssessmentList />,
    path: `/assessment`,
  },
  {
    element: <Login />,
    path: `/login`,
  },

]);

const App = () => <SiteWrapper>
  <RouterProvider router={router} />
</SiteWrapper>;

export default App;
