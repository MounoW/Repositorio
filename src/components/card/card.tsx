/* eslint-disable jsx-a11y/anchor-is-valid */

import { QuickSellButton } from '../quickSellButton/quickSellButton';

import './card.scss';

interface CardProps {
    nome: string;
    equipa_id: string;
    department_id: string;
    raridade: string;
    imagem: string;
}

export const Card = ({ nome, raridade, imagem }: CardProps) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const getBorderColor = (raridade: string) => {
        if (raridade === 'Comum') {
            return 'gray';
        } else if (raridade === 'Raro') {
            return 'blue';
        } else if (raridade === 'Muito Raro') {
            return 'green';
        } else if (raridade === 'Épico') {
            return 'purple';
        } else if (raridade === 'Lendário') {
            return 'gold';
        }

        return 'white';
    };

    const borderColor = getBorderColor(raridade);

    return (
        <div className="card card-spacing card-size" style={{ border: `8px solid ${borderColor}` }}>
            <img
                src={
                    imagem ||
                    'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'
                }
                className="card-img-top"
                alt="..."
            />
            <div className="card-body text-center">
                <h3 className="card-title">{nome}</h3>
                <h6 className="card-title">{raridade}</h6>
            </div>
            {/* Colocar um if para o botao so aparecer caso o utilizador tenha 2 ou mais iguais */}
            <div className="text-center">
                <QuickSellButton />
            </div>
        </div>
    );
};
