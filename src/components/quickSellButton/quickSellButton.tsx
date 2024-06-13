interface QuickSellButtonProps {
    onQuickSell: () => void;
    quantity: number;
}
//Função que permite vender os stickers repetidos
export const QuickSellButton = ({ onQuickSell, quantity }: QuickSellButtonProps) => {
    return (
        <div>
            <button type="button" className="quick-sell-format quickSellButtonFormat" onClick={onQuickSell}>
                Venda Rápida x{quantity}
            </button>
        </div>
    );
};
