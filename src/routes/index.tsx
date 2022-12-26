import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router';
import LoginView from 'features/login/LoginView';

const routerList: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/dashboard'} />
  },
  {
    path: '/',
    element: <></>,
    children: [
      {
        path: 'dashboard',
        element: <></>
      },
      {
        path: 'category',
        element: <></>
      },
      {
        path: 'product',
        element: <></>
      },
      {
        path: 'sale',
        element: <></>
      },
      {
        path: 'collection',
        element: <></>
      },
      {
        path: 'receipt',
        element: <></>
      },
      {
        path: 'user',
        element: <></>
      }
    ]
  },
  {
    path: '/public/login',
    element: <LoginView />
  }
];

export const router = createBrowserRouter(routerList);
