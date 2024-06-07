/* eslint-disable import/namespace */
import 'bootstrap';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { UserPage } from './pages/usersPage.tsx';
import { MarketPage } from './pages/marketPage.tsx';
import { LoginPage } from './pages/loginPage.tsx';
import App from './App.tsx';

import './index.scss';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <LoginPage />
            },
            {
                path: '/userPage',
                element: <UserPage />
            },
            {
                path: '/market',
                element: <MarketPage />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
