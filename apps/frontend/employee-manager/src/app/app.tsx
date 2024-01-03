// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Link,
  redirect,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import classes from './app.module.less';
import { FaHouse } from 'react-icons/fa6';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import RootLayout from './pages/RootLayout/RootLayout';
import BlankPage from './pages/BlankPage/BlankPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    handle: {
      crumb: (pathName: string, isActive: boolean, data?: any) => {
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
        element: <BlankPage title="Welcome, Admin" description="" />,
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
          crumb: (pathName: string, isActive: boolean, data?: any) => {
            return isActive ? (
              'Blank'
            ) : (
              <Link to={pathName} className="linkTo">
                Blank
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
