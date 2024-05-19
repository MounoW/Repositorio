import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import db from '../../firebase';

import './tableMarket.scss';

interface Pack {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
}

export const TableMarket: React.FC = () => {
    const [packs, setPacks] = useState<Pack[]>([]);

    useEffect(() => {
        const fetchPacks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Packs'));
                const packsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Pack[]; // Cast the result to Pack[]

                setPacks(packsData);
            } catch (error) {
                console.error('Erro ao buscar os dados: ', error);
            }
        };

        fetchPacks();
    }, []);

    return (
        <>
            <table className="table table_spacing">
                <thead>
                    <tr>
                        <th scope="col">Pacote</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Quantidade de Cartas</th>
                        <th scope="col">Informações</th>
                        <th className="text-center" scope="col">
                            Comprar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {packs.map(pack => (
                        <tr key={pack.id}>
                            <td>{pack.nome}</td>
                            <td>{pack.preco}</td>
                            <td>{pack.quantidade}</td>
                            <td>C(%)R(%)MR(%)E(%)L(%)</td>
                            <td className="text-center">
                                <button type="button" className="btn btn-outline-success">
                                    Comprar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>Legenda: C(Comun), R(Raro), MR(Muito Raro), E(Épico), L(Lendário)</div>
        </>
    );
};
