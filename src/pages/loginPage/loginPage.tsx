/* eslint-disable import/order */
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { UserPage } from '../usersPage/usersPage.tsx';

// eslint-disable-next-line import/no-duplicates
import { auth } from '../../firebase.ts'; // Certifique-se de que 'db' é a instância do Firestore
// eslint-disable-next-line import/no-duplicates
import db from '../../firebase.ts';

import './loginPage.scss';

export const LoginPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);

            if (result && result.user) {
                const user = result.user;

                // Referência ao documento do utilizador no Firestore
                const userDocRef = doc(db, 'Utilizadores', user.uid);

                // Verifica se o documento do utilizador já existe
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    // Cria um novo documento para o utilizador
                    await setDoc(userDocRef, {
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        cartas: [],
                        creditos: 60000
                    });
                }

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
    );
};
