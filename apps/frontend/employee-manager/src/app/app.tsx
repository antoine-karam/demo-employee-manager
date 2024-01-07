// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Link,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { FaHouse } from 'react-icons/fa6';

import EmployeePage from './pages/Employee/Employee';
import BlankPage from './pages/BlankPage/BlankPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import RootLayout from './pages/RootLayout/RootLayout';

import classes from './app.module.less';
import Home from './pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    handle: {
      crumb: (pathName: string, isActive: boolean, data?: unknown) => {
        return isActive ? (
          <FaHouse size="1.1rem" />
        ) : (
          <Link to={pathName} className={`linkTo ${classes.homeIcon}`}>
            <FaHouse size="1.1rem" />
          </Link>
        );
      },
    },
    children: [
      {
        index: true,
        element: <Home title="Welcome, Admin" description="This page is just dummy data please proceed to /Employee" />,
      },
      {
        path: '/blank',
        element: (
          <BlankPage
            title="Blank Page"
            description="Prototype of a blank page"
          />
        ),
        handle: {
          crumb: (pathName: string, isActive: boolean, data?: unknown) => {
            return isActive ? (
              'Blank'
            ) : (
              <Link to={pathName} className="linkTo">
                Blank
              </Link>
            );
          },
        },
      },{
        path: '/employee',
        element: (
          <EmployeePage
            title="Employee Page"
            description="Employee Page Property"
          />
        ),
        handle: {
          crumb: (pathName: string, isActive: boolean, data?: unknown) => {
            return isActive ? (
              'Employee'
            ) : (
              <Link to={pathName} className="linkTo">
                Employee
              </Link>
            );
          },
        },
      },
    ],
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
]);
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
