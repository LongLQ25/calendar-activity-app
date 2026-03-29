import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../features/dashboard/DashboardPage';
import CalendarPage from '../features/calendar/CalendarPage';
import ActivitiesPage from '../features/activity/ActivitiesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'activities', element: <ActivitiesPage /> },
      { path: '/', element: <DashboardPage />, index: true },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
