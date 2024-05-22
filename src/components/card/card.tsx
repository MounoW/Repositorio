/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/alt-text */
import './card.scss';
import '../quickSellButton/quickSellButton.scss';

import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

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

    const handleRemoveCard = () => {
        removeCard(id, raridade);
        // Exibir notificação de sucesso ao remover a carta
        Toastify({
            text: 'Carta vendida com sucesso!',
            duration: 3000, // Duração em milissegundos
            // Mostrar botão de fechar
            gravity: 'top', // Posição: "top" ou "bottom"
            position: 'center', // Posição: "left", "center" ou "right"
            backgroundColor: '#4CAF50' // Cor de fundo verde indicando sucesso
        }).showToast();
    };

    return (
        <div className="card card-spacing card-size" style={{ border: `6px solid ${borderColor}` }}>
            <img
                style={{ paddingTop: '20px' }}
                src={
                    haveCard
                        ? imagem
                        : 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'
                }
            />
            <div className="card-body text-center">
                <h3 className="card-title" style={{ fontSize: '20px', fontFamily: 'Arial', paddingBottom: '5px' }}>
                    {nome}
                </h3>
                <h6
                    className="card-title"
                    style={{
                        color: textColor,
                        fontSize: '15px',
                        fontFamily: 'Arial'
                    }}
                >
                    {raridade}
                </h6>
            </div>
            {showQuickSellButton && (
                <div className="d-flex justify-content-center" style={{ paddingBottom: '15px' }}>
                    <QuickSellButton onQuickSell={handleRemoveCard} quantity={numOfRepeatedCards - 1} />
                </div>
            )}
        </div>
    );
};
