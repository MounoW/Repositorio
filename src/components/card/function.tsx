// utils.ts
export const calculateCredits = (raridade: string): number => {
    switch (raridade) {
        case 'Comum':
            return 100;
        case 'Raro':
            return 200;
        case 'Muito Raro':
            return 500;
        case 'Épico':
            return 1000;
        case 'Lendário':
            return 2500;
        default:
            return 0;
    }
};
