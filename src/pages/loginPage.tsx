import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

import { UserPage } from './usersPage.tsx';

import { auth } from '../firebase.ts';

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
        <div className="pt-36 w-full flex">
            <button onClick={handleGoogle} className="mx-auto border-4 bg-green-500">
                Sign In With Google
            </button>
        </div>
    );
};
