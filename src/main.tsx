/* eslint-disable import/namespace */
import 'bootstrap';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { TradesPage } from './pages/tradesPage.tsx';
import { UserPage } from './pages/usersPage.tsx';
import { MarketPage } from './pages/marketPage.tsx';
import { UserDetailPage } from './pages/userDetailPage.tsx';
import App from './App.tsx';

import './index.scss';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <UserPage />
            },
            {
                path: '/trades',
                element: <TradesPage />
            },
            {
                path: '/market',
                element: <MarketPage />
            },
            {
                path: '/user-details/:userid/:email',
                element: <UserDetailPage />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
