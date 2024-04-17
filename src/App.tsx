import { Outlet } from 'react-router-dom';

import './firebase.ts';

import './App.scss';

function App() {
    return (
        <>
            <Outlet />
        </>
    );
}

export default App;
