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
    name: string;
    email: string;
}

export const UserPage = () => {
    const [users, setUsers] = useState<UserInfo[]>([]);

    const [departmentid, setDepartmentid] = useState<string>();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => setUsers(json));
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const pessoasCollection = collection(db, 'Pessoas');
                const pessoasSnapshot = await getDocs(pessoasCollection);
                const pessoasList = pessoasSnapshot.docs.map(doc => ({
                    id: doc.id as string,
                    name: doc.data().nome as string,
                    email: doc.data().equipa_id as string // Supondo que "equipa_id" é usado como email aqui. Ajuste conforme necessário.
                }));

                setUsers(pessoasList);
            } catch (error) {
                console.error('Erro ao buscar documentos: ', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ backgroundColor: 'red' }}>
                <div>
                    <DropDown setSelectedDepartment={setDepartmentid} />
                </div>
                <div className="container" style={{ backgroundColor: 'royalblue' }}>
                    <div
                        className="container"
                        style={{ border: '5px solid black', marginTop: '10px', paddingTop: '10px', backgroundColor: 'purple' }}
                    >
                        <div style={{ backgroundColor: 'yellow', padding: '10px', textAlign: 'center' }}>
                            <a style={{ fontSize: '30px', fontWeight: 'bold', color: 'black' }}>Equipa 1</a>
                        </div>
                        <div className="row justify-content-center">
                            {users
                                .filter(user => user.id === departmentid || !departmentid)
                                .map(user => {
                                    return <Card key={user.id} name={user.name} email={user.email} id={user.id} />;
                                })}
                        </div>
                    </div>
                    <div
                        className="container"
                        style={{ border: '5px solid black', marginTop: '10px', paddingTop: '10px', backgroundColor: 'purple' }}
                    >
                        <div style={{ backgroundColor: 'yellow', padding: '10px', textAlign: 'center' }}>
                            <a style={{ fontSize: '30px', fontWeight: 'bold', color: 'black' }}>Equipa 2</a>
                        </div>
                        <div className="row justify-content-center">
                            {users
                                .filter(user => user.id === departmentid || !departmentid)
                                .map(user => {
                                    return <Card key={user.id} name={user.name} email={user.email} id={user.id} />;
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// /* eslint-disable jsx-a11y/anchor-is-valid */
// import { useEffect, useState } from 'react';
// import { collection, getDocs, DocumentData } from 'firebase/firestore';

// import { Card } from '../components/card/card';
// import { Navbar } from '../components/navbar/navbar';
// import { DropDown } from '../components/dropdown/dropdown';
// import { db } from '../firebase';

// interface UserInfo {
//     id: string;
//     name: string;
//     email: string;
// }

// export const UserPage = () => {
//     const [users, setUsers] = useState<UserInfo[]>([]);
//     const [departmentid, setDepartmentid] = useState<string | undefined>();

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const pessoasCollection = collection(db, 'Pessoas');
//                 const pessoasSnapshot = await getDocs(pessoasCollection);
//                 const pessoasList = pessoasSnapshot.docs.map(doc => ({
//                     id: doc.id,
//                     name: doc.data().nome,
//                     email: doc.data().equipa_id, // Supondo que "equipa_id" é usado como email aqui. Ajuste conforme necessário.
//                 }));
//                 setUsers(pessoasList);
//             } catch (error) {
//                 console.error("Erro ao buscar documentos: ", error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     return (
//         <>
//             <Navbar />
//             <div style={{ backgroundColor: 'red' }}>
//                 <div>
//                     <DropDown setSelectedDepartment={setDepartmentid} />
//                 </div>
//                 <div className="container" style={{ backgroundColor: 'royalblue' }}>
//                     <div
//                         className="container"
//                         style={{ border: '5px solid black', marginTop: '10px', paddingTop: '10px', backgroundColor: 'purple' }}
//                     >
//                         <div style={{ backgroundColor: 'yellow', padding: '10px', textAlign: 'center' }}>
//                             <a style={{ fontSize: '30px', fontWeight: 'bold', color: 'black' }}>Equipa 1</a>
//                         </div>
//                         <div className="row justify-content-center">
//                             {users
//                                 .filter(user => user.id === departmentid || !departmentid)
//                                 .map(user => {
//                                     return <Card key={user.id} name={user.name} email={user.email} id={user.id} />;
//                                 })}
//                         </div>
//                     </div>
//                     <div
//                         className="container"
//                         style={{ border: '5px solid black', marginTop: '10px', paddingTop: '10px', backgroundColor: 'purple' }}
//                     >
//                         <div style={{ backgroundColor: 'yellow', padding: '10px', textAlign: 'center' }}>
//                             <a style={{ fontSize: '30px', fontWeight: 'bold', color: 'black' }}>Equipa 2</a>
//                         </div>
//                         <div className="row justify-content-center">
//                             {users
//                                 .filter(user => user.id === departmentid || !departmentid)
//                                 .map(user => {
//                                     return <Card key={user.id} name={user.name} email={user.email} id={user.id} />;
//                                 })}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
