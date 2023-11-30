import App from '@/App';
import AddCourse from '@/pages/AddCourse';
import CourseDetails from '@/pages/CourseDetails';
import Courses from '@/pages/Courses';
import EnrolledCourses from '@/pages/EnrolledCourses';
import Home from '@/pages/Home';
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
        path: '/enrolledcourses',
        element: <EnrolledCourses />,
      },
    ],
  },
]);

export default routes;
