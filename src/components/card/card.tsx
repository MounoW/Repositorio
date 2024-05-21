/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-shadow */

import './card.scss';

import { QuickSellButton } from '../quickSellButton/quickSellButton';

interface CardProps {
    nome: string;
    equipa_id: string;
    department_id: string;
    raridade: string;
    imagem: string;
    id: string;
    userCards: string[];
    removeCard: (cardId: string, raridade: string) => void;
}

export const Card = ({ nome, raridade, imagem, id, userCards, removeCard }: CardProps) => {
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

    const haveCard = userCards.includes(id);

    const numOfRepeatedCards = userCards.filter(cardId => cardId === id).length;

    const showQuickSellButton = numOfRepeatedCards >= 2;

    return (
        <div className="card card-spacing card-size" style={{ border: `8px solid ${borderColor}` }}>
            <img
                style={{ paddingTop: '20px' }}
                src={
                    haveCard
                        ? imagem
                        : 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'
                }
            />
            <div className="card-body text-center">
                <h3 className="card-title" style={{ fontSize: '20px' }}>
                    {nome}
                </h3>
                <h6
                    className="card-title"
                    style={{
                        color: textColor,
                        textShadow:
                            '1px 1px 0 #000, -1px -1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, 1px 0 0 #000, 0 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000',
                        fontSize: '20px'
                    }}
                >
                    {raridade}
                </h6>
            </div>
            {showQuickSellButton && (
                <div className="d-flex justify-content-center" style={{ paddingBottom: '15px' }}>
                    <QuickSellButton onQuickSell={() => removeCard(id, raridade)} quantity={numOfRepeatedCards - 1} />
                </div>
            )}
        </div>
    );
};
