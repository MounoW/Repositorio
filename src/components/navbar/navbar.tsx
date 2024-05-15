import { Link } from 'react-router-dom';

import './navbar.scss';

/* eslint-disable jsx-a11y/anchor-is-valid */
export const Navbar = () => {
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
                    <li className="nav-item">
                        <img src="images\market car.png" alt="" style={{ width: '35px', height: '30px' }} /> 1904 créditos
                    </li>
                    <li className="nav-item" style={{ marginLeft: '20px' }}>
                        <img src="images\bookPin.png" alt="" style={{ width: '45px', height: '30px' }} /> __ /__
                    </li>
                </ul>
            </div>
        </nav>
    );
};
