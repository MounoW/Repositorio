/* eslint-disable react/no-unknown-property */
/* eslint-disable import/order */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
//@ts-nocheck
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './usersPage.scss';

import { Card } from '../../components/card/card';
import { Navbar } from '../../components/navbar/navbar';
import { DropDown } from '../../components/dropdown/dropdown';
import db from '../../firebase';
//Estrutura com o tipo dos componentes do User
interface UserInfo {
    id: string;
    nome: string;
    raridade: string;
    equipa_id: string;
    department_id: string;
    imagem: string;
}
//Estrutura com o tipo dos componentes das Equipas
interface TeamInfo {
    id: string;
    nome: string;
    department_id: string;
    department_nome: string;
}

export const UserPage = () => {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [teams, setTeams] = useState<TeamInfo[]>([]);
    const [userCards, setUserCards] = useState<string[]>([]);
    const [departmentId, setDepartmentId] = useState<string>('Todos');
    const [userCredits, setUserCredits] = useState<number>(0);

    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        if (!userId) return;
        //Acede aos documentos da coleção ´Pessoas' e atualiza o estado 'users'
        const fetchUsers = async () => {
            try {
                const pessoasCollection = collection(db, 'Pessoas');
                const pessoasSnapshot = await getDocs(pessoasCollection);
                const pessoasList = pessoasSnapshot.docs.map(doc => ({
                    id: doc.id,
                    nome: doc.data().nome,
                    raridade: doc.data().raridade,
                    equipa_id: doc.data().equipa_id,
                    department_id: doc.data().department_id,
                    imagem: doc.data().imagem
                }));

                setUsers(pessoasList);
            } catch (error) {
                console.error('Erro ao buscar documentos: ', error);
            }
        };
        //Função que permite aceder às coleções 'Departamento' e 'Equipas' no Firestore, mapeando os nomes dos departamentos e atualizando o estado teams
        const fetchTeams = async () => {
            try {
                const departamentosCollection = collection(db, 'Departamento');
                const departamentosSnapshot = await getDocs(departamentosCollection);
                const departamentosMap = departamentosSnapshot.docs.reduce((map, doc) => {
                    map[doc.id] = doc.data().nome;

                    return map;
                }, {});

                const equipasCollection = collection(db, 'Equipas');
                const equipasSnapshot = await getDocs(equipasCollection);
                const equipasList = equipasSnapshot.docs.map(doc => ({
                    id: doc.id,
                    nome: doc.data().nome,
                    department_id: doc.data().department_id,
                    department_nome: departamentosMap[doc.data().department_id] // Mapeia o nome do departamento
                }));

                setTeams(equipasList);
            } catch (error) {
                console.error('Erro ao buscar documentos: ', error);
            }
        };
        //Verifica alterações nos documentos da coleção 'Utilizadores', atualizando userCards e userCredits quando há mudanças.
        const fetchUserCards = async () => {
            const collectionRef = collection(db, 'Utilizadores');
            const unsub = onSnapshot(collectionRef, querySnapshot => {
                const items = [];

                querySnapshot.forEach(doc => {
                    if (doc.id === userId) {
                        items.push(doc.data());
                    }
                });

                if (items.length > 0) {
                    setUserCards(items[0].cartas || []);
                    setUserCredits(items[0].creditos || 0);
                }
            });

            return () => {
                unsub();
            };
        };

        fetchUsers();
        fetchTeams();
        fetchUserCards();
    }, [userId]);
    //Função para retornar os créditos,de acordo com a raridade
    const calculateCredits = (raridade: string): number => {
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
    //Função para remover carta, caso esta esteja repetida
    const removeCard = async (cardId: string, raridade: string) => {
        try {
            if (userId) {
                const userDocRef = doc(db, 'Utilizadores', userId);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const cardIndex = userData.cartas.findIndex((card: string) => card === cardId);

                    if (cardIndex !== -1) {
                        const updatedCards = [...userData.cartas];

                        updatedCards.splice(cardIndex, 1);

                        const creditsToAdd = calculateCredits(raridade);
                        const updatedCredits = userData.creditos + creditsToAdd;

                        await updateDoc(userDocRef, { cartas: updatedCards, creditos: updatedCredits });

                        setUserCards(updatedCards);
                        setUserCredits(updatedCredits);
                    }
                }
            }
        } catch (error) {
            console.error('Erro ao remover carta do utilizador: ', error);
        }
    };

    const filteredTeams = departmentId === 'Todos' ? teams : teams.filter(team => team.department_id === departmentId);
    const filteredUsers = departmentId === 'Todos' ? users : users.filter(user => user.department_id === departmentId);
    //Ordenar os stickers por raridade
    const rarityOrder = ['Comum', 'Raro', 'MuitoRaro', 'Épico', 'Lendário'];

    return (
        <>
            <Navbar />
            <div className="page-background">
                <div>
                    <DropDown setSelectedDepartment={setDepartmentId} />
                </div>
                <div
                    className="container"
                    style={{
                        backgroundColor: '#f4f4f2',
                        paddingTop: '20px',
                        paddingBottom: '20px',
                        paddingLeft: '20px',
                        paddingRight: '20px'
                    }}
                >
                    <div className="container" style={{ border: '5px solid black', paddingTop: '10px', backgroundColor: '#5b88a5' }}>
                        {filteredTeams.map(team => (
                            <div key={team.id}>
                                <div style={{ backgroundColor: '#191013', padding: '10px', textAlign: 'center' }}>
                                    <span className="textDepartment" style={{ fontWeight: 'bold', color: 'white' }}>
                                        {departmentId === 'Todos' ? `${team.department_nome} - ${team.nome}` : team.nome}
                                    </span>
                                </div>
                                <div className="row justify-content-center cardFontSize">
                                    {filteredUsers
                                        .filter(user => user.equipa_id === team.id)
                                        .sort((a, b) => rarityOrder.indexOf(a.raridade) - rarityOrder.indexOf(b.raridade))
                                        .map(filteredUser => (
                                            <Card
                                                key={filteredUser.id}
                                                nome={filteredUser.nome}
                                                raridade={filteredUser.raridade}
                                                equipa_id={filteredUser.equipa_id}
                                                department_id={filteredUser.department_id}
                                                imagem={filteredUser.imagem}
                                                id={filteredUser.id}
                                                userCards={userCards}
                                                removeCard={removeCard}
                                            />
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
