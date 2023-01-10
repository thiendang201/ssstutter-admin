import { RouteObject, useRoutes } from 'react-router-dom';
import { Navigate } from 'react-router';
import LoginView from 'features/login/LoginView';
import { FC } from 'react';
import Layout from 'common/layout';
import { CategoryListView } from 'features/category/ListView';
import ProductListView from 'features/product/ListView';
import { CategoryFormView } from 'features/category/CategoryFormView';
import { ProductFormView } from 'features/product/ProductFormView';

const routeList: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={'/dashboard'} />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: <></>
      },
      {
        path: 'category',
        children: [
          {
            index: true,
            element: <Navigate to={'list'} />
          },
          {
            path: 'list',
            element: <CategoryListView />
          },
          {
            path: 'add',
            element: <CategoryFormView />
          },
          {
            path: 'edit/:categoryId',
            element: <CategoryFormView />
          }
        ]
      },
      {
        path: 'product',
        children: [
          {
            index: true,
            element: <Navigate to={'list'} />
          },
          {
            path: 'list',
            element: <ProductListView />
          },
          {
            path: 'add',
            element: <ProductFormView />
          },
          {
            path: 'edit/:productId',
            element: <ProductFormView />
          }
        ]
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
    path: '/login',
    element: <LoginView />
  }
];

export const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};
