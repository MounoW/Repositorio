/* eslint-disable jsx-a11y/anchor-is-valid */

import { QuickSellButton } from '../quickSellButton/quickSellButton';

import './card.scss';
interface CardProps {
    name: string;
    id: number;
    email: string;
}
export const Card = ({ name }: CardProps) => {
    return (
        <div className="card card-spacing card-size">
            <img
                src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg"
                className="card-img-top"
                alt="..."
            />
            <div className="card-body text-center">
                <h5 className="card-title">{name}</h5>
            </div>
            {/* Colocar um if para o botao so aparecer caso o utilizador tenha 2 ou mais iguais */}
            <div className="text-center">
                <QuickSellButton />
            </div>
        </div>
    );
};
