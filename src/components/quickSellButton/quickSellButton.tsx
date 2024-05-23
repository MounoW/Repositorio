interface QuickSellButtonProps {
    onQuickSell: () => void;
    quantity: number;
}

export const QuickSellButton = ({ onQuickSell, quantity }: QuickSellButtonProps) => {
    return (
        <div>
            <button type="button" className="quick-sell-format" style={{ fontSize: '13px' }} onClick={onQuickSell}>
                Venda Rápida x{quantity}
            </button>
        </div>
    );
};
