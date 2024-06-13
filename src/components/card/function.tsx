// utils.ts

//Função para associar os créditos de acordo com a raridade
export const calculateCredits = (raridade: string): number => {
    switch (raridade) {
        case 'Comum':
            return 100;
        case 'Raro':
            return 500;
        case 'MuitoRaro':
            return 1000;
        case 'Épico':
            return 2000;
        case 'Lendário':
            return 5000;
        default:
            return 0;
    }
};
