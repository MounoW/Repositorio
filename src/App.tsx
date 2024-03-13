import { Outlet } from 'react-router-dom';

import { Navbar } from './components/navbar/navbar.tsx';
import './firebase.ts';

import './App.scss';

function App() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default App;
