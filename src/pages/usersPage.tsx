/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '../firebase.ts';
import { Card } from '../components/card/card';
import { DropDown } from '../components/dropdown/dropdown';

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

    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();

        return signInWithPopup(auth, provider);
    };

    return (
        <div className="container " style={{ backgroundColor: 'royalblue' }}>
            <div>
                <DropDown></DropDown>
            </div>
            <div className="pt-36 w-full flex">
                <button onClick={handleGoogle} className="mx-auto border-4 bg-green-500">
                    Sign In With Google
                </button>
            </div>
            <div className="container" style={{ border: '5px solid black', marginTop: '10px', paddingTop: '10px', backgroundColor: 'midnightblue' }}>
                <div style={{ backgroundColor: 'lightblue', padding: '10px', textAlign: 'center' }}>
                    <a style={{ fontSize: '30px', fontWeight: 'bold', color: 'black' }}>Equipa 1</a>
                </div>
                <div className="row justify-content-center">
                    {users.map(user => {
                        return <Card key={user.id} name={user.name} email={user.email} id={user.id} />;
                    })}
                </div>
            </div>
        </div>
    );
};
