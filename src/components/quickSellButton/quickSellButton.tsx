import './quickSellButton.scss';

export const QuickSellButton = () => {
    return (
        <div>
            <button type="button" className="quick-sell-format">
                {/* temos de fazer o count consoante o numero de cartas iguais que o utilizador tem  em vez do x4 */}
                Venda Rápida x4
            </button>
        </div>
    );
};
