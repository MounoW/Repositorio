/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, getDoc, query, where } from 'firebase/firestore';
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

    const gerarRaridade = (): string => {
        const randomNum = Math.floor(Math.random() * 101); // Gera um número de 0 a 100

        if (randomNum <= 60) return 'Comum';
        if (randomNum <= 75) return 'Raro';
        if (randomNum <= 83) return 'Muito Raro';
        if (randomNum <= 92) return 'Épico';

        return 'Lendário';
    };
    const buscarCartasPorRaridade = async (raridade: string): Promise<string[]> => {
        try {
            const pessoasCollection = collection(db, 'Pessoas');
            const q = query(pessoasCollection, where('raridade', '==', raridade));
            const cartasSnapshot = await getDocs(q);

            return cartasSnapshot.docs.map(doc => doc.id); // Supondo que o ID do documento é a identificação da pessoa/carta
        } catch (error) {
            console.error(`Erro ao buscar cartas de raridade ${raridade}:`, error);

            return [];
        }
    };

    const buscarTodasCartasPorRaridade = async (): Promise<Record<string, string[]>> => {
        const raridades = ['Comum', 'Raro', 'Muito Raro', 'Épico', 'Lendário'];
        const todasCartas: Record<string, string[]> = {};

        const fetchPromises = raridades.map(async raridade => {
            const cartas = await buscarCartasPorRaridade(raridade);

            todasCartas[raridade] = cartas;
        });

        await Promise.all(fetchPromises);

        return todasCartas;
    };

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
                        const newCartasSet = new Set<string>();

                        // Buscar todas as cartas por raridade uma vez
                        const todasCartasPorRaridade = await buscarTodasCartasPorRaridade();

                        while (newCartasSet.size < pack.quantidade) {
                            const raridade = gerarRaridade();
                            const cartasDaRaridade = todasCartasPorRaridade[raridade];

                            if (cartasDaRaridade.length > 0) {
                                const cartaAleatoria = cartasDaRaridade[Math.floor(Math.random() * cartasDaRaridade.length)];

                                newCartasSet.add(cartaAleatoria);
                            } else {
                                console.error(`Nenhuma carta encontrada para a raridade ${raridade}`);
                            }
                        }

                        const newCartas = Array.from(newCartasSet);
                        const updatedCartas = currentCartas.concat(newCartas);

                        // Atualizar o documento do usuário apenas uma vez
                        await updateDoc(userDocRef, {
                            cartas: updatedCartas,
                            creditos: userCredits - pack.preco
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
        <div className="market-page">
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
        </div>
    );
};
