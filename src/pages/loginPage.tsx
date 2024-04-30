import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

import { UserPage } from './usersPage.tsx';

import { auth } from '../firebase.ts';

import './loginPage.scss';

export const LoginPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);

            if (result && result.user) {
                setLoggedIn(true);
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    if (loggedIn) {
        return <UserPage />;
    }

    return (
        <>
            <div className="container_login">
                <div className="logo_container">
                    <img src="images/logo.png" alt="" className="logo_image" />
                </div>
                <div className="button_container">
                    <button onClick={handleGoogle} className="button_signin button_container">
                        Fazer Login com o Google
                    </button>
                </div>
            </div>
        </>
    );
};
