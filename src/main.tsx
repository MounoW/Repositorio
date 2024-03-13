import 'bootstrap';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { UserPage } from './pages/usersPage.tsx';
import { PricingPage } from './pages/pricingPage.tsx';
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
                path: '/pricing',
                element: <PricingPage />
            },
            {
                path: '/user-details/:userid/:email',
                element: <UserDetailPage />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
