//@ts-nocheck
import { useEffect, useState } from 'react';
import { DocumentData, collection, onSnapshot, query, where } from 'firebase/firestore';

import { Navbar } from '../components/navbar/navbar';
import { TableMarket } from '../components/tableMarket/tableMarket';
import db from '../firebase';

import './marketPage.scss';

export const MarketPage = () => {
    const [cadernetastickers, setCadernetaStickers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const colletionRef = collection(db, 'Caderneta_Stickers');
        const queryToDataBase = query(colletionRef, where('sticker', '>=', 'Artur'), where('sticker', '<=', 'Artur' + '\uf8ff'));

        setIsLoading(true);
        const unsub = onSnapshot(queryToDataBase, querySnapshot => {
            const items: DocumentData[] = [];

            querySnapshot.forEach(doc => {
                items.push(doc.data());
            });
            setCadernetaStickers(items);
            setIsLoading(false);
        });

        return () => {
            unsub();
        };
    }, []);

    return (
        <div className="marketPage-background">
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                {isLoading && (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
                {!isLoading && (
                    <ul className="list-group">
                        {cadernetastickers.map(card => (
                            <li key={card.sticker} className="list-group-item">
                                {card.sticker}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="container">
                    <TableMarket />
                </div>
            </div>
        </div>
    );
};
