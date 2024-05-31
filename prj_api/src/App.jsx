import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DesignWorksConstruction from './components/DesignWorksConstruction/DesignWorksConstruction.jsx';
import SingleService from './components/singleService/singleService.jsx'
import Admin from './components/admin/admin.jsx';
import ServicesList from './components/servicesList/servicesList.jsx';
import MeetingList from './components/meetingList/meetingList.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DesignWorksConstruction />,
    errorElement: <div>error DesignWorksConstruction</div>,
    children: [
      {
        path: ':id',
        element: <SingleService />,
        errorElement: <div>error SingleService</div>,
      },
    ],
  },
  {
    path: '/admin',
    element: <Admin />,
    errorElement: <div>error Admin</div>,
    children: [
      {
        path: 'services',
        element: <ServicesList />,
        errorElement: <div>error ServicesList</div>,
      },
      {
        path: '',
        element: <ServicesList />,
        errorElement: <div>error ServicesList</div>,
      },
      {
        path: 'meeting',
        element: <MeetingList />,
        errorElement: <div>error MeetingList</div>,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;






