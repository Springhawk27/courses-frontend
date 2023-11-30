import App from '@/App';
import Dashboard from '@/layouts/Dashboard';
import AddCourse from '@/pages/AddCourse';
import CourseDetails from '@/pages/CourseDetails';
import Courses from '@/pages/Courses';
import DashboardHome from '@/pages/DashboardHome';
import EnrolledCourses from '@/pages/EnrolledCourses';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import { createBrowserRouter } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/courses',
        element: <Courses />,
      },
      {
        path: '/courses/:id',
        element: <CourseDetails />,
      },

      {
        path: '/addcourse',
        element: <AddCourse />,
      },

      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: '/dashboard/enrolledcourses',
            element: <EnrolledCourses />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
