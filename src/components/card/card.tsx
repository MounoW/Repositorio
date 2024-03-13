/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link } from 'react-router-dom';

import './card.scss';
interface CardProps {
    name: string;
    id: number;
    email: string;
}
export const Card = ({ name, email, id }: CardProps) => {
    return (
        <div className="card card-spacing card-size">
            <img
                src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg"
                className="card-img-top"
                alt="..."
            />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{email}</p>
                <Link to={`/user-details/${id}/${email}`} className="btn btn-primary">
                    See Details
                </Link>
            </div>
        </div>
    );
};
