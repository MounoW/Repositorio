/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';

import { Card } from '../components/card/card';
//import { DropDown } from '../components/dropdown/dropdown';
import { Navbar } from '../components/navbar/navbar';

interface UserInfo {
    id: number;
    name: string;
    username: string;
    email: string;
}
export const UserPage = () => {
    const [users, setUsers] = useState<UserInfo[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => setUsers(json));
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ backgroundColor: 'red' }}>
                <div className="container " style={{ backgroundColor: 'royalblue' }}>
                    {/* <div>
                        <DropDown></DropDown>
                    </div> */}

                    <div
                        className="container"
                        style={{ border: '5px solid black', marginTop: '10px', paddingTop: '10px', backgroundColor: 'purple' }}
                    >
                        <div style={{ backgroundColor: 'yellow', padding: '10px', textAlign: 'center' }}>
                            <a style={{ fontSize: '30px', fontWeight: 'bold', color: 'black' }}>Equipa 1</a>
                        </div>
                        <div className="row justify-content-center">
                            {users.map(user => {
                                return <Card key={user.id} name={user.name} email={user.email} id={user.id} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
