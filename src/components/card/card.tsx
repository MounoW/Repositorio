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
    const getColors = (raridade: string) => {
        switch (raridade) {
            case 'Comum':
                return { borderColor: 'gray', textColor: 'gray' };
            case 'Raro':
                return { borderColor: 'blue', textColor: 'blue' };
            case 'Muito Raro':
                return { borderColor: 'green', textColor: 'green' };
            case 'Épico':
                return { borderColor: 'purple', textColor: 'purple' };
            case 'Lendário':
                return { borderColor: 'gold', textColor: 'gold' };
            default:
                return { borderColor: 'white', textColor: 'white' };
        }
    };

    const { borderColor, textColor } = getColors(raridade);

    return (
        <div className="card card-spacing card-size" style={{ border: `8px solid ${borderColor}` }}>
            <img
                style={{ paddingTop: '20px' }}
                src={
                    imagem ||
                    'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'
                }
                className="card-img-top"
                alt="..."
            />
            <div className="card-body text-center">
                <h3 className="card-title">{nome}</h3>
                <h6
                    className="card-title"
                    style={{
                        color: textColor,
                        textShadow:
                            '1px 1px 0 #000, -1px -1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, 1px 0 0 #000, 0 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000',
                        fontSize: '25px'
                    }}
                >
                    {raridade}
                </h6>
            </div>
            {/* Colocar um if para o botao so aparecer caso o utilizador tenha 2 ou mais iguais */}
            <div className="text-center">
                <QuickSellButton />
            </div>
        </div>
    );
};
