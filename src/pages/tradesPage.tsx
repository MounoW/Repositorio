import { AddButton } from '../components/addButton/addButton';
import { Navbar } from '../components/navbar/navbar';
import { Table } from '../components/table/table';

export const TradesPage = () => {
    return (
        <>
            <Navbar />
            <text>Adicionar Troca</text>
            <AddButton />
            <Table />
        </>
    );
};
