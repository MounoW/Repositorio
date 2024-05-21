import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import db, { auth } from '../../firebase';

import './navbar.scss';

export const Navbar = () => {
    const [credits, setCredits] = useState(0);
    const [name, setUserName] = useState('');
    const [numCards, setNumCards] = useState(0);

    useEffect(() => {
        const fetchUserData = async (user: User | null) => {
            if (user) {
                // Buscando créditos do usuário
                const userDoc = await getDoc(doc(db, 'Utilizadores', user.uid));

                if (userDoc.exists()) {
                    setCredits(userDoc.data().creditos);
                }

                // Buscando nome do usuário no Firebase Authentication
                setUserName(user.displayName || ''); // Nome do usuário se disponível, senão vazio

                // Buscando número de cartas únicas do usuário
                if (userDoc.exists()) {
                    const userData = userDoc.data();

                    if (userData.cartas) {
                        // Filtrar cartas únicas do usuário
                        const uniqueCards = [...new Set(userData.cartas)];

                        setNumCards(uniqueCards.length);
                    }
                }
            }
        };

        const unsubscribe = onAuthStateChanged(auth, user => {
            fetchUserData(user);
        });

        return () => unsubscribe();
    }, []);

    const cardsText = `${numCards}/30`;

    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-custom-color">
            <div className="container-fluid">
                <a className="navbar-brand" href="/userPage">
                    <img src="images/logo.png" alt="" style={{ width: '150px', height: '60px' }} />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/userPage">
                                Página Inicial
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/market">
                                Mercado
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/trades">
                                Trocas
                            </Link>
                        </li>
                    </ul>
                </div>
                <ul className="nav justify-content-center">
                    <li className="nav-item" style={{ marginRight: '40px', fontSize: '20px' }}>
                        <>Olá {name}!</>
                    </li>
                    <li className="nav-item">
                        <img src="images/marketCarIcon.png" alt="" style={{ width: '35px', height: '30px' }} /> {credits} Créditos
                    </li>
                    <li className="nav-item" style={{ marginLeft: '20px' }}>
                        <img src="images/bookIcon.png" alt="" style={{ width: '45px', height: '30px' }} /> {cardsText}
                    </li>
                </ul>
            </div>
        </nav>
    );
};
