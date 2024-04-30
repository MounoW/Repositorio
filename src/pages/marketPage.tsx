import { Navbar } from '../components/navbar/navbar';
import { TableMarket } from '../components/tableMarket/tableMarket';

export const MarketPage = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <TableMarket />
            </div>
        </>
    );
};
