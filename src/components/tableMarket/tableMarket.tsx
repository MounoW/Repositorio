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
    percentagem: {
        Comum: number;
        Raro: number;
        MuitoRaro: number;
        Epico: number;
        Lendario: number;
    };
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

    function randoIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const gerarRaridade = (percentagens: { [key: string]: number }): string => {
        const randomNum = randoIntFromInterval(1, 100);
        let cumulativeProbability = 0;

        for (const raridade of ['Comum', 'Raro', 'Muito Raro', 'Épico', 'Lendário']) {
            cumulativeProbability += percentagens[raridade] || 0;

            if (randomNum <= cumulativeProbability) {
                return raridade;
            }
        }

        console.error('Probabilidades não somam 100:', percentagens);

        return 'Lendário'; // Fallback, should not reach here if percentages sum to 100
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
                            const raridade = gerarRaridade(pack.percentagem);
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
        <div className="table table-responsive">
            <table className="table table_spacing table-bordered">
                <thead>
                    <tr>
                        <th className="text-center pacoteColumnSize" scope="col">
                            Pacote
                        </th>
                        <th className="text-center precoColumnSize" scope="col">
                            Preço
                        </th>
                        <th className="text-center quantity-column quantidadeColumnSize" scope="col">
                            Quantidade de Cartas
                        </th>
                        <th className="informacoesColumnSize" scope="col">
                            Informações
                        </th>
                        <th className="text-center comparColumnSize" scope="col">
                            Comprar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {packs.map(pack => (
                        <tr key={pack.id}>
                            <td className="pacoteTextSize">{pack.nome}</td>
                            <td className="text-center precoTextSize">{pack.preco}</td>
                            <td className="text-center quantidadeTextSize">{pack.quantidade}</td>
                            <td className="informacoesTextSize">C(%)R(%)MR(%)E(%)L(%)</td>
                            <td className="text-center">
                                <button type="button" className="comprar-button" onClick={() => handleBuy(pack)}>
                                    Comprar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="legend" style={{ color: 'white' }}>
                Legenda: C(Comum), R(Raro), MR(Muito Raro), E(Épico), L(Lendário)
            </div>
        </div>
    );
};
