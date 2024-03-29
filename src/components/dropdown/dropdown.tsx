/* eslint-disable jsx-a11y/anchor-is-valid */

import './dropdown.scss';
export const DropDown = () => {
    return (
        <div className="dropdown">
            <button
                className="btn btn-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ marginTop: '30px' }}
            >
                Departamento __ /__
            </button>
            <ul className="dropdown-menu">
                <li>
                    <a className="dropdown-item " href="#">
                        Departamento a
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Departamento b
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Departamento c
                    </a>
                </li>
            </ul>
        </div>
    );
};
