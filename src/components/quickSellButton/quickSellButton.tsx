interface QuickSellButtonProps {
    onQuickSell: () => void; // Adiciona o prop onQuickSell
}

export const QuickSellButton = ({ onQuickSell }: QuickSellButtonProps) => {
    return (
        <div>
            {/* Chama a função onQuickSell quando o botão for clicado */}
            <button type="button" className="quick-sell-format" onClick={onQuickSell}>
                Venda Rápida x4
            </button>
        </div>
    );
};
