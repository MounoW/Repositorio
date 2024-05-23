/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
    const [, setUserCredits] = useState<number>(0);
    const auth = getAuth();

    useEffect(() => {
        const fetchPacks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Packs'));
                const packsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Pack[];

                setPacks(packsData);
            } catch (error) {
                console.error('Erro ao buscar os dados: ', error);
            }
        };

        const fetchUserCredits = async () => {
            const user = auth.currentUser;

            if (user) {
                const userDocRef = doc(db, 'Utilizadores', user.uid);

                try {
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        setUserCredits(userDocSnap.data().creditos || 0);
                    }
                } catch (error) {
                    console.error('Erro ao buscar os créditos do usuário: ', error);
                }
            }
        };

        fetchPacks();
        fetchUserCredits();
    }, []);

    const handleBuy = async (pack: Pack) => {
        const user = auth.currentUser;

        if (user) {
            const userDocRef = doc(db, 'Utilizadores', user.uid);

            try {
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userCredits = userDocSnap.data().creditos || 0;

                    if (userCredits >= pack.preco) {
                        const currentCartas: string[] = userDocSnap.data().cartas || [];

                        const newCartas: string[] = [];

                        for (let i = 0; i < pack.quantidade; i++) {
                            // Gera um número aleatório de 001 a 030
                            const randomNum = Math.floor(Math.random() * 30) + 1;
                            const personString = `Pessoa ${String(randomNum).padStart(3, '0')}`;

                            newCartas.push(personString);
                        }

                        // Adiciona as novas cartas ao array existente
                        const updatedCartas = currentCartas.concat(newCartas);

                        // Atualiza o documento do usuário com o novo array de cartas
                        await updateDoc(userDocRef, {
                            cartas: updatedCartas,
                            creditos: userCredits - pack.preco // Deduz o preço do pacote dos créditos do usuário
                        });
                        console.log('Cartas adicionadas com sucesso:', newCartas);
                    } else {
                        console.error('Créditos insuficientes para comprar o pacote.');
                    }
                }
            } catch (error) {
                console.error('Erro ao adicionar as cartas: ', error);
            }
        } else {
            console.error('Nenhum usuário autenticado.');
        }
    };

    return (
        <>
            <table className="table table_spacing">
                <thead>
                    <tr>
                        <th scope="col">Pacote</th>
                        <th className="text-center" scope="col">
                            Preço
                        </th>
                        <th className="text-center quantity-column" scope="col">
                            Quantidade de Cartas
                        </th>
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
                            <td className="text-center">{pack.preco}</td>
                            <td className="text-center quantity-column">{pack.quantidade}</td>
                            <td>C(%)R(%)MR(%)E(%)L(%)</td>
                            <td className="text-center">
                                <button type="button" className="btn btn-outline-success" onClick={() => handleBuy(pack)}>
                                    Comprar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>Legenda: C(Comum), R(Raro), MR(Muito Raro), E(Épico), L(Lendário)</div>
        </>
    );
};
