/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { Card } from '../components/card/card';
//import { DropDown } from '../components/dropdown/dropdown';
import { Navbar } from '../components/navbar/navbar';
import { DropDown } from '../components/dropdown/dropdown';
import db from '../firebase';

interface UserInfo {
    id: string;
    nome: string;
    raridade: string;
    equipa_id: string;
    department_id: string;
}

interface TeamInfo {
    id: string;
    nome: string;
    department_id: string;
}

export const UserPage = () => {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [teams, setTeams] = useState<TeamInfo[]>([]);
    const [departmentId, setDepartmentId] = useState<string>('Todos');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const pessoasCollection = collection(db, 'Pessoas');
                const pessoasSnapshot = await getDocs(pessoasCollection);
                const pessoasList = pessoasSnapshot.docs.map(doc => ({
                    id: doc.id,
                    nome: doc.data().nome,
                    raridade: doc.data().raridade,
                    equipa_id: doc.data().equipa_id,
                    department_id: doc.data().department_id
                }));

                setUsers(pessoasList);
            } catch (error) {
                console.error('Erro ao buscar documentos: ', error);
            }
        };

        const fetchTeams = async () => {
            try {
                const equipasCollection = collection(db, 'Equipas');
                const equipasSnapshot = await getDocs(equipasCollection);
                const equipasList = equipasSnapshot.docs.map(doc => ({
                    id: doc.id,
                    nome: doc.data().nome,
                    department_id: doc.data().department_id
                }));

                setTeams(equipasList);
            } catch (error) {
                console.error('Erro ao buscar documentos: ', error);
            }
        };

        fetchUsers();
        fetchTeams();
    }, []);

    const filteredTeams = departmentId === 'Todos' ? teams : teams.filter(team => team.department_id === departmentId);
    const filteredUsers = departmentId === 'Todos' ? users : users.filter(user => user.department_id === departmentId);

    return (
        <>
            <Navbar />
            <div style={{ backgroundColor: 'red' }}>
                <div>
                    <DropDown setSelectedDepartment={setDepartmentId} />
                </div>
                <div className="container" style={{ backgroundColor: 'royalblue' }}>
                    <div
                        className="container"
                        style={{ border: '5px solid black', marginTop: '10px', paddingTop: '10px', backgroundColor: 'purple' }}
                    >
                        {filteredTeams.map(team => (
                            <div key={team.id}>
                                <div style={{ backgroundColor: 'yellow', padding: '10px', textAlign: 'center' }}>
                                    <span style={{ fontSize: '30px', fontWeight: 'bold', color: 'black' }}>{team.nome}</span>
                                </div>
                                <div className="row justify-content-center">
                                    {filteredUsers
                                        .filter(user => user.equipa_id === team.id)
                                        .map(filteredUser => (
                                            <Card
                                                key={filteredUser.id}
                                                nome={filteredUser.nome}
                                                raridade={filteredUser.raridade}
                                                equipa_id={filteredUser.equipa_id}
                                                department_id={filteredUser.department_id}
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
